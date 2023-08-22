import { useState } from "react";
import Card from "../Card/Card";
import isWinner from "../../helpers/checkWinner";
import "./Grid.css";
import { FaBorderAll } from "react-icons/fa";
function Grid({ numbersOfCards }) {
  const [borad, setBoard] = useState(Array(numbersOfCards).fill(""));
  const [turn, setTurn] = useState(true);
  const [winner,setWinner] = useState(null);
  //true=> O, fakse => X

  function play(index) {
    if(turn == true){
      borad[index] = 'O';
    }
    else{
      borad[index] = "X";
    }
    const win = isWinner(borad, turn ? "O" : "X");

    if(win){
      setWinner(win);
    }

    setBoard([...borad]);
    setTurn(!turn);
  }

  function reset() {
     setTurn(true);
     setWinner(null)
     setBoard(Array(numbersOfCards).fill(""))
  }

  return (
    <div className="grid-wrapper">
    {

      winner && (
        <>
        <h1 className="turn-highlight"> Winner is {winner} </h1>
        <button className="reset" onClick={reset}> Reset Game</button>
        </>
      )

    }
      <h1 className="turn-highlight">Current turn: {(turn) ? "O" : "X"}</h1>
      <div className="grid">
        {borad.map((el, idx) => (
          <Card gameEnd={winner ? true : false} key={idx} onPlay={play} player={el} index={idx} />
        ))}
      </div>
    </div>
  );
}

export default Grid;
