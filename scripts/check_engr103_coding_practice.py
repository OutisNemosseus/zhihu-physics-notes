"""Validate generated practice data and render the ten HW4 targets."""
from pathlib import Path
import ast
import contextlib
import io
import json
import os
import shutil
import tempfile
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "docs/course-practice/engr103"
fill = json.loads((BASE / "snippet-fill-practice/questions.json").read_text())
coding = json.loads((BASE / "hw4-coding-practice/questions.json").read_text())
assert len(fill) == 157 and len({q["key"] for q in fill}) == 157
assert len({q["group"] for q in fill}) == 21
for q in fill:
    rebuilt = (q["prefix"] + "\n\n" if q["prefix"] else "") + q["answer"] + ("\n\n" + q["suffix"] if q["suffix"] else "") + "\n"
    assert rebuilt == q["solution"], q["key"]
    ast.parse(q["answer"])
    ast.parse(rebuilt)
    for name, body in q["csv"].items():
        assert isinstance(body, str) and body.strip(), (q["key"], name)
assert len(coding) == 10
assert {q["source"] for q in coding} == {"HW4_1","HW4_2","HW4_3","HW4_4"}
out = BASE / "hw4-coding-practice/expected"
out.mkdir(parents=True, exist_ok=True)
old_show = plt.show
shown = []
plt.show = lambda *a, **k: shown.append(plt.gcf())
try:
    with tempfile.TemporaryDirectory() as temp:
        original_cwd = os.getcwd()
        os.chdir(temp)
        try:
            for q in coding:
                plt.close("all")
                shown.clear()
                ns = {"__name__": "__main__"}
                ast.parse(q["solution"])
                with contextlib.redirect_stdout(io.StringIO()):
                    exec(compile(q["solution"], q["title"], "exec"), ns)
                fig = ns["fig"]
                axes = [ns["ax1"], ns["ax2"]]
                assert len(axes) == 2 and all(ax.has_data() for ax in axes)
                assert shown and shown[-1] is fig
                assert all(ax.get_xlabel() == "x [in]" and ax.get_ylabel() == "y [in]" for ax in axes)
                p = q["parameters"]
                if q["kind"] == "line":
                    assert all(ax.name == "3d" and len(ax.lines) == 1 for ax in axes)
                    assert len(ns["t"]) == p["n"] and np.isclose(ns["t"][-1],2*np.pi)
                    assert np.allclose(ns["x"]**2+ns["y"]**2, p["r"]**2)
                    for ax, (elev, azim) in zip(axes, p["views"]):
                        assert ax.elev == elev and ax.azim == azim
                    if q["id"] == 3:
                        assert np.isclose(ns["z"][0], np.sqrt(2)/10)
                else:
                    assert ns["X"].shape == ns["Y"].shape == ns["Z"].shape == (p["ny"], p["nx"])
                    assert np.allclose(np.diff(ns["xv"]), .1) and np.allclose(np.diff(ns["yv"]), .1)
                    assert np.allclose(ns["X"][0],ns["xv"]) and np.allclose(ns["Y"][:,0],ns["yv"])
                    assert len(ns["levels"]) == 21
                    assert len(fig.axes) == (4 if q["kind"] in ("contour","surface") else 3)
                    if q["id"] == 5:
                        assert abs(ns["Z"][40,70]) < 1e-12
                    if q["id"] == 8:
                        assert np.isclose(ns["Z"][40,50],np.sin(2))
                    if q["kind"] == "surface":
                        from mpl_toolkits.mplot3d.art3d import Poly3DCollection
                        assert all(any(isinstance(c,Poly3DCollection) for c in ax.collections) for ax in axes)
                        assert len(axes[1].collections) > len(axes[0].collections)
                        assert np.allclose(axes[1].get_zlim(), [p["offset"],p["zmax"]])
                    if q["id"] == 10:
                        assert np.isclose(ns["Z"][50,60],2*np.sin(1))
                png = Path(f"HW4_practice_Q{q['id']:02d}.png")
                assert png.read_bytes().startswith(b"\x89PNG\r\n\x1a\n") and png.stat().st_size > 5000
                shutil.copyfile(png,out / f"q{q['id']:02d}.png")
            for n in range(1,5):
                plt.close("all")
                code = (BASE / f"hw4-coding-practice/ica4_reference_{n}.py").read_text()
                with contextlib.redirect_stdout(io.StringIO()):
                    exec(compile(code,f"ICA4_{n}", "exec"),{"__name__":"__main__"})
                assert any(ax.has_data() for figid in plt.get_fignums() for ax in plt.figure(figid).axes)
        finally:
            os.chdir(original_cwd)
finally:
    plt.show = old_show
    plt.close("all")
print("157 blanks reconstruct all 21 programs; 10 HW4 targets and 4 ICA examples render successfully.")
