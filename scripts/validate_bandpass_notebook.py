import json
from pathlib import Path
import nbformat
from nbclient import NotebookClient

root = Path(__file__).resolve().parents[1]
nb = nbformat.read(root / 'notebooks/continuous_to_discrete_bandpass.ipynb', as_version=4)
nb.cells.append(nbformat.v4.new_code_cell(r"""
# Regression checks executed in the same fresh kernel as the notebook.
import sys
print("Kernel Python:", sys.version)
expected = {'W1_min_rad_s': 200*np.pi, 'Ts_max_s': 1/200,
            'Omega_a_rad_sample': np.pi/2, 'Omega_b_rad_sample': np.pi}
for key, value in expected.items():
    assert np.isclose(result[key], value), (key, result[key], value)
other = solve_bandpass_latex(30, 120, unit='Hz')
assert np.isclose(other['W1_min_rad_s'], 240*np.pi)
assert np.isclose(other['Ts_max_s'], 1/240)
assert np.isclose(other['Omega_a_rad_sample'], np.pi/4)
assert np.isclose(other['Omega_b_rad_sample'], np.pi)
angular = solve_bandpass_latex(60*np.pi, 240*np.pi, unit='rad/s', make_plot=False)
for key in other:
    assert np.isclose(other[key], angular[key]), key
try:
    solve_bandpass_latex(200, 100)
except ValueError as exc:
    assert 'lower < upper' in str(exc)
    print('Invalid input correctly rejected:', exc)
else:
    raise AssertionError('Reversed edges must raise ValueError')
print('Original values, alternate input, unit equivalence, invalid input: PASS')
"""))
NotebookClient(nb, timeout=180, kernel_name='python3', resources={'metadata': {'path': str(root)}}).execute()
latex = sum('text/latex' in o.get('data', {}) for c in nb.cells for o in c.get('outputs', []))
images = sum('image/png' in o.get('data', {}) for c in nb.cells for o in c.get('outputs', []))
assert latex >= 24, latex
for index in [3, 7, 9, 14]:
    assert any('image/png' in o.get('data', {}) for o in nb.cells[index].outputs), index
assert not any(o.output_type == 'error' for c in nb.cells for o in c.get('outputs', []))
print(json.dumps({'code_cells': sum(c.cell_type == 'code' for c in nb.cells), 'latex_outputs': latex, 'png_figures': images, 'errors': 0}))
