# Lathi 2.3-1 (a)-(c): exact causal, initially-at-rest solutions.
# t must be REAL, not positive: otherwise DiracDelta(t) can simplify to zero.
import sympy as sp
import json
answers_latex = {}
s = sp.symbols('s')
t = sp.symbols('t', real=True)
tau = sp.symbols('tau', positive=True)  # only for the regular t>0 part

systems = {
    'a': (s**2 + 1, 2*s),
    'b': (s**3 + s, 2*s**3 + 1),
    'c': (s**2 + 2*s + 5, sp.Integer(8)),
}
expected = {
    'a': (sp.Integer(0), 2*sp.cos(t)),
    'b': (sp.Integer(2), 1-sp.cos(t)-2*sp.sin(t)),
    'c': (sp.Integer(0), 4*sp.exp(-t)*sp.sin(2*t)),
}

def operator(Q, f):
    return sp.simplify(sum(c*sp.diff(f,t,k[0]) for k,c in sp.Poly(Q,s).terms()))

def real_modes(roots):
    modes = []
    for root, multiplicity in roots.items():
        a, b = sp.simplify(sp.re(root)), sp.simplify(sp.im(root))
        for k in range(multiplicity):
            if b == 0:
                modes.append(t**k*sp.exp(a*t))
            elif b.is_positive:  # one representative of each conjugate pair
                modes += [t**k*sp.exp(a*t)*sp.cos(b*t),
                          t**k*sp.exp(a*t)*sp.sin(b*t)]
    return modes

print('SymPy', sp.__version__, '| causal, initially at rest')
print('u(t) = Heaviside(t); delta(t) = DiracDelta(t); I = j')
for label, (Q,P) in systems.items():
    H = sp.cancel(P/Q)
    roots = sp.roots(Q,s)
    modes = real_modes(roots)
    polynomial, remainder = sp.div(P,Q,s)
    # Inverse-transform the polynomial explicitly: s^k maps to delta^(k).
    singular = sum(c*sp.DiracDelta(t,k[0])
                   for k,c in sp.Poly(polynomial,s).terms())
    regular = sp.simplify(sp.inverse_laplace_transform(remainder/Q,s,tau).subs(tau,t))
    h = singular + regular*sp.Heaviside(t)

    # Three independent exact checks, including every delta derivative.
    assert all(operator(Q, mode) == 0 for mode in modes)
    assert sp.simplify(polynomial + sp.laplace_transform(regular,t,s,noconds=True)-H) == 0
    assert operator(Q,regular) == 0
    jumps = {}
    for (n,), c in sp.Poly(Q,s).terms():
        for k in range(n):
            jumps[k] = jumps.get(k,0) + c*sp.diff(regular,t,n-1-k).subs(t,0)
    singular_transform = sp.expand(Q*polynomial + sum(c*s**k for k,c in jumps.items()))
    assert sp.simplify(singular_transform-P) == 0
    d, f = expected[label]
    assert sp.simplify(polynomial-d) == 0 and sp.simplify(regular-f) == 0

    # Export the computed solution as LaTeX, with u(t) for the unit step.
    display_h = h.xreplace({sp.Heaviside(t): sp.Function('u')(t)})
    answers_latex[label] = sp.latex(sp.Eq(sp.Function('h_' + label)(t), display_h, evaluate=False))

    print('\n(' + label + ')')
    print('Characteristic equation:', sp.factor(Q), '= 0')
    print('Roots (multiplicity):', roots)
    print('Real mode basis:', modes)
    print('H(s) =', H)
    print('Partial fractions:', sp.apart(H,s))
    print('Polynomial / direct part:', polynomial)
    print('h(t) =', h)
    print('Q(D)h = P(D)delta: singular polynomial =', singular_transform)
    print('PASS: modes, Laplace, full distribution equation, expected answer')
print('\nALL 3 CASES PASSED')

# The iframe reads this JSON after a successful execution.
answers_latex_json = json.dumps(answers_latex)
