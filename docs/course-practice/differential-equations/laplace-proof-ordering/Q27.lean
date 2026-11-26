/-
Q27.  A conditional operator proof, checked with Lean 4 core.
X is a space of signals/distributions on positive time with right traces
where used; F consists of transforms on a common right half-plane.
Equality of ordinary signals uses their right-continuous representatives.
The three transform laws below are assumptions, not definitions of L.
-/
namespace Q27

structure Model (X F : Type) where
  L : X → F
  D : X → X
  shift : X → X
  twice : X → X
  addX : X → X → X
  addF : F → F → F
  subF : F → F → F
  sMul : F → F
  delayMul : F → F
  twoMul : F → F
  trace : X → F                   -- embed the right trace as a constant
  zeroSignal : X
  zero : F
  one : F
  -- A1: the additive and scaling instances of linearity used by Q27
  linearity : (∀ x y, L (addX x y) = addF (L x) (L y)) ∧
              (∀ x, L (twice x) = twoMul (L x)) ∧ L zeroSignal = zero
  -- A2 is needed only on signals to which it is applied below.
  admissible : X → Prop
  derivative : ∀ x, admissible x → L (D x) = subF (sMul (L x)) (trace x)
  -- A3
  delay : ∀ x, L (shift x) = delayMul (L x)
  -- U: uniqueness of inversion on the chosen signal class
  unique : ∀ x y, L x = L y → x = y
  -- Frequency algebra, independent of the transform:
  subZero : ∀ f, subF f zero = f
  subEqZero : ∀ a b, subF a b = zero → a = b
  moveTrace : ∀ a b c, addF (subF a b) c = zero → addF a c = b
  sDelay : ∀ f, sMul (delayMul f) = delayMul (sMul f)
  delaySum : ∀ a b, delayMul (addF a b) = addF (delayMul a) (delayMul b)
  twoDelay : ∀ f, twoMul (delayMul f) = delayMul (twoMul f)
  -- s+2 is nonzero on the right half-plane used in this proof.
  cancel : ∀ a b, addF (sMul a) (twoMul a) = addF (sMul b) (twoMul b) → a = b

-- k(t)=1, g(t)=exp(-2t), impulse=delta(t-1); y is any solution.
-- The hypotheses expose the signal identities, initial values and IVP.
theorem solve {X F : Type} (m : Model X F) (k g impulse y : X)
    (hk : m.admissible k) (hg : m.admissible g)
    (hstep : m.admissible (m.shift k)) (hy : m.admissible y)
    (constantDerivative : m.D k = m.zeroSignal)
    (constantTrace : m.trace k = m.one)
    (stepTrace : m.trace (m.shift k) = m.zero)
    (stepDerivative : m.D (m.shift k) = impulse)
    (expEquation : m.addX (m.D g) (m.twice g) = m.zeroSignal)
    (expTrace : m.trace g = m.one)
    (initial : m.trace y = m.zero)
    (equation : m.addX (m.D y) (m.twice y) = impulse) :
    y = m.shift g := by
  have K : m.sMul (m.L k) = m.one := by
    apply m.subEqZero
    rw [← constantTrace, ← m.derivative k hk, constantDerivative, m.linearity.2.2]
  have I : m.L impulse = m.delayMul m.one := by
    rw [← stepDerivative, m.derivative _ hstep, stepTrace, m.subZero,
        m.delay, m.sDelay, K]
  have G : m.addF (m.sMul (m.L g)) (m.twoMul (m.L g)) = m.one := by
    have E := congrArg m.L expEquation
    rw [m.linearity.1, m.linearity.2.1, m.derivative g hg, expTrace, m.linearity.2.2] at E
    exact m.moveTrace _ _ _ E
  have Y := congrArg m.L equation
  rw [m.linearity.1, m.linearity.2.1, m.derivative y hy, initial, m.subZero, I] at Y
  apply m.unique
  apply m.cancel
  rw [Y, m.delay, m.sDelay, m.twoDelay, ← m.delaySum, G]

#print axioms solve
end Q27
