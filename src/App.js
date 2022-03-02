import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { nanoid } from 'nanoid';
import Die from './components/Die';

export default function App() {
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);

  function allNewDice() {
    const rolledDice = [];

    for (let i = 0; i < 10; i++) {
      rolledDice.push(newDice());
    }

    return rolledDice;
  }

  function newDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function rollDice() {
    setDice((oldDice) => {
      if (tenzies) {
        setTenzies(false);
        return allNewDice();
      } else {
        return oldDice.map((die) => (!die.isHeld ? newDice() : die));
      }
    });
  }

  function holdDice(id) {
    setDice((oldDice) => {
      return oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      );
    });
  }

  useEffect(() => {
    function checkWon(die) {
      return die.value === dice[0].value && die.isHeld;
    }

    dice.every(checkWon) && setTenzies(true);
  }, [dice]);

  function renderDice() {
    return dice.map((die) => (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={holdDice}
      />
    ));
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <h4>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h4>
      <div className="die-container">{renderDice()}</div>
      <button onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  );
}
