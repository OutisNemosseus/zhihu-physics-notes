"""Tong Su | ENGR 103 ICA 10-2 | Click-to-play NumPy/Matplotlib tic-tac-toe."""
import matplotlib.pyplot as plt
import numpy as np


def outcome(board):
    """Return 1 for X, -1 for O, 0 for draw, or None for an active game."""
    lines = [*board, *board.T, np.diag(board), np.diag(np.fliplr(board))]
    for line in lines:
        if np.all(line == 1):
            return 1
        if np.all(line == -1):
            return -1
    return 0 if np.all(board != 0) else None


def play():
    """Run a local two-player game: click an empty square to place a mark."""
    board = np.zeros((3, 3), dtype=int)
    turn = [1]  # Mutable so the mouse callback can switch turns.
    fig, ax = plt.subplots(figsize=(5, 5))

    def redraw(message):
        ax.clear()
        ax.set(xlim=(0, 3), ylim=(3, 0), xticks=[], yticks=[], title=message)
        ax.set_aspect("equal")
        for coordinate in (1, 2):
            ax.axvline(coordinate, color="black", linewidth=2)
            ax.axhline(coordinate, color="black", linewidth=2)
        for row in range(3):
            for col in range(3):
                mark = "X" if board[row, col] == 1 else "O" if board[row, col] == -1 else ""
                ax.text(col + 0.5, row + 0.5, mark, ha="center", va="center", fontsize=42)
        fig.canvas.draw_idle()

    def on_click(event):
        if event.inaxes is not ax or event.xdata is None or outcome(board) is not None:
            return
        row, col = int(event.ydata), int(event.xdata)
        if row not in range(3) or col not in range(3) or board[row, col] != 0:
            return
        board[row, col] = turn[0]
        result = outcome(board)
        if result is None:
            turn[0] *= -1
            message = f"{('X' if turn[0] == 1 else 'O')}'s turn"
        elif result == 0:
            message = "Draw"
        else:
            message = f"{('X' if result == 1 else 'O')} wins!"
        redraw(message)

    redraw("X's turn")
    fig.canvas.mpl_connect("button_press_event", on_click)
    plt.show()


if __name__ == "__main__":
    play()
