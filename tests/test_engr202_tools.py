"""Check all 35 calculator presets using the same Python programs as the browser."""
import contextlib
import importlib.util
import io
import json
from pathlib import Path
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'docs/course-practice/engr202/midterm1-python-tools'
spec = importlib.util.spec_from_file_location('engine', BASE / 'engine.py')
engine = importlib.util.module_from_spec(spec)
spec.loader.exec_module(engine)
DATA = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    'import {tools,presets,matrixDefaults} from '+json.dumps((BASE/'programs.js').as_uri())+';'
    'console.log(JSON.stringify({tools,presets,matrixDefaults}));'
], text=True))


def run(q):
    p = DATA['presets'][str(q)]
    t = next(t for t in DATA['tools'] if t['id'] == p['id'])
    values = {k: v for k, label, v in t['fields']}
    values.update(DATA['matrixDefaults'].get(p['id'], {}))
    values.update(p['values'])
    scope = vars(engine).copy()
    scope['d'] = {k: engine.num(v) for k, v in values.items()}
    with contextlib.redirect_stdout(io.StringIO()) as output:
        exec(t['code'], scope)
    return scope, output.getvalue()


class Calculators(unittest.TestCase):
    def test_all_presets(self):
        self.assertEqual(set(map(int, DATA['presets'])), set(range(1, 36)))
        for q in range(1, 36):
            with self.subTest(q=q):
                _, output = run(q)
                self.assertTrue(output.strip())

    def test_original_answers(self):
        s, _ = run(1)
        self.assertAlmostEqual(s['frequency'], 50)
        self.assertAlmostEqual(s['period'], .02)
        self.assertAlmostEqual(s['remaining'], 120)
        self.assertAlmostEqual(run(4)[0]['z'], engine.P(20, 60))
        self.assertAlmostEqual(run(5)[0]['z'], 10-10j)
        self.assertAlmostEqual(run(6)[0]['Z'], 40-60j)
        self.assertAlmostEqual(abs(run(7)[0]['I']), 8.320502943)
        self.assertAlmostEqual(run(8)[0]['I']*run(8)[0]['d']['z2'], 64-48j)
        self.assertAlmostEqual(run(11)[0]['Va'], 15)
        s, _ = run(12)
        self.assertAlmostEqual(s['x1'], 2-1j)
        self.assertAlmostEqual(s['x2'], 1+1j)
        self.assertAlmostEqual(run(15)[0]['x2'], 6/(4+6j))
        s, _ = run(17)
        self.assertAlmostEqual(10j*s['x1']-10*s['x3'], 0)
        s, _ = run(21)
        self.assertAlmostEqual(s['Zth'], 3.6+10.8j)
        self.assertAlmostEqual(s['Vth'], 216-72j)
        self.assertAlmostEqual(s['IL'], 6-2j)
        self.assertAlmostEqual(run(24)[0]['power'], 1384.615384615)
        self.assertAlmostEqual(run(26)[0]['S'].real, 1320)
        self.assertAlmostEqual(run(27)[0]['ac'], 10/2**.5)
        self.assertAlmostEqual(abs(run(28)[0]['I']), 2.4)
        self.assertAlmostEqual(run(28)[0]['S'].real, 172.8)
        self.assertAlmostEqual(run(29)[0]['peak'], 4)
        self.assertAlmostEqual(run(30)[0]['phi'], -45)
        self.assertAlmostEqual(run(33)[0]['z'], 2+6j)
        self.assertAlmostEqual(run(34)[0]['z'], 2)

    def test_units_and_input_errors(self):
        self.assertAlmostEqual(1j*400*50/1000, 20j)
        for text, expected in [('j20',20j),('-j50',-50j),('3+j4',3+4j),('3+4j',3+4j),('100*pi',100*engine.math.pi),('1e-3',.001),('10@-90',-10j)]:
            self.assertAlmostEqual(engine.num(text), expected)
        for text in ['', '__import__("os")', 'j.__class__', '2**10000']:
            with self.assertRaises((ValueError, SyntaxError)):
                engine.num(text)
        with self.assertRaises(ValueError):
            engine.solve([[1,2],[2,4]],[1,2])
        with self.assertRaises(ValueError):
            engine.positive(0)


if __name__ == '__main__':
    unittest.main()
