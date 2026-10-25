"""Independent modified nodal analysis of the ten textbook circuits.

Checks open-circuit voltage, 1 A port test impedance, short-circuit current,
and the loaded 10.62 output against the quiz's numeric answer metadata.
"""
import cmath
import json
from pathlib import Path
import re
import unittest
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / 'docs/course-practice/engr202/thevenin-norton-10/index.html'
BANK = json.loads(re.search(r'<script id="bank" type="application/json">(.*?)</script>', PAGE.read_text(), re.S).group(1))

def polar(m, d):
    return cmath.rect(m, d * np.pi / 180)

# Element tuples: Z (impedance), I (current from n+ to n-),
# V (V(n+)-V(n-)), G (VCCS current n+->n-, control c+ minus c-).
CIRCUITS = [
    (3, (3,0), [('V',1,0,polar(50,30)),('Z',1,2,20j),('Z',2,0,-10j),('Z',2,3,10)]),
    (2, (2,0), [('I',0,1,4),('Z',1,0,8),('Z',1,2,-5j),('Z',2,0,10j)]),
    (2, (2,0), [('I',0,2,2),('Z',1,0,6),('Z',1,2,4j),('Z',1,2,-2j)]),
    (3, (3,0), [('V',1,0,polar(120,45)),('Z',1,2,30),('Z',2,0,60),('Z',2,3,10j),('Z',3,0,-5j)]),
    (2, (1,0), [('I',0,1,polar(5,45)),('Z',1,2,8),('Z',2,0,-6j),('Z',1,0,10j)]),
    (3, (3,0), [('V',1,0,20),('Z',1,2,10),('Z',2,0,5j),('Z',2,3,-4j),('I',0,3,4),('Z',3,0,4)]),
    (2, (2,0), [('I',0,1,polar(4,30)),('Z',1,0,2000j),('Z',1,0,2000),('Z',1,2,-1000j)]),
    (3, (2,3), [('I',0,1,polar(3,60)),('Z',1,2,60),('Z',2,0,80j),('Z',1,3,40),('Z',3,0,-30j)]),
    (2, (2,0), [('I',0,1,2),('Z',1,0,-3j),('Z',1,2,4),('G',0,2,1,0,1.5/(-3j))]),
    (3, (3,0), [('V',1,0,12),('Z',1,2,4),('Z',2,0,-4j),('Z',2,3,2j),('Z',3,0,-8j),('G',2,3,1,2,.75)]),
]

def solve(count, elems):
    nv = sum(e[0]=='V' for e in elems)
    A=np.zeros((count+nv,count+nv),complex); b=np.zeros(count+nv,complex)
    def stamp(r,c,v):
        if r and c: A[r-1,c-1]+=v
    k=count
    for e in elems:
        kind,p,n=e[:3]
        if kind=='Z':
            y=1/e[3]
            for r,c,v in [(p,p,y),(n,n,y),(p,n,-y),(n,p,-y)]: stamp(r,c,v)
        elif kind=='I':
            if p:b[p-1]-=e[3]
            if n:b[n-1]+=e[3]
        elif kind=='G':
            cp,cn,g=e[3:]
            for r,c,v in [(p,cp,g),(p,cn,-g),(n,cp,-g),(n,cn,g)]:stamp(r,c,v)
        elif kind=='V':
            if p:A[p-1,k]+=1;A[k,p-1]+=1
            if n:A[n-1,k]-=1;A[k,n-1]-=1
            b[k]=e[3];k+=1
    return np.linalg.solve(A,b)

def voltage(sol, port):
    p,n=port
    return (sol[p-1] if p else 0)-(sol[n-1] if n else 0)

class QuizTests(unittest.TestCase):
    def test_all_ten_circuits(self):
        for q,(n,port,elems) in zip(BANK,CIRCUITS):
            with self.subTest(q=q['book']):
                v=voltage(solve(n,elems),port)
                dead=[(e[0],e[1],e[2],0) if e[0] in ('I','V') else e for e in elems]
                z=voltage(solve(n,dead+[('I',port[1],port[0],1)]),port)
                isc=solve(n,elems+[('V',*port,0)])[-1]
                for key,got in [('v',v),('z',z),('i',isc)]:
                    expected=complex(*q['numeric'][key])
                    self.assertAlmostEqual(abs(got-expected),0,places=8)
                self.assertAlmostEqual(abs(v-isc*z),0,places=8)
                self.assertEqual(len(q['options']),4)
                self.assertEqual(len(set(q['options'])),4)
                self.assertTrue((PAGE.parent/q['image']).is_file())
                if q['book']=='10.62':
                    loaded=voltage(solve(n,elems+[('Z',*port,2)]),port)
                    self.assertAlmostEqual(abs(loaded-complex(*q['numeric']['vo'])),0,places=8)
                    self.assertAlmostEqual(abs(loaded-v*2/(z+2)),0,places=8)

if __name__=='__main__':unittest.main()
