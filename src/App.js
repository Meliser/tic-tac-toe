import React from "react";
import "./App.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    if (step === 0) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0,
        history: [
          {
            squares: Array(9).fill(null)
          }
        ]
      });
    }
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  resetGameButton() {
    if (this.state.history.length > 1) {
      return (
        <button className="btn btn-danger" onClick={() => this.jumpTo(0)}>
          Начать сначала
        </button>
      );
    } else {
      return null;
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.slice(1, -1).map((step, move) => {
      const desc = "Ход #" + (move + 1);
      return (
        <p key={move}>
          <button
            className="btn btn-secondary"
            onClick={() => this.jumpTo(move + 1)}
          >
            {desc}
          </button>
        </p>
      );
    });

    let status;
    if (winner) {
      status = "Выиграл: " + winner;
    } else {
      status = "Следующий ход: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <h5>{status}</h5>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          {this.resetGameButton()}
          {history.length > 2 && (
            <div className="history">
              <h5>Перейти к определенному ходу:</h5>
              <div>{moves}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
