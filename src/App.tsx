import React from 'react';
import logo from './logo.svg';
import './App.scss';
import './components/DiceDisplay.tsx';
import DiceDisplay from './components/DiceDisplay';
import ResultsBox from './components/ResultsBox';
import DiceForm from './components/DiceForm';
import Button from './components/Button';
import RollLog from './components/RollLog';

interface IState {
  rollLog: Array<IRollOutcome>,
  currentRoll: Array<IDiceRoll>,
  rollOutcome: IRollOutcome
};

// The combined results of all dice rolls
// { dice: [{ key: 'green', displayName: 'Green', amount: 3 }], fullRoll: [{ key: 'adv', displayName: 'Advantage', amount: 2 }] }
interface IRollOutcome {
  dice: Array<IDiceRoll>,
  fullRoll: Array<IResult>,
  calcRoll: Array<IResult>,
};

// The dice roll details - { key: 'green', displayName: 'Green', amount: 3 }
interface IDiceRoll {
  key: string,
  displayName: string,
  amount: Number,
};

// The result of a single die roll - { key: 'adv', displayName: 'Advantage', amount: 2 }
interface IResult {
  key: string,
  displayName: string,
  amount: Number,
};

class App extends React.Component<{}, IState> {

  constructor( props: {} ) {
    super( props );

    this.state = {
      rollLog: [],
      currentRoll: [],
      rollOutcome: {
        dice: [],
        fullRoll: [],
        calcRoll: [],
      },
    };
  }

  render(){ 
    return <div className="App">
      <h1>Star Wars: Edge of the Empire Dice Roller</h1>
      <p>A simple, functional dice roller for the Edge of the Empire tabletop</p>

      <ResultsBox />
      <DiceDisplay />
      <DiceForm />
      <Button />
      <Button />
      <RollLog />

    </div>;
  }
}

export default App;
