"""ENGR 202 calculator helpers; runs unchanged in CPython and Pyodide."""
import ast
import cmath
import math
import operator


def num(text):
    """Small arithmetic parser: 3+j4, 3+4j, 25@53.13, 100*pi, 1e-3."""
    import re
    text = str(text).strip().replace('−', '-').replace('∠', '@').replace('π', 'pi')
    if not text:
        raise ValueError('输入不能为空。')
    if len(text) > 180:
        raise ValueError('表达式过长。')
    if '@' in text:
        a, b = text.split('@')
        return P(real(num(a)), real(num(b)))
    text = re.sub(r'(?<![\w.])j(\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)', r'\1j', text)
    ops = {ast.Add: operator.add, ast.Sub: operator.sub, ast.Mult: operator.mul,
           ast.Div: operator.truediv, ast.Pow: operator.pow}
    def walk(node, depth=0):
        if depth > 20:
            raise ValueError('表达式层数过多。')
        if isinstance(node, ast.Constant) and type(node.value) in (int, float, complex):
            return node.value
        if isinstance(node, ast.Name) and node.id in ('j', 'pi'):
            return 1j if node.id == 'j' else math.pi
        if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd, ast.USub)):
            v = walk(node.operand, depth+1)
            return -v if isinstance(node.op, ast.USub) else v
        if isinstance(node, ast.BinOp) and type(node.op) in ops:
            a, b = walk(node.left, depth+1), walk(node.right, depth+1)
            if isinstance(node.op, ast.Pow) and abs(b) > 20:
                raise ValueError('指数过大。')
            return ops[type(node.op)](a, b)
        raise ValueError('只支持数字、j、pi、+ - * / **，或 幅值@角度。')
    z = complex(walk(ast.parse(text, mode='eval').body))
    if not (math.isfinite(z.real) and math.isfinite(z.imag)):
        raise ValueError('结果必须为有限数值。')
    return z


def real(z):
    z = complex(z)
    if abs(z.imag) > 1e-12:
        raise ValueError('此字段需要实数。')
    return z.real


def positive(x, label='数值'):
    x = real(x)
    if x <= 0:
        raise ValueError(label + '必须大于 0。')
    return x


def P(magnitude, degrees):
    return cmath.rect(magnitude, math.radians(degrees))


def angle(deg):
    return (deg + 180) % 360 - 180


def f(x):
    return f'{0 if abs(x) < 1e-10 else x:.8g}'


def show(label, z, unit=''):
    z = complex(z)
    z = complex(0 if abs(z.real) < 1e-10 else z.real, 0 if abs(z.imag) < 1e-10 else z.imag)
    phase = math.degrees(cmath.phase(z)) if abs(z) > 1e-12 else 0
    print(f'{label} = {f(z.real)} {"+" if z.imag >= 0 else "−"} j{f(abs(z.imag))} {unit}')
    print(f'    = {f(abs(z))} ∠ {f(phase)}° {unit}')


def parallel(*zs):
    if any(abs(z) < 1e-14 for z in zs):
        return 0j
    y = sum(1/z for z in zs)
    if abs(y) < 1e-14:
        raise ValueError('并联总导纳为 0：理想开路／谐振，没有有限阻抗。')
    return 1/y


def solve(A, b):
    """Gaussian elimination with scaled pivoting, n <= 3."""
    n = len(b)
    original = [[complex(v) for v in row] for row in A]
    rhs = [complex(v) for v in b]
    m = [row[:] + [rhs[i]] for i, row in enumerate(original)]
    scales = [max(map(abs, row)) for row in original]
    if any(s == 0 for s in scales):
        raise ValueError('矩阵有全零行，不能得到唯一解。')
    for c in range(n):
        p = max(range(c, n), key=lambda r: abs(m[r][c])/scales[r])
        if abs(m[p][c])/scales[p] < 1e-12:
            raise ValueError('矩阵奇异或接近奇异，不能可靠求唯一解。')
        m[c], m[p] = m[p], m[c]
        scales[c], scales[p] = scales[p], scales[c]
        divisor = m[c][c]
        m[c] = [v/divisor for v in m[c]]
        for r in range(n):
            if r != c:
                k = m[r][c]
                m[r] = [m[r][i] - k*m[c][i] for i in range(n+1)]
    x = [row[-1] for row in m]
    residual = max(abs(sum(original[r][c]*x[c] for c in range(n))-rhs[r]) for r in range(n))
    print('最大回代残差 =', f(residual))
    return x
