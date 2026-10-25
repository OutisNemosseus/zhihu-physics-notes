"""Check quiz answers by independent time-domain averaging and nodal analysis."""
import json
from pathlib import Path
import re
import unittest
import numpy as np

PAGE=Path(__file__).resolve().parents[1]/'docs/course-practice/engr202/power-rms-10/index.html'
BANK=json.loads(re.search(r'<script id="bank" type="application/json">(.*?)</script>',PAGE.read_text(),re.S).group(1))

class PowerQuizTests(unittest.TestCase):
    def check(self,index,key,value,tol=1e-7):
        self.assertAlmostEqual(value,BANK[index]['numeric'][key],delta=tol)

    def test_sinusoidal_power_by_time_average(self):
        theta=(np.arange(20000)+.5)*2*np.pi/20000
        product=160*np.cos(theta)*(-33*np.sin(theta-np.pi/6))
        self.check(0,'P',float(product.mean()))
        np.testing.assert_allclose(product,1320+2640*np.cos(2*theta+np.pi/3),atol=1e-9)
        self.check(2,'P',float(((160*np.cos(theta))**2/60).mean()))

    def test_current_source_circuit(self):
        # Nodes x = source/resistor top; y = inductor/capacitor junction.
        Y=np.array([[1/5+1/1j,-1/1j],[-1/1j,1/1j+1/(-4j)]],complex)
        x,y=np.linalg.solve(Y,[2,0])
        theta=(np.arange(10000)+.5)*2*np.pi/10000
        v=np.real(x*np.exp(1j*theta));ir=v/5;isource=2*np.cos(theta)
        self.check(1,'PR',float(np.mean(v*ir)))
        self.check(1,'Psource',float(np.mean(-v*isource)))
        il=(x-y)/1j;ic=y/(-4j)
        self.check(1,'PL',float(np.mean(np.real((x-y)*np.exp(1j*theta))*np.real(il*np.exp(1j*theta)))))
        self.check(1,'PC',float(np.mean(np.real(y*np.exp(1j*theta))*np.real(ic*np.exp(1j*theta)))))

    def test_rlc_circuit_by_nodal_analysis(self):
        # Unknown nodes after 1 ohm and after 2 ohm; source has peak 8∠−40°.
        vs=8*np.exp(-40j*np.pi/180)
        Y=np.array([[1+1/2+1/(6j),-1/2],[-1/2,1/2+1/(-2j)]],complex)
        x,y=np.linalg.solve(Y,[vs,0])
        theta=(np.arange(10000)+.5)*2*np.pi/10000;osc=np.exp(1j*theta)
        i1=np.real((vs-x)*osc);i2=np.real(((x-y)/2)*osc)
        self.check(3,'P1',float(np.mean(i1*i1)))
        self.check(3,'P2',float(np.mean(i2*i2*2)))

    def test_rms_by_sampled_periods(self):
        # Midpoint integration on complete periods, independent of closed forms.
        n=300000;u=(np.arange(n)+.5)/n
        samples=[2-2*np.cos(2*np.pi*u),np.where(u<.5,5.,-5.),
                 np.select([u<1/3,u<2/3],[4.,-4.],default=0.),
                 np.where(u<.5,10.,20.),5*u,np.where(u<.4,20*u,0.)]
        for idx,wave in enumerate(samples,4):
            with self.subTest(book=BANK[idx]['book']):
                ms=float(np.mean(wave**2));self.check(idx,'mean_square',ms)
                self.check(idx,'rms',float(np.sqrt(ms)))
                if idx==9:self.check(idx,'P',ms/2)

    def test_bank_and_images(self):
        self.assertEqual(len(BANK),10)
        self.assertEqual([q['book'] for q in BANK],['11.1','11.2','11.3','11.5','11.22','11.24','11.25','11.26','11.27','11.28'])
        for q in BANK:
            self.assertEqual(len(q['options']),4)
            self.assertEqual(len(set(q['options'])),4)
            self.assertIn(q['answer'],range(4))
            self.assertTrue((PAGE.parent/q['image']).is_file())

if __name__=='__main__':unittest.main()
