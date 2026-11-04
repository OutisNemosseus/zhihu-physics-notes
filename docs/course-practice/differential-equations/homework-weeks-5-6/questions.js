const coverage = "Canvas Homework 栏共四份，均在 11/8 晚 11:59 截止。侧栏按课程模块 Week 5 和 Week 6 分组。47 道原题拆成 63 道四选一，部分数值以小数近似。";
const groups = [
  {
    "week": 5,
    "source": 710822,
    "title": "Wk 5-1 · Characteristic Method with Real Solutions",
    "questions": [
      {
        "label": "Q1",
        "prompt": "y″ + 9y′ + 20y = 0, y(0) = 5, y′(0) = -22. Find y(t).",
        "choices": [
          "4·exp(-4·t) + 2·exp(-5·t)",
          "3·exp(-4·t) + 2·exp(-5·t)",
          "3·exp(-4·t) + 1·exp(-5·t)",
          "2·exp(-4·t) + 3·exp(-5·t)"
        ],
        "correct": 1,
        "why": "特征根为 -4 和 -5。代入初值得 C₁ + C₂ = 5，-4C₁ + -5C₂ = -22。"
      },
      {
        "label": "Q2",
        "prompt": "y″ − 3y′ − 10y = 0, y(0) = α, y′(0) = 6. Find α so that y(t) → 0 as t → ∞.",
        "choices": [
          "-3",
          "3",
          "-6",
          "6"
        ],
        "correct": 0,
        "why": "保留负根 r = -2 对应的项，令正根项系数为零。于是 y′(0) = rα。"
      },
      {
        "label": "Q3",
        "prompt": "5y″ − 16y′ + 3y = 0, y(0) = 3, y′(0) = 3.4. Find y(t).",
        "choices": [
          "2·exp(3·t) + 2·exp(0.2·t)",
          "1·exp(3·t) + 1·exp(0.2·t)",
          "0·exp(3·t) + 3·exp(0.2·t)",
          "1·exp(3·t) + 2·exp(0.2·t)"
        ],
        "correct": 3,
        "why": "特征根为 3 和 0.2。代入初值得 C₁ + C₂ = 3，3C₁ + 0.2C₂ = 3.4。"
      },
      {
        "label": "Q4",
        "prompt": "y″ − y′ − 20y = 0, y(0) = -7, y′(0) = -8. Find y(t).",
        "choices": [
          "-3·exp(5·t) + -3·exp(-4·t)",
          "-4·exp(5·t) + -4·exp(-4·t)",
          "-4·exp(5·t) + -3·exp(-4·t)",
          "-5·exp(5·t) + -2·exp(-4·t)"
        ],
        "correct": 2,
        "why": "特征根为 5 和 -4。代入初值得 C₁ + C₂ = -7，5C₁ + -4C₂ = -8。"
      },
      {
        "label": "Q5",
        "prompt": "y″ + y′ − 20y = 0, y(0) = α, y′(0) = 1. Find α so that y(t) → 0 as t → ∞.",
        "choices": [
          "0.2",
          "-0.2",
          "-0.4",
          "1"
        ],
        "correct": 1,
        "why": "保留负根 r = -5 对应的项，令正根项系数为零。于是 y′(0) = rα。"
      },
      {
        "label": "Q6",
        "prompt": "y″ + 3y′ − 10y = 0, y(0) = α, y′(0) = 5. Find α so that y(t) → 0 as t → ∞.",
        "choices": [
          "-1",
          "1",
          "-2",
          "5"
        ],
        "correct": 0,
        "why": "保留负根 r = -5 对应的项，令正根项系数为零。于是 y′(0) = rα。"
      },
      {
        "label": "Q7",
        "prompt": "2y″ + 11y′ + 15y = 0, y(0) = 3, y′(0) = -8.5. Find y(t).",
        "choices": [
          "2·exp(-2.5·t) + 2·exp(-3·t)",
          "1·exp(-2.5·t) + 1·exp(-3·t)",
          "0·exp(-2.5·t) + 3·exp(-3·t)",
          "1·exp(-2.5·t) + 2·exp(-3·t)"
        ],
        "correct": 3,
        "why": "特征根为 -2.5 和 -3。代入初值得 C₁ + C₂ = 3，-2.5C₁ + -3C₂ = -8.5。"
      },
      {
        "label": "Q8",
        "prompt": "y″ − 7y′ + 12y = 0, y(0) = 1, y′(0) = 1. Find y(t).",
        "choices": [
          "-1·exp(4·t) + 3·exp(3·t)",
          "-2·exp(4·t) + 2·exp(3·t)",
          "-2·exp(4·t) + 3·exp(3·t)",
          "-3·exp(4·t) + 4·exp(3·t)"
        ],
        "correct": 2,
        "why": "特征根为 4 和 3。代入初值得 C₁ + C₂ = 1，4C₁ + 3C₂ = 1。"
      },
      {
        "label": "Q9",
        "prompt": "y″ + y′ − 20y = 0, y(0) = α, y′(0) = 5. Find α so that y(t) → 0 as t → ∞.",
        "choices": [
          "1",
          "-1",
          "-2",
          "5"
        ],
        "correct": 1,
        "why": "保留负根 r = -5 对应的项，令正根项系数为零。于是 y′(0) = rα。"
      },
      {
        "label": "Q10",
        "prompt": "2y″ − 9y′ + 9y = 0, y(0) = 2, y′(0) = 4.5. Find y(t).",
        "choices": [
          "1·exp(3·t) + 1·exp(1.5·t)",
          "2·exp(3·t) + 1·exp(1.5·t)",
          "1·exp(3·t) + 0·exp(1.5·t)",
          "0·exp(3·t) + 2·exp(1.5·t)"
        ],
        "correct": 0,
        "why": "特征根为 3 和 1.5。代入初值得 C₁ + C₂ = 2，3C₁ + 1.5C₂ = 4.5。"
      }
    ]
  },
  {
    "week": 5,
    "source": 710823,
    "title": "Wk 5-2 · Characteristic with Mixed Solutions",
    "questions": [
      {
        "label": "Q1",
        "prompt": "y″ − 4y′ + 13y = 0, y(0) = 3, y′(0) = 12. Find y(t).",
        "choices": [
          "exp(2·t)·(4·cos(3·t) + 2·sin(3·t))",
          "exp(2·t)·(3·cos(3·t) + 2·sin(3·t))",
          "exp(2·t)·(3·cos(3·t) + 1·sin(3·t))",
          "exp(2·t)·(2·cos(3·t) + 3·sin(3·t))"
        ],
        "correct": 1,
        "why": "根的实部为 2，虚部绝对值为 3。初值得 C₁ = 3，rC₁ + ωC₂ = 12。"
      },
      {
        "label": "Q1b",
        "prompt": "y″ − 4y′ + 13y = 0, y(0) = 3, y′(0) = 12. Describe the long-term behavior.",
        "choices": [
          "Oscillations with increasing amplitude",
          "Oscillations with decreasing amplitude",
          "Steady oscillations",
          "Nonoscillatory motion"
        ],
        "correct": 0,
        "why": "振幅的包络与 eʳᵗ 成正比，r = 2。"
      },
      {
        "label": "Q2",
        "prompt": "y″ − 6y′ + 9y = 0, y(0) = 3, y′(0) = 4. Find y(t).",
        "choices": [
          "(4 + -5·t)·exp(3·t)",
          "(3 + -6·t)·exp(3·t)",
          "(2 + -4·t)·exp(3·t)",
          "(3 + -5·t)·exp(3·t)"
        ],
        "correct": 3,
        "why": "重根 r = 3。通解为 (C₁ + C₂t)eʳᵗ，y′(0) = rC₁ + C₂。"
      },
      {
        "label": "Q3",
        "prompt": "y″ + 8y′ + 20y = 0, y(0) = -3, y′(0) = 18. Find y(t).",
        "choices": [
          "exp(-4·t)·(-2·cos(2·t) + 3·sin(2·t))",
          "exp(-4·t)·(-3·cos(2·t) + 2·sin(2·t))",
          "exp(-4·t)·(-3·cos(2·t) + 3·sin(2·t))",
          "exp(-4·t)·(-4·cos(2·t) + 4·sin(2·t))"
        ],
        "correct": 2,
        "why": "根的实部为 -4，虚部绝对值为 2。初值得 C₁ = -3，rC₁ + ωC₂ = 18。"
      },
      {
        "label": "Q3b",
        "prompt": "y″ + 8y′ + 20y = 0, y(0) = -3, y′(0) = 18. Describe the long-term behavior.",
        "choices": [
          "Steady oscillations",
          "Oscillations with decreasing amplitude",
          "Oscillations with increasing amplitude",
          "Nonoscillatory motion"
        ],
        "correct": 1,
        "why": "振幅的包络与 eʳᵗ 成正比，r = -4。"
      },
      {
        "label": "Q4",
        "prompt": "5y″ + 23y′ − 10y = 0, y(0) = -5, y′(0) = 3.4. Find y(t).",
        "choices": [
          "-4·exp(0.4·t) + -1·exp(-5·t)",
          "-3·exp(0.4·t) + -1·exp(-5·t)",
          "-4·exp(0.4·t) + -2·exp(-5·t)",
          "-5·exp(0.4·t) + 0·exp(-5·t)"
        ],
        "correct": 0,
        "why": "特征根为 0.4 和 -5。代入初值得 C₁ + C₂ = -5，0.4C₁ + -5C₂ = 3.4。"
      },
      {
        "label": "Q5",
        "prompt": "y″ + 4y = 0, y(π/4) = -2, y′(π/4) = -4. Find y(t). Use τ = t − π/4.",
        "choices": [
          "exp(0·(t − π/4))·(-1·cos(2·(t − π/4)) + -2·sin(2·(t − π/4)))",
          "exp(0·(t − π/4))·(-2·cos(2·(t − π/4)) + -3·sin(2·(t − π/4)))",
          "exp(0·(t − π/4))·(-3·cos(2·(t − π/4)) + -1·sin(2·(t − π/4)))",
          "exp(0·(t − π/4))·(-2·cos(2·(t − π/4)) + -2·sin(2·(t − π/4)))"
        ],
        "correct": 3,
        "why": "根的实部为 0，虚部绝对值为 2。初值得 C₁ = -2，rC₁ + ωC₂ = -4。"
      },
      {
        "label": "Q5b",
        "prompt": "y″ + 4y = 0, y(π/4) = -2, y′(π/4) = -4. Describe the long-term behavior.",
        "choices": [
          "Oscillations with decreasing amplitude",
          "Oscillations with increasing amplitude",
          "Steady oscillations",
          "Nonoscillatory motion"
        ],
        "correct": 2,
        "why": "振幅的包络与 eʳᵗ 成正比，r = 0。"
      },
      {
        "label": "Q6",
        "prompt": "y″ + 3y′ − 10y = 0, y(0) = α, y′(0) = 2. Find α so that y(t) → 0 as t → ∞.",
        "choices": [
          "0.4",
          "-0.4",
          "-0.8",
          "2"
        ],
        "correct": 1,
        "why": "保留负根 r = -5 对应的项，令正根项系数为零。于是 y′(0) = rα。"
      },
      {
        "label": "Q7",
        "prompt": "y″ − 4y′ + 29y = 0, y(0) = 2, y′(0) = 24. Find y(t).",
        "choices": [
          "exp(2·t)·(2·cos(5·t) + 4·sin(5·t))",
          "exp(2·t)·(3·cos(5·t) + 4·sin(5·t))",
          "exp(2·t)·(2·cos(5·t) + 3·sin(5·t))",
          "exp(2·t)·(1·cos(5·t) + 5·sin(5·t))"
        ],
        "correct": 0,
        "why": "根的实部为 2，虚部绝对值为 5。初值得 C₁ = 2，rC₁ + ωC₂ = 24。"
      },
      {
        "label": "Q7b",
        "prompt": "y″ − 4y′ + 29y = 0, y(0) = 2, y′(0) = 24. Describe the long-term behavior.",
        "choices": [
          "Oscillations with decreasing amplitude",
          "Steady oscillations",
          "Nonoscillatory motion",
          "Oscillations with increasing amplitude"
        ],
        "correct": 3,
        "why": "振幅的包络与 eʳᵗ 成正比，r = 2。"
      },
      {
        "label": "Q8",
        "prompt": "y″ + 25y = 0, y(π/10) = -4, y′(π/10) = 5. Find y(t). Use τ = t − π/10.",
        "choices": [
          "exp(0·(t − π/10))·(-3·cos(5·(t − π/10)) + 1·sin(5·(t − π/10)))",
          "exp(0·(t − π/10))·(-4·cos(5·(t − π/10)) + 0·sin(5·(t − π/10)))",
          "exp(0·(t − π/10))·(-4·cos(5·(t − π/10)) + 1·sin(5·(t − π/10)))",
          "exp(0·(t − π/10))·(-5·cos(5·(t − π/10)) + 2·sin(5·(t − π/10)))"
        ],
        "correct": 2,
        "why": "根的实部为 0，虚部绝对值为 5。初值得 C₁ = -4，rC₁ + ωC₂ = 5。"
      },
      {
        "label": "Q8b",
        "prompt": "y″ + 25y = 0, y(π/10) = -4, y′(π/10) = 5. Describe the long-term behavior.",
        "choices": [
          "Oscillations with decreasing amplitude",
          "Steady oscillations",
          "Oscillations with increasing amplitude",
          "Nonoscillatory motion"
        ],
        "correct": 1,
        "why": "振幅的包络与 eʳᵗ 成正比，r = 0。"
      },
      {
        "label": "Q9",
        "prompt": "y″ + 16y = 0, y(0) = 4, y′(0) = -2. Find y(t).",
        "choices": [
          "exp(0·t)·(4·cos(4·t) + -0.5·sin(4·t))",
          "exp(0·t)·(5·cos(4·t) + -0.5·sin(4·t))",
          "exp(0·t)·(4·cos(4·t) + -1.5·sin(4·t))",
          "exp(0·t)·(3·cos(4·t) + 0.5·sin(4·t))"
        ],
        "correct": 0,
        "why": "根的实部为 0，虚部绝对值为 4。初值得 C₁ = 4，rC₁ + ωC₂ = -2。"
      },
      {
        "label": "Q9b",
        "prompt": "For y″ + 16y = 0, y(0) = 4, y′(0) = −2, find amplitude and period.",
        "choices": [
          "√65 and π/2",
          "√65/2 and 2π",
          "4 and π/4",
          "√65/2 and π/2"
        ],
        "correct": 3,
        "why": "解为 4cos(4t) − ½sin(4t)，振幅为 √(16 + ¼)，周期为 2π/4。"
      },
      {
        "label": "Q10",
        "prompt": "y″ + 10y′ + 25y = 0, y(0) = -4, y′(0) = 25. Find y(t).",
        "choices": [
          "(-3 + 5·t)·exp(-5·t)",
          "(-4 + 4·t)·exp(-5·t)",
          "(-4 + 5·t)·exp(-5·t)",
          "(-5 + 6·t)·exp(-5·t)"
        ],
        "correct": 2,
        "why": "重根 r = -5。通解为 (C₁ + C₂t)eʳᵗ，y′(0) = rC₁ + C₂。"
      },
      {
        "label": "Q10b",
        "prompt": "For y″ + 10y′ + 25y = 0, y(0) = −4, y′(0) = 25, when does y reach its maximum for t ≥ 0?",
        "choices": [
          "0.2 s",
          "1 s",
          "0.8 s",
          "5 s"
        ],
        "correct": 1,
        "why": "y = (−4 + 5t)e⁻⁵ᵗ，y′ = 25(1 − t)e⁻⁵ᵗ，在 t = 1 由正转负。"
      },
      {
        "label": "Q11",
        "prompt": "y″ − 6y′ + 9y = 0, y(0) = -4, y′(0) = -14. Find y(t).",
        "choices": [
          "(-4 + -2·t)·exp(3·t)",
          "(-3 + -2·t)·exp(3·t)",
          "(-4 + -3·t)·exp(3·t)",
          "(-5 + -1·t)·exp(3·t)"
        ],
        "correct": 0,
        "why": "重根 r = 3。通解为 (C₁ + C₂t)eʳᵗ，y′(0) = rC₁ + C₂。"
      },
      {
        "label": "Q12",
        "prompt": "y″ + y′ − 6y = 0, y(0) = 2, y′(0) = 14. Find y(t).",
        "choices": [
          "5·exp(2·t) + -2·exp(-3·t)",
          "4·exp(2·t) + -3·exp(-3·t)",
          "3·exp(2·t) + -1·exp(-3·t)",
          "4·exp(2·t) + -2·exp(-3·t)"
        ],
        "correct": 3,
        "why": "特征根为 2 和 -3。代入初值得 C₁ + C₂ = 2，2C₁ + -3C₂ = 14。"
      },
      {
        "label": "Q13",
        "prompt": "y″ + 4y′ + 5y = 0, y(0) = -4, y′(0) = 5. Find y(t).",
        "choices": [
          "exp(-2·t)·(-3·cos(1·t) + -3·sin(1·t))",
          "exp(-2·t)·(-4·cos(1·t) + -4·sin(1·t))",
          "exp(-2·t)·(-4·cos(1·t) + -3·sin(1·t))",
          "exp(-2·t)·(-5·cos(1·t) + -2·sin(1·t))"
        ],
        "correct": 2,
        "why": "根的实部为 -2，虚部绝对值为 1。初值得 C₁ = -4，rC₁ + ωC₂ = 5。"
      },
      {
        "label": "Q13b",
        "prompt": "y″ + 4y′ + 5y = 0, y(0) = -4, y′(0) = 5. Describe the long-term behavior.",
        "choices": [
          "Steady oscillations",
          "Oscillations with decreasing amplitude",
          "Oscillations with increasing amplitude",
          "Nonoscillatory motion"
        ],
        "correct": 1,
        "why": "振幅的包络与 eʳᵗ 成正比，r = -2。"
      }
    ]
  },
  {
    "week": 6,
    "source": 710824,
    "title": "Wk 5-3 · Characteristic with Complex Solutions",
    "questions": [
      {
        "label": "Q1a",
        "prompt": "For y″ + 4y′ + 5y = 0, write the solution as exp(at)[C₁ cos(bt) + C₂ sin(bt)], b ≥ 0. Find (a,b).",
        "choices": [
          "(2, 1)",
          "(−2, 2)",
          "(−2, 1)",
          "(−4, 1)"
        ],
        "correct": 2,
        "why": "特征方程 r² + 4r + 5 = 0 的根为 −2 ± i。"
      },
      {
        "label": "Q1b",
        "prompt": "y″ + 4y′ + 5y = 0, y(0) = 1, y′(0) = 0. Find y(t).",
        "choices": [
          "exp(-2·t)·(2·cos(1·t) + 2·sin(1·t))",
          "exp(-2·t)·(1·cos(1·t) + 2·sin(1·t))",
          "exp(-2·t)·(1·cos(1·t) + 1·sin(1·t))",
          "exp(-2·t)·(0·cos(1·t) + 3·sin(1·t))"
        ],
        "correct": 1,
        "why": "根的实部为 -2，虚部绝对值为 1。初值得 C₁ = 1，rC₁ + ωC₂ = 0。"
      },
      {
        "label": "Q2",
        "prompt": "y″ − 6y′ + 18y = 0, y(0) = 4, y′(0) = 9. Find y(t).",
        "choices": [
          "exp(3·t)·(4·cos(3·t) + -1·sin(3·t))",
          "exp(3·t)·(5·cos(3·t) + -1·sin(3·t))",
          "exp(3·t)·(4·cos(3·t) + -2·sin(3·t))",
          "exp(3·t)·(3·cos(3·t) + 0·sin(3·t))"
        ],
        "correct": 0,
        "why": "根的实部为 3，虚部绝对值为 3。初值得 C₁ = 4，rC₁ + ωC₂ = 9。"
      },
      {
        "label": "Q2b",
        "prompt": "y″ − 6y′ + 18y = 0, y(0) = 4, y′(0) = 9. Describe the long-term behavior.",
        "choices": [
          "Oscillations with decreasing amplitude",
          "Steady oscillations",
          "Nonoscillatory motion",
          "Oscillations with increasing amplitude"
        ],
        "correct": 3,
        "why": "振幅的包络与 eʳᵗ 成正比，r = 3。"
      },
      {
        "label": "Q3",
        "prompt": "y″ − 8y′ + 17y = 0, y(0) = 3, y′(0) = 8. Find y(t).",
        "choices": [
          "exp(4·t)·(4·cos(1·t) + -4·sin(1·t))",
          "exp(4·t)·(3·cos(1·t) + -5·sin(1·t))",
          "exp(4·t)·(3·cos(1·t) + -4·sin(1·t))",
          "exp(4·t)·(2·cos(1·t) + -3·sin(1·t))"
        ],
        "correct": 2,
        "why": "根的实部为 4，虚部绝对值为 1。初值得 C₁ = 3，rC₁ + ωC₂ = 8。"
      },
      {
        "label": "Q3b",
        "prompt": "y″ − 8y′ + 17y = 0, y(0) = 3, y′(0) = 8. Describe the long-term behavior.",
        "choices": [
          "Oscillations with decreasing amplitude",
          "Oscillations with increasing amplitude",
          "Steady oscillations",
          "Nonoscillatory motion"
        ],
        "correct": 1,
        "why": "振幅的包络与 eʳᵗ 成正比，r = 4。"
      },
      {
        "label": "Q4",
        "prompt": "y″ + 8y′ + 32y = 0, y(0) = 1, y′(0) = 0. Find y(t).",
        "choices": [
          "exp(-4·t)·(1·cos(4·t) + 1·sin(4·t))",
          "exp(-4·t)·(2·cos(4·t) + 1·sin(4·t))",
          "exp(-4·t)·(1·cos(4·t) + 0·sin(4·t))",
          "exp(-4·t)·(0·cos(4·t) + 2·sin(4·t))"
        ],
        "correct": 0,
        "why": "根的实部为 -4，虚部绝对值为 4。初值得 C₁ = 1，rC₁ + ωC₂ = 0。"
      },
      {
        "label": "Q4b",
        "prompt": "y″ + 8y′ + 32y = 0, y(0) = 1, y′(0) = 0. Describe the long-term behavior.",
        "choices": [
          "Steady oscillations",
          "Oscillations with increasing amplitude",
          "Nonoscillatory motion",
          "Oscillations with decreasing amplitude"
        ],
        "correct": 3,
        "why": "振幅的包络与 eʳᵗ 成正比，r = -4。"
      },
      {
        "label": "Q5",
        "prompt": "y″ + 8y′ + 20y = 0, y(0) = 3, y′(0) = -8. Find y(t).",
        "choices": [
          "exp(-4·t)·(4·cos(2·t) + 2·sin(2·t))",
          "exp(-4·t)·(3·cos(2·t) + 1·sin(2·t))",
          "exp(-4·t)·(3·cos(2·t) + 2·sin(2·t))",
          "exp(-4·t)·(2·cos(2·t) + 3·sin(2·t))"
        ],
        "correct": 2,
        "why": "根的实部为 -4，虚部绝对值为 2。初值得 C₁ = 3，rC₁ + ωC₂ = -8。"
      },
      {
        "label": "Q5b",
        "prompt": "y″ + 8y′ + 20y = 0, y(0) = 3, y′(0) = -8. Describe the long-term behavior.",
        "choices": [
          "Steady oscillations",
          "Oscillations with decreasing amplitude",
          "Oscillations with increasing amplitude",
          "Nonoscillatory motion"
        ],
        "correct": 1,
        "why": "振幅的包络与 eʳᵗ 成正比，r = -4。"
      },
      {
        "label": "Q6",
        "prompt": "y″ + 6y′ + 13y = 0, y(0) = -2, y′(0) = 10. Find y(t).",
        "choices": [
          "exp(-3·t)·(-2·cos(2·t) + 2·sin(2·t))",
          "exp(-3·t)·(-1·cos(2·t) + 2·sin(2·t))",
          "exp(-3·t)·(-2·cos(2·t) + 1·sin(2·t))",
          "exp(-3·t)·(-3·cos(2·t) + 3·sin(2·t))"
        ],
        "correct": 0,
        "why": "根的实部为 -3，虚部绝对值为 2。初值得 C₁ = -2，rC₁ + ωC₂ = 10。"
      },
      {
        "label": "Q6b",
        "prompt": "y″ + 6y′ + 13y = 0, y(0) = -2, y′(0) = 10. Describe the long-term behavior.",
        "choices": [
          "Steady oscillations",
          "Oscillations with increasing amplitude",
          "Nonoscillatory motion",
          "Oscillations with decreasing amplitude"
        ],
        "correct": 3,
        "why": "振幅的包络与 eʳᵗ 成正比，r = -3。"
      },
      {
        "label": "Q7",
        "prompt": "y‴ − 2y″ − y′ + 2y = 0, y(0)=9, y′(0)=6, y″(0)=18. Find y(t).",
        "choices": [
          "4·exp(2t) + 3·exp(1t) + 3·exp(-1t)",
          "3·exp(2t) + 4·exp(1t) + 3·exp(-1t)",
          "3·exp(2t) + 3·exp(1t) + 3·exp(-1t)",
          "3·exp(2t) + 3·exp(1t) + 4·exp(-1t)"
        ],
        "correct": 2,
        "why": "由特征根和重数得到解的基底 exp(2t)，exp(1t)，exp(-1t)。分别代入 y(0) 及各阶导数的初值，得到系数 3，3，3。"
      },
      {
        "label": "Q8",
        "prompt": "y‴ − y″ − 22y′ + 40y = 0, y(0)=5, y′(0)=−13, y″(0)=71. Find y(t).",
        "choices": [
          "4·exp(-5t) + 3·exp(2t) + -1·exp(4t)",
          "3·exp(-5t) + 3·exp(2t) + -1·exp(4t)",
          "3·exp(-5t) + 4·exp(2t) + -1·exp(4t)",
          "3·exp(-5t) + 3·exp(2t) + 0·exp(4t)"
        ],
        "correct": 1,
        "why": "由特征根和重数得到解的基底 exp(-5t)，exp(2t)，exp(4t)。分别代入 y(0) 及各阶导数的初值，得到系数 3，3，-1。"
      },
      {
        "label": "Q9",
        "prompt": "y‴ + 8y″ + 21y′ + 18y = 0, y(0)=−3, y′(0)=6, y″(0)=−10. Find y(t).",
        "choices": [
          "-1·exp(-2t) + -2·exp(-3t) + -2·t·exp(-3t)",
          "0·exp(-2t) + -2·exp(-3t) + -2·t·exp(-3t)",
          "-1·exp(-2t) + -1·exp(-3t) + -2·t·exp(-3t)",
          "-1·exp(-2t) + -2·exp(-3t) + -1·t·exp(-3t)"
        ],
        "correct": 0,
        "why": "由特征根和重数得到解的基底 exp(-2t)，exp(-3t)，t·exp(-3t)。分别代入 y(0) 及各阶导数的初值，得到系数 -1，-2，-2。"
      },
      {
        "label": "Q10",
        "prompt": "y‴ + 6y″ + 13y′ + 20y = 0, y(0)=2, y′(0)=1, y″(0)=1. Find y(t).",
        "choices": [
          "2·exp(-4t) + 1·exp(-1t)·cos(2t) + 3·exp(-1t)·sin(2t)",
          "1·exp(-4t) + 2·exp(-1t)·cos(2t) + 3·exp(-1t)·sin(2t)",
          "1·exp(-4t) + 1·exp(-1t)·cos(2t) + 4·exp(-1t)·sin(2t)",
          "1·exp(-4t) + 1·exp(-1t)·cos(2t) + 3·exp(-1t)·sin(2t)"
        ],
        "correct": 3,
        "why": "由特征根和重数得到解的基底 exp(-4t)，exp(-1t)·cos(2t)，exp(-1t)·sin(2t)。分别代入 y(0) 及各阶导数的初值，得到系数 1，1，3。"
      },
      {
        "label": "Q11",
        "prompt": "y‴ + 7y″ + 17y′ − 25y = 0, y(0)=2, y′(0)=−10, y″(0)=−4. Find y(t).",
        "choices": [
          "0·exp(1t) + 3·exp(-4t)·cos(3t) + 1·exp(-4t)·sin(3t)",
          "-1·exp(1t) + 4·exp(-4t)·cos(3t) + 1·exp(-4t)·sin(3t)",
          "-1·exp(1t) + 3·exp(-4t)·cos(3t) + 1·exp(-4t)·sin(3t)",
          "-1·exp(1t) + 3·exp(-4t)·cos(3t) + 2·exp(-4t)·sin(3t)"
        ],
        "correct": 2,
        "why": "由特征根和重数得到解的基底 exp(1t)，exp(-4t)·cos(3t)，exp(-4t)·sin(3t)。分别代入 y(0) 及各阶导数的初值，得到系数 -1，3，1。"
      },
      {
        "label": "Q12",
        "prompt": "y⁽⁴⁾ + 50y″ + 625y = 0, y(0)=3, y′(0)=17, y″(0)=−95, y‴(0)=−275. Find y(t).",
        "choices": [
          "4·cos(5t) + 4·sin(5t) + -3·t·cos(5t) + -2·t·sin(5t)",
          "3·cos(5t) + 4·sin(5t) + -3·t·cos(5t) + -2·t·sin(5t)",
          "3·cos(5t) + 5·sin(5t) + -3·t·cos(5t) + -2·t·sin(5t)",
          "3·cos(5t) + 4·sin(5t) + -2·t·cos(5t) + -2·t·sin(5t)"
        ],
        "correct": 1,
        "why": "由特征根和重数得到解的基底 cos(5t)，sin(5t)，t·cos(5t)，t·sin(5t)。分别代入 y(0) 及各阶导数的初值，得到系数 3，4，-3，-2。"
      },
      {
        "label": "Q13",
        "prompt": "y⁽⁴⁾ + 32y″ + 256y = 0, y(0)=1, y′(0)=−5, y″(0)=−48, y‴(0)=112. Find y(t).",
        "choices": [
          "1·cos(4t) + -1·sin(4t) + -1·t·cos(4t) + -4·t·sin(4t)",
          "2·cos(4t) + -1·sin(4t) + -1·t·cos(4t) + -4·t·sin(4t)",
          "1·cos(4t) + 0·sin(4t) + -1·t·cos(4t) + -4·t·sin(4t)",
          "1·cos(4t) + -1·sin(4t) + 0·t·cos(4t) + -4·t·sin(4t)"
        ],
        "correct": 0,
        "why": "由特征根和重数得到解的基底 cos(4t)，sin(4t)，t·cos(4t)，t·sin(4t)。分别代入 y(0) 及各阶导数的初值，得到系数 1，-1，-1，-4。"
      }
    ]
  },
  {
    "week": 6,
    "source": 714326,
    "title": "Damping and Spring Mass",
    "questions": [
      {
        "label": "Q1",
        "prompt": "Classify the mass–spring system with m = 1 kg, k = 1 N/m, and b = 1 N·s/m.",
        "choices": [
          "Critically damped",
          "Overdamped",
          "Underdamped",
          "Undamped"
        ],
        "correct": 2,
        "why": "b² − 4mk = -3。负值为欠阻尼，零为临界阻尼，正值为过阻尼。"
      },
      {
        "label": "Q2",
        "prompt": "Classify the mass–spring system with m = 3 kg, k = 7 N/m, and b = 1 N·s/m.",
        "choices": [
          "Critically damped",
          "Underdamped",
          "Overdamped",
          "Undamped"
        ],
        "correct": 1,
        "why": "b² − 4mk = -83。负值为欠阻尼，零为临界阻尼，正值为过阻尼。"
      },
      {
        "label": "Q3",
        "prompt": "Classify the mass–spring system with m = 9 kg, k = 2 N/m, and b = 9 N·s/m.",
        "choices": [
          "Overdamped",
          "Underdamped",
          "Critically damped",
          "Undamped"
        ],
        "correct": 0,
        "why": "b² − 4mk = 9。负值为欠阻尼，零为临界阻尼，正值为过阻尼。"
      },
      {
        "label": "Q4",
        "prompt": "Classify the mass–spring system with m = 4 kg, k = 2 N/m, and b = 5 N·s/m.",
        "choices": [
          "Critically damped",
          "Overdamped",
          "Undamped",
          "Underdamped"
        ],
        "correct": 3,
        "why": "b² − 4mk = -7。负值为欠阻尼，零为临界阻尼，正值为过阻尼。"
      },
      {
        "label": "Q5a",
        "prompt": "A 7 kg mass stretches a spring 0.05 m. Use g = 9.8 m/s². Find k.",
        "choices": [
          "686 N/m",
          "2744 N/m",
          "1372 N/m",
          "68.6 N/m"
        ],
        "correct": 2,
        "why": "静力平衡给出 kΔx = mg。"
      },
      {
        "label": "Q5b",
        "prompt": "A 7 kg mass stretches a spring 0.05 m. Use g = 9.8 m/s². Replace it with a 10 kg mass with x(0) = -0.55 m and x′(0) = -2 m/s, taking downward as positive. Find x(t).",
        "choices": [
          "0.55·cos(11.71324037t) + -0.17074694·sin(11.71324037t)",
          "-0.55·cos(11.71324037t) + -0.17074694·sin(11.71324037t)",
          "-0.55·cos(11.71324037t) + -2·sin(11.71324037t)",
          "-0.55·cos(11.71324037t) + 0.17074694·sin(11.71324037t)"
        ],
        "correct": 1,
        "why": "用 ω = √(k/m)，余弦系数为 x(0)，正弦系数为 x′(0)/ω。选项的系数按小数近似。"
      },
      {
        "label": "Q6",
        "prompt": "A weight of 8 lb stretches the spring 7 in. Resistance is A lb at 2 ft/s. Using g = 32 ft/s², find the threshold above which the system is overdamped.",
        "choices": [
          "7.4065608 lb",
          "3.7032804 lb",
          "14.8131216 lb",
          "2.13808994 lb"
        ],
        "correct": 0,
        "why": "用 m = W/32、k = W/(L/12)、b = A/2。由 b² > 4mk 得 A > 4√(mk)。"
      },
      {
        "label": "Q7",
        "prompt": "A weight of 32 lb stretches the spring 9 in. Resistance is A lb at 2 ft/s. Using g = 32 ft/s², find the threshold above which the system is overdamped.",
        "choices": [
          "13.06394529 lb",
          "52.25578118 lb",
          "7.54247233 lb",
          "26.12789059 lb"
        ],
        "correct": 3,
        "why": "用 m = W/32、k = W/(L/12)、b = A/2。由 b² > 4mk 得 A > 4√(mk)。"
      },
      {
        "label": "Q8",
        "prompt": "A weight of 48 lb stretches the spring 6 in. Viscous resistance is 10 lb at 2 ft/s. It is pulled down another 3 in and released. Find displacement in feet using g = 32 ft/s².",
        "choices": [
          "exp(-1.66666667·t)·(1.25·cos(7.82446306·t) + 0.05325179·sin(7.82446306·t))",
          "exp(-1.66666667·t)·(0.25·cos(7.82446306·t) + -0.94674821·sin(7.82446306·t))",
          "exp(-1.66666667·t)·(0.25·cos(7.82446306·t) + 0.05325179·sin(7.82446306·t))",
          "exp(-1.66666667·t)·(-0.75·cos(7.82446306·t) + 1.05325179·sin(7.82446306·t))"
        ],
        "correct": 2,
        "why": "先用 m = W/32、k = W/(L/12)、b = F/v 建立方程。根的实部为 -1.66666667，虚部绝对值为 7.82446306。初值得 C₁ = 0.25，rC₁ + ωC₂ = 0。"
      },
      {
        "label": "Q9",
        "prompt": "A weight of 16 lb stretches the spring 4 in. Viscous resistance is 19 lb at 2 ft/s. It is pulled down another 3 in and released. Find displacement in feet using g = 32 ft/s².",
        "choices": [
          "exp(-9.5·t)·(1.25·cos(2.39791576·t) + 0.99044347·sin(2.39791576·t))",
          "exp(-9.5·t)·(0.25·cos(2.39791576·t) + 0.99044347·sin(2.39791576·t))",
          "exp(-9.5·t)·(0.25·cos(2.39791576·t) + -0.00955653·sin(2.39791576·t))",
          "exp(-9.5·t)·(-0.75·cos(2.39791576·t) + 1.99044347·sin(2.39791576·t))"
        ],
        "correct": 1,
        "why": "先用 m = W/32、k = W/(L/12)、b = F/v 建立方程。根的实部为 -9.5，虚部绝对值为 2.39791576。初值得 C₁ = 0.25，rC₁ + ωC₂ = 0。"
      },
      {
        "label": "Q10",
        "prompt": "A weight of 32 lb stretches the spring 3 in. Viscous resistance is 3 lb at 2 ft/s. It is pulled down another 4 in and released. Find displacement in feet using g = 32 ft/s².",
        "choices": [
          "exp(-0.75·t)·(0.33333333·cos(11.2888219·t) + 0.0221458·sin(11.2888219·t))",
          "exp(-0.75·t)·(1.33333333·cos(11.2888219·t) + 0.0221458·sin(11.2888219·t))",
          "exp(-0.75·t)·(0.33333333·cos(11.2888219·t) + -0.9778542·sin(11.2888219·t))",
          "exp(-0.75·t)·(-0.66666667·cos(11.2888219·t) + 1.0221458·sin(11.2888219·t))"
        ],
        "correct": 0,
        "why": "先用 m = W/32、k = W/(L/12)、b = F/v 建立方程。根的实部为 -0.75，虚部绝对值为 11.2888219。初值得 C₁ = 0.3333333333333333，rC₁ + ωC₂ = 0。"
      },
      {
        "label": "Q11a",
        "prompt": "A 13 kg mass stretches a spring 0.25 m. Use g = 9.8 m/s². Find k.",
        "choices": [
          "254.8 N/m",
          "1019.2 N/m",
          "127.4 N/m",
          "509.6 N/m"
        ],
        "correct": 3,
        "why": "静力平衡给出 kΔx = mg。"
      },
      {
        "label": "Q11b",
        "prompt": "A 13 kg mass stretches a spring 0.25 m. Use g = 9.8 m/s². Replace it with a 14 kg mass with x(0) = 1 m and x′(0) = -1.5 m/s, taking downward as positive. Find x(t).",
        "choices": [
          "-1·cos(6.03324125t) + -0.24862258·sin(6.03324125t)",
          "1·cos(6.03324125t) + -1.5·sin(6.03324125t)",
          "1·cos(6.03324125t) + -0.24862258·sin(6.03324125t)",
          "1·cos(6.03324125t) + 0.24862258·sin(6.03324125t)"
        ],
        "correct": 2,
        "why": "用 ω = √(k/m)，余弦系数为 x(0)，正弦系数为 x′(0)/ω。选项的系数按小数近似。"
      }
    ]
  }
];
