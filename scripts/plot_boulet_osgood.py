"""Reproduce the original formula-based figures for twelve Boulet study pages.

Run from any directory with NumPy and Matplotlib. Impulses are area arrows,
never finite-height approximations to a delta distribution.
"""
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/assets/images/boulet'
OUT.mkdir(parents=True, exist_ok=True)
plt.rcParams.update({'font.size': 11, 'axes.titlesize': 12, 'svg.fonttype': 'path'})
BLUE, GREEN, RED = '#2457a7', '#087f6b', '#a53538'

def u(t):
    return np.asarray(t) >= 0

def g(t, a=1):
    return np.exp(-a*np.maximum(np.asarray(t), 0))*u(t)

def q(t):
    return (1-np.exp(-np.maximum(np.asarray(t), 0)))*u(t)

def prepare(axes):
    for ax in np.atleast_1d(axes):
        ax.axhline(0, color='#586575', linewidth=.7)
        ax.grid(alpha=.17)
        ax.set_xlabel('t')
        ax.set_ylabel('amplitude')
        ax.spines[['top', 'right']].set_visible(False)

def save(fig, slug, title):
    fig.suptitle(title, fontsize=14, fontweight='bold')
    fig.tight_layout()
    fig.savefig(OUT/(slug+'.svg'), metadata={'Date': None})
    plt.close(fig)

def triple(slug, t, x, h, y, labels, impulse=None):
    fig, axes = plt.subplots(3, 1, figsize=(9, 7.1), sharex=True)
    for ax, values, label, color in zip(axes, [x, h, y], labels, [BLUE, GREEN, RED]):
        ax.plot(t, values, color=color, linewidth=2)
        ax.set_title(label, loc='left')
        ax.set_xlim(t[0], t[-1])
    if impulse:
        at, area = impulse
        axes[0].annotate('', (at, 1.45), (at, 0),
                         arrowprops={'arrowstyle': '-|>', 'color': BLUE, 'lw': 2})
        axes[0].text(at+.12, 1.25, f'impulse area = {area:g}', fontsize=10)
        axes[0].set_ylim(-.1, 1.65)
    prepare(axes)
    save(fig, slug, 'Boulet '+slug.replace('-', '.')+' — formula-based redraw')

t=np.linspace(-2, 10, 2401)
triple('2-2', t, u(t).astype(float)-u(t-3), g(t-1), q(t-1)-q(t-4),
       ['Input: x(t) = u(t) - u(t-3)', 'Impulse response: h(t) = g(t-1)',
        'Output: y(t) = q(t-1) - q(t-4)'])
triple('2-6', t, -u(t).astype(float)+u(t-4), g(t+1), -q(t+1)+q(t-3),
       ['Input: x(t) = -u(t) + u(t-4)', 'Impulse response: h(t) = g(t+1)',
        'Output: y(t) = -q(t+1) + q(t-3)'])
triple('2-8', t, u(t+1).astype(float)-u(t-1), g(t-1), q(t)-q(t-2),
       ['Input: x(t) = u(t+1) - u(t-1)', 'Impulse response: h(t) = g(t-1)',
        'Output: y(t) = q(t) - q(t-2)'])

def h10(t): return g(t)-g(t, 2)
def sh(t): return .5*q(t)**2
triple('2-10', t, u(t).astype(float)-u(t-2), h10(t), sh(t)-sh(t-2)+h10(t+1),
       ['Input: width-2 rectangle + unit-area impulse at t = -1',
        'Overall impulse response: h(t) = (exp(-t) - exp(-2t)) u(t)',
        'Output: y(t) = s(t) - s(t-2) + h(t+1)'], impulse=(-1, 1))

def single(slug, t, values, title, impulse=None):
    fig, ax = plt.subplots(figsize=(9, 3.8))
    ax.plot(t, values, color=BLUE, linewidth=2, label='ordinary-function part')
    ax.set_xlim(t[0], t[-1])
    if impulse is not None:
        height = 1 if slug=='3-1' else .8
        ax.annotate('', (0, height), (0, 0),
                    arrowprops={'arrowstyle': '-|>', 'color': RED, 'lw': 2})
        ax.text(.12, height*.8, f'impulse area = {impulse:g}', color=RED, fontsize=10)
        ax.set_ylim(min(values)-.4, height+.4)
    prepare(ax)
    save(fig, slug, title)

t=np.linspace(-1, 6, 2001)
single('3-1', t, -4*g(t, 2), 'Boulet 3.1, a = 2: delta(t) - 4 exp(-2t) u(t)', 1)
single('3-2', t, g(t, 2)-g(t, 3), 'Boulet 3.2: (exp(-2t) - exp(-3t)) u(t)')
single('3-10', t, -2*g(t, 2), 'Boulet 3.10: (3/2) delta(t) - 2 exp(-2t) u(t)', 1.5)
t=np.linspace(-1, 9, 2501)
single('3-12', t, g(t)*(4*np.sin(t)-3*np.cos(t)),
       'Boulet 3.12: exp(-t) (4 sin(t) - 3 cos(t)) u(t)')

fig, axes=plt.subplots(2, 1, figsize=(9, 6))
t=np.linspace(-1, 3, 1001)
axes[0].plot(t, .5*g(t, 3), color=BLUE, linewidth=2)
axes[0].set_title('Zero-state impulse response: h(t) = (1/2) exp(-3t) u(t)', loc='left')
t=np.linspace(0, 2, 1001)
axes[1].plot(t, np.exp(4*t), color=RED, linewidth=2)
axes[1].set_title('A different object: natural response exp(4t) from nonzero initial state', loc='left')
prepare(axes)
save(fig, '3-6', 'Boulet 3.6 — input-output stability and natural modes')
print('Wrote 9 SVG figures to', OUT)
