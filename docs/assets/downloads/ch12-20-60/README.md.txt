# Chapter 12, problems 12.20–12.60

Source: the user-provided electrobook-(4th ed).pdf. The source crop manifest records its SHA-256, PDF pages, printed pages, and crop coordinates. The complete textbook is not included.

Files preserve repository-relative paths. The 41 Markdown pages are in docs/circuits/basic-feedback. Textbook excerpts and actual LTspice screenshots are in docs/assets/images. The chapter source is intended for the repository's MkDocs Material site; it is not a standalone HTML site.

Problems 12.20–12.34 are ideal-feedback algebra/topology exercises: no fabricated SPICE results are supplied. Problems 12.35–12.60 have actual LTspice 26.1.1 logs and schematics; 12.40 uses its original device circuit. Other AC schematics are explicitly derived textbook small-signal equivalents. DeviceDC netlists where supplied provide a separately labeled nonlinear DC check. Constant-VBE DC decks are textbook models, not exponential BJT models. Design choices, missing physical bandwidth specifications and compliance assumptions are documented on each page.

Open an ASC in LTspice and Run; Ctrl+L opens the actual SPICE Output Log. Keep companion PLT/ASY/INC files together. AC sweeps are normalized small-signal tests, and capacitance-free models do not establish physical bandwidth. All reported comparison values refer to 1kHz unless the page describes the transient measurements for 12.40.

Reproduction from the repository root:

1. python scripts/ch12_models.py (independent KCL calculations)
2. python scripts/ch12_spice_files.py and python scripts/ch12_device_dc.py (input decks only)
3. On Windows, powershell -File scripts/run_ch12_ltspice.ps1 (real LTspice engine logs)
4. On Windows, powershell -File scripts/capture_ch12_ltspice.ps1 -Only all (actual LTspice window capture; closes only instances started by the script)
5. python scripts/render_ch12_pages.py (renders 12.35–12.60 except preserved 12.40 from actual logs and independent equations)
6. powershell -File scripts/run_ch12_ltspice.ps1 -NetlistOnly; python scripts/validate_ch12_artifacts.py
7. python scripts/package_ch12.py (after page/log updates; checks archived bytes)
8. mkdocs build --strict

SHA256.json is an inventory of the aggregate archive's source assets. The aggregate contains the source files underlying the individual downloads, rather than recursively embedding the 41 ZIP archives. Existing 12.1–12.15 downloads are separate and unchanged.
