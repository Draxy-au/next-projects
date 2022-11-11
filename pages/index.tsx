import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [newGame, setNewGame] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  function handlePlayAgain() {
    setNewGame(true);
  }

  return (
    <div className={styles.tictactoe}>
      <h1>Tic Tac Toe!</h1>
      <Board
        newGame={newGame}
        setNewGame={setNewGame}
        setWinner={setWinner}
        setGameOver={setGameOver}
      />
      {gameOver && (
        <div className={styles.result}>
          <h2>Player {winner} Wins!</h2>
          <button onClick={handlePlayAgain}>Play Again?</button>
        </div>
      )}
    </div>
  );
}

type BoardProps = {
  newGame: boolean;
  setNewGame: (b: boolean) => void;
  setWinner: (s: string) => void;
  setGameOver: (b: boolean) => void;
};

type BoardState = {
  [key: number]: string;
  11: string;
  12: string;
  13: string;
  21: string;
  22: string;
  23: string;
  31: string;
  32: string;
  33: string;
};

function Board({ newGame, setNewGame, setWinner, setGameOver }: BoardProps) {
  const initialBoardState = {
    11: "",
    12: "",
    13: "",
    21: "",
    22: "",
    23: "",
    31: "",
    32: "",
    33: "",
  };

  const [boardState, setBoardState] = useState(initialBoardState);
  const [playerTurn, setPlayerTurn] = useState(1);

  function checkEndGame() {
    if (
      (boardState[11].length > 0 &&
        boardState[11] === boardState[12] &&
        boardState[11] === boardState[13]) ||
      (boardState[21].length > 0 &&
        boardState[21] === boardState[22] &&
        boardState[21] === boardState[23]) ||
      (boardState[31].length > 0 &&
        boardState[31] === boardState[32] &&
        boardState[31] === boardState[33]) ||
      (boardState[11].length > 0 &&
        boardState[11] === boardState[22] &&
        boardState[11] === boardState[33]) ||
      (boardState[13].length > 0 &&
        boardState[13] === boardState[22] &&
        boardState[13] === boardState[31])
    ) {
      setGameOver(true);
      setWinner(playerTurn === 1 ? "O" : "X");
    }
  }

  useEffect(() => {
    checkEndGame();
  }, [boardState]);

  useEffect(() => {
    if (newGame) {
      setBoardState(initialBoardState);
      setPlayerTurn(1);
      setWinner("");
      setNewGame(false);
      setGameOver(false);
    }
  }, [newGame]);

  function handleSquareClick(id: number) {
    const newBoardState: BoardState = { ...boardState };

    newBoardState[id] = playerTurn === 1 ? "X" : "O";
    setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
    setBoardState(newBoardState);
  }

  return (
    <div className={styles.board}>
      <div className={styles.boardRow}>
        <span onClick={() => handleSquareClick(11)}>
          <Square markValue={boardState[11]} />
        </span>
        <span onClick={() => handleSquareClick(12)}>
          <Square markValue={boardState[12]} />
        </span>
        <span onClick={() => handleSquareClick(13)}>
          <Square markValue={boardState[13]} />
        </span>
      </div>
      <div className={styles.boardRow}>
        <span onClick={() => handleSquareClick(21)}>
          <Square markValue={boardState[21]} />
        </span>
        <span onClick={() => handleSquareClick(22)}>
          <Square markValue={boardState[22]} />
        </span>
        <span onClick={() => handleSquareClick(23)}>
          <Square markValue={boardState[23]} />
        </span>
      </div>
      <div className={styles.boardRow}>
        <span onClick={() => handleSquareClick(31)}>
          <Square markValue={boardState[31]} />
        </span>
        <span onClick={() => handleSquareClick(32)}>
          <Square markValue={boardState[32]} />
        </span>
        <span onClick={() => handleSquareClick(33)}>
          <Square markValue={boardState[33]} />
        </span>
      </div>
    </div>
  );
}

type SquareProps = {
  markValue: string;
};

function Square({ markValue }: SquareProps) {
  return <div className={styles.square}>{markValue}</div>;
}
