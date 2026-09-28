"""Package ENGR 103 reference programs and add pages to the MkDocs site."""

from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import ast
import shutil
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "engr103-reference"
SITE = ROOT
DOWNLOADS = SITE / "docs/assets/downloads/engr103"
IMAGES = SITE / "docs/assets/images/engr103"
PAGES = SITE / "docs/engr103"

HANDOUTS = {
    "ICA1": "172lhalBy1--8jknd9AQZ61XFpwxnWKJY",
    "ICA2": "1-wijsgwsJ8aQoyyW6ukTjpyeAIbpEBGo",
    "ICA3": "16Xl6CFYXeixKFaguijP35Ju7mYPIivWR",
    "ICA4": "1ILoDYjTLfWj4juIKUDwMfEouv3DLrJ_U",
    "ICA5": "1YpBPLB8_PTfUsz8c7jnl4wZFA2gRBvqM",
    "ICA6": "1gMHzZ1nXAEgqWlkXIBJlzgbiQUgPqmSb",
    "ICA7": "1189BfNYYin27tTBWw6cO1_8sPkEZ_lps",
    "ICA8": "1A_jANGJCwxIkqik0BhtlUWu2oCQn5X7R",
    "ICA9": "1HqxdV_Cd0hiNjafWJQIHcQJC35py5Wu3",
    "ICA10": "1Mu4SZM2UyKIIeKEPdacSivoMejZH5BYA",
    "HW1": "1Caf5JvLlKLhornaX398x7u5XkAhEPG5a",
    "HW2": "1-p-ymYpDvEY9i_NrghFC6QZo77rycy-x",
    "HW3": "16Xx1pBc1H1hi-sIClpdMQjjPmDkffn1t",
    "HW4": "1JmssP5f-iI7XS3zTsd9fR7c8vVa-BXQ9",
    "HW5": "1Zw2Wx_zzUPN0PHPYUUFk0W33F4I3VylY",
    "HW6": "1q1uwu5eo8J4srPha7XK_amn4lxXru2Uy",
    "HW7": "11_JLh2_2vMxozUvbt11T0NXheZKID7QM",
    "HW8": "1Auho9lMApsLiH86Fwvp4zE_Dgw9_bFZ6",
    "HW9": "1JNGXVZbaiHI_Rh5RvKRe2WQM5d_H0cek",
}

DUE = {
    "ICA1": "Oct 5", "HW1": "Oct 7", "ICA2": "Oct 12", "HW2": "Oct 14",
    "ICA3": "Oct 19", "HW3": "Oct 21", "ICA4": "Oct 26", "HW4": "Oct 28",
    "ICA5": "Nov 4", "HW5": "Nov 4", "ICA6": "Nov 9", "HW6": "Nov 16",
    "ICA7": "Nov 16", "HW7": "Nov 18", "ICA8": "Nov 23", "HW8": "Nov 25",
    "ICA9": "Nov 30", "HW9": "Dec 2", "ICA10": "Dec 4",
}

NOTES = {
    "ICA1": "The cooling equation in the handout contains a sign typo. The program follows the stated formulas for k and time since death.",
    "ICA2": "The trail-mix data are dimensionally inconsistent: the handout's bag counts require multiplying the listed ingredient figures by 2, while pounds-to-ounces requires multiplying by 16. Program 2_4 shows both interpretations.",
    "HW5": "For the ellipse, the valid x range is [h-a, h+a]; with the assigned h=3 and a=6, this is [-3, 9]. The handout's generic [-a, 2a] coincides only for the supplied numbers.",
    "ICA9": "The handout omits integration bounds and a time interval for 9_2/9_3. The reference chooses 0 to 10 s for ten velocity samples and 0 to 1 for the integral; adjust these if your instructor supplies other bounds.",
    "ICA10": "ICA 10 has two separate handouts: polygon plotting and a click-to-play tic-tac-toe game. The latter needs a local Matplotlib GUI, so it is not included in headless batch execution.",
}

ORDER = [name for number in range(1, 11) for name in (f"ICA{number}", f"HW{number}") if name in HANDOUTS]


def description(path):
    tree = ast.parse(path.read_text(encoding="utf-8"))
    return ast.get_docstring(tree) or path.name


def display(name):
    return ("ICA " if name.startswith("ICA") else "Homework ") + name.lstrip("ICAHW")


def slug(name):
    return ("ica-" if name.startswith("ICA") else "hw-") + name.lstrip("ICAHW").zfill(2)


def main():
    for folder in (DOWNLOADS, IMAGES, PAGES):
        folder.mkdir(parents=True, exist_ok=True)

    # Render all worked examples during the Pages build. Binary artifacts
    # therefore arrive in the deployed site without storing them in Git.
    example_inputs = {
        "ICA1_1": "5\n9\n-7\n18\n", "ICA1_2": "5.5\n13.6\n",
        "ICA1_3": "5.3\n6\n42\n", "ICA1_4": "4\n35\n",
        "ICA1_5": "09:30\n80\n10:30\n75\n70\n",
        "ICA2_1": "1 2 3\n2\n1 2\n3 4\n",
        "HW1_1": "15\n25\n", "HW1_2": "25\n",
        "HW1_3": "8\n", "HW1_4": "30\n12\n50\n",
    }
    for name in ORDER:
        folder = SOURCE / name
        for path in sorted(folder.glob("*.py")):
            if path.name.endswith("tic_tac_toe_game.py"):
                continue  # Interactive GUI; use local Python to play.
            suffix = path.stem.split(f"{name}_", 1)[-1]
            result = subprocess.run(
                [sys.executable, path.name], input=example_inputs.get(f"{name}_{suffix}", ""),
                text=True, capture_output=True, cwd=folder, timeout=180)
            if result.returncode:
                raise RuntimeError(f"{path}: {result.stderr[-2000:]}")

    index = ["# ENGR 103 Python reference programs", "",
             "Independent study examples for the Fall 2026 course. There are 19 program assignments and 61 Python files. The midterm, final and class survey are separate activities and have no advance Python handout.", "",
             "The Canvas academic-integrity instructions prohibit submitting AI-created work or sharing code with classmates. Use these examples to understand the methods; write your own submitted files.", "",
             "Each ZIP contains separate scripts for every numbered problem, required input data, and any produced example figures.", "",
             "| Assignment | Due (2026) | Programs | Download |",
             "| --- | --- | ---: | --- |"]
    navigation = ["  - ENGR 103:", "      - Overview: engr103/index.md"]

    for name in ORDER:
        source = SOURCE / name
        files = sorted(source.glob("*.py"))
        if not files:
            raise ValueError(f"No programs for {name}")
        zip_name = f"ENGR103_{name}_Su_Tong_Reference.zip"
        image_folder = IMAGES / slug(name)
        image_folder.mkdir(parents=True, exist_ok=True)
        extra = sorted(path for path in source.iterdir() if path.suffix.lower() in (".csv", ".txt", ".xlsx", ".png", ".gif"))
        readme = [f"# ENGR 103 {display(name)} reference programs", "",
                  "For independent study only. Canvas submissions must be your own work.", "",
                  "Run each program separately with Python 3.10 or newer from this folder:", "",
                  f"    python3 {files[0].name}", "",
                  "Install third-party packages when needed: `python3 -m pip install numpy matplotlib pandas openpyxl pillow`.", "",
                  "The plotting examples write PNG figures; the animations write GIFs.", "",
                  "Programs:", ""]
        for path in files:
            readme.append(f"- `{path.name}` — {description(path)}")
        if extra:
            readme += ["", "Included data and sample output:", ""]
            readme += [f"- `{path.name}`" for path in extra]
        if name in NOTES:
            readme += ["", "## Handout clarification", "", NOTES[name]]
        readme += ["", f"Source handout: https://drive.google.com/file/d/{HANDOUTS[name]}/view", ""]
        (source / "README.md").write_text("\n".join(readme), encoding="utf-8")
        with ZipFile(DOWNLOADS / zip_name, "w", ZIP_DEFLATED) as archive:
            for path in files + extra + [source / "README.md"]:
                archive.write(path, path.name)

        page = [f"# ENGR 103 {display(name)}", "",
                f"**Due:** {DUE[name]}, 2026 at 11:59 PM (Pacific).",
                "", f"[Download {zip_name}](../assets/downloads/engr103/{zip_name})",
                "", f"[Instructor handout](https://drive.google.com/file/d/{HANDOUTS[name]}/view)",
                "", "## Programs", "",
                "| File | Purpose |", "| --- | --- |"]
        for path in files:
            page.append(f"| `{path.name}` | {description(path)} |")
        if name in NOTES:
            page += ["", "## Handout clarification", "", NOTES[name]]
        images = [path for path in extra if path.suffix.lower() in (".png", ".gif")]
        if images:
            page += ["", "## Example outputs", ""]
            for path in images:
                shutil.copy2(path, image_folder / path.name)
                page += [f"![{path.stem} output](../assets/images/engr103/{slug(name)}/{path.name})", ""]
        page += ["", "These are reference examples. The course requires your submitted code to be your own work.", ""]
        (PAGES / f"{slug(name)}.md").write_text("\n".join(page), encoding="utf-8")
        index.append(f"| [{display(name)}]({slug(name)}.md) | {DUE[name]} | {len(files)} | [ZIP](../assets/downloads/engr103/{zip_name}) |")
        navigation.append(f"      - {display(name)}: engr103/{slug(name)}.md")
    (PAGES / "index.md").write_text("\n".join(index) + "\n", encoding="utf-8")

    config = SITE / "mkdocs.yml"
    original = config.read_text(encoding="utf-8")
    if "  - ENGR 103:" not in original:
        original = original.replace("  - ENGR 202:\n", "\n".join(navigation) + "\n  - ENGR 202:\n", 1)
        config.write_text(original, encoding="utf-8")


if __name__ == "__main__":
    main()
