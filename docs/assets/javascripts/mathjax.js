window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: "|.*|",
    processHtmlClass: "arithmatex"
  }
};

// Material uses full page navigation here. MathJax startup typesets once.
// Re-typesetting the generated assistive MathML would nest duplicate containers.
