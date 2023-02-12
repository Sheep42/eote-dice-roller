import React from 'react';
import logo from './logo.svg';
import './App.scss';
import './components/DiceDisplay.tsx';
import DiceDisplay from './components/DiceDisplay';
import ResultsBox from './components/ResultsBox';
import DiceForm from './components/DiceForm';
import Button from './components/Button';
import RollLog from './components/RollLog';

class App extends React.Component<{}, AppState> {

  constructor( props: {} ) {
    super( props );

    let initRoll: Array<DiceRoll> = [];

    for( var prop in diceTypes ) {
      initRoll.push({
        key: diceTypes[prop].key,
        displayName: diceTypes[prop].displayName,
        amount: 0,
      });
    }

    this.diceAmountChange = this.diceAmountChange.bind( this );
    this.rollCurrent = this.rollCurrent.bind( this );
    this.clearCurrentRoll = this.clearCurrentRoll.bind( this );

    this.state = {
      rollLog: [],
      currentRoll: initRoll,
      rollOutcome: {
        dice: [],
        fullRoll: [],
        calcRoll: [],
      },
    };
  }

  diceAmountChange( event: React.ChangeEvent<HTMLInputElement>, key: string ) {
    
    var currentRollClone: Array<DiceRoll> = this.state.currentRoll;
    var dieAmt: Number = 0;
    
    if( event.target.value.trim() !== "" ) {
      dieAmt = parseInt( event.target.value, 10 );
    }

    for( let i = 0; i < currentRollClone.length; i++ ) {
      
      let diceRoll = currentRollClone[i];

      if( key === diceRoll.key ) {
        currentRollClone[i].amount = dieAmt;
      }

    }

    this.setState({
      rollLog: this.state.rollLog,
      currentRoll: currentRollClone,
      rollOutcome: this.state.rollOutcome,
    });

  }

  rollCurrent( event: React.MouseEvent<HTMLElement> ) {
    console.log( 'roll' );
  }

  clearCurrentRoll( event: React.MouseEvent<HTMLElement> ) {

    var currentRollClone: Array<DiceRoll> = this.state.currentRoll;

    for( let i = 0; i < currentRollClone.length; i++ ) {
        currentRollClone[i].amount = 0;
    }

    this.setState({
      currentRoll: currentRollClone,
    });

  }

  render(){ 
    return (
    <div className="App">
      <h1>Star Wars: Edge of the Empire Dice Roller</h1>
      <p>A simple dice roller for the Edge of the Empire tabletop</p>
      <p>Click on the dice you want to roll and type in the amounts, then click the roll button.</p>

      <section className="section-roll">
        <ResultsBox />
        <DiceDisplay 
          numberChangeHandler={ this.diceAmountChange } 
          currentRoll={ this.state.currentRoll } 
        />
        <DiceForm />
      </section>

      <section className="section-btns">
        <Button 
          text="Roll"
          className="btn btn-primary"
          clickHandler={ this.rollCurrent }
        />
        <Button 
          text="Clear"
          className="btn btn-secondary"
          clickHandler={ this.clearCurrentRoll }
        />
      </section>

      <RollLog />
    </div>
    );
  }
}

type AppState = {
  rollLog: Array<IRollOutcome>,
  currentRoll: Array<DiceRoll>,
  rollOutcome: IRollOutcome
};

// The combined results of all dice rolls
// { dice: [{ key: 'green', displayName: 'Green', amount: 3 }], fullRoll: [{ key: 'adv', displayName: 'Advantage', amount: 2 }] }
export interface IRollOutcome {
  dice: Array<DiceRoll>,
  fullRoll: Array<IResult>,
  calcRoll: Array<IResult>,
};

// The dice roll details - { key: 'green', displayName: 'Green', amount: 3 }
export type DiceRoll = {
  key: string,
  displayName: string,
  amount: Number,
};

export type Side = {
  sideNumber: Number,
  symbols: Array<string>,
};

export type DieSymbol = {
  key: string,
  displayName: string,
  glyph: string,
  opposite?: string,
};

export type DieType = {
  key: string,
  displayName: string,
  sides: Array<Side>,
};

// The result of a single die roll - { key: 'adv', displayName: 'Advantage', amount: 2 }
export interface IResult {
  key: string,
  displayName: string,
  amount: Number,
};

export const diceTypes: {[key: string]: DieType} = {
  green: {
    key: 'green',
    displayName: 'Green',
    sides: [],
  },
  yellow: {
    key: 'yellow',
    displayName: 'Yellow',
    sides: [],
  },
  blue: {
    key: 'blue',
    displayName: 'Blue',
    sides: [],
  },
  purple: {
    key: 'purple',
    displayName: 'Purple',
    sides: [],
  },
  red: {
    key: 'red',
    displayName: 'Red',
    sides: [],
  },
  black: {
    key: 'black',
    displayName: 'Black',
    sides: [],
  },
  force: {
    key: 'force',
    displayName: 'Force',
    sides: [],
  },
};

export const diceSymbols: {[key: string]: DieSymbol} = {
  triumph: {
    key: 'triumph',
    displayName: 'Triumph',
    glyph: '',
  },
  success: {
    key: 'success',
    displayName: 'Success',
    glyph: '',
    opposite: 'failure',
  },
  advantage: {
    key: 'advantage',
    displayName: 'Advantage',
    glyph: '',
    opposite: 'threat',
  },
  despair: {
    key: 'despair',
    displayName: 'Despair',
    glyph: '',
  },
  failure: {
    key: 'failure',
    displayName: 'Failure',
    glyph: '',
    opposite: 'success',
  },
  threat: {
    key: 'threat',
    displayName: 'Threat',
    glyph: '',
    opposite: 'advantage',
  },
  blank: {
    key: 'blank',
    displayName: '',
    glyph: '',
  },
};

export const getDiceRollForKey = ( key: string, diceRolls: Array<DiceRoll> ): DiceRoll => {
  return diceRolls.filter( function( diceRoll ) { return diceRoll.key === key; } )[0];
};

export const getAmountForDie = ( key: string, diceRolls: Array<DiceRoll> ) => {
  
  let diceRoll = getDiceRollForKey( key, diceRolls );
  return diceRoll.amount;

};

export default App;