import React from 'react';

export default function Die(props) {
  return (
    <div
      className={`die ${props.isHeld ? 'held' : 'not-held'}`}
      onClick={() => props.holdDice(props.id)}
    >
      <p>{props.value}</p>
    </div>
  );
}
