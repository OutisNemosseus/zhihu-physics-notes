"""Execute quiz implementations and valid orderings before publishing Pages."""
import contextlib
import io
import json
import os
import tempfile
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.figure import Figure


def main():
    root = Path(__file__).resolve().parents[1]
    folder = root / "docs/course-practice/engr103/hw-ica-134-practice"
    if not folder.exists():
        folder = Path(__file__).resolve().parent
    checks_path = Path(__file__).with_name("engr103-134-checks.json")
    if not checks_path.exists():
        checks_path = folder / "checks.json"
    checks = json.loads(checks_path.read_text())
    bank = json.loads((folder / "questions.json").read_text())
    assert len(bank["programs"]) == 21
    assert all(len(p["mcq"]) == 5 and len(p["tasks"]) == 3 for p in bank["programs"])
    for case in checks["syntax"]:
        compile(case["code"], case["id"], "exec")
    failures = []
    # Plot calls still build actual Matplotlib artists; skip repeated PNG exports.
    original_savefig = Figure.savefig
    Figure.savefig = lambda *args, **kwargs: None
    old_cwd = Path.cwd()
    try:
        with tempfile.TemporaryDirectory() as tmp:
            os.chdir(tmp)
            for csv in (folder / "data").glob("*.csv"):
                Path(csv.name).write_text(csv.read_text())
            for case in checks["cases"]:
                inputs = iter(case["inputs"])
                env = {"input": lambda prompt="": next(inputs)}
                try:
                    with contextlib.redirect_stdout(io.StringIO()):
                        exec(compile(case["code"], case["id"], "exec"), env)
                    assert bool(eval(case["test"], env)), "Numerical requirements failed"
                except Exception as exc:
                    failures.append({"id": case["id"], "error": str(exc)})
                finally:
                    plt.close("all")
    finally:
        os.chdir(old_cwd)
        Figure.savefig = original_savefig
    print(json.dumps({"programs": 21, "execution_cases": len(checks["cases"]),
                      "syntax_cases": len(checks["syntax"]), "failures": failures}, indent=2))
    if failures:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
