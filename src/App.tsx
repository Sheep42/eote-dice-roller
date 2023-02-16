import React from 'react';
import logo from './logo.svg';
import './App.scss';
import './components/DiceDisplay.tsx';
import DiceDisplay from './components/DiceDisplay';
import ResultsBox from './components/ResultsBox';
import Button from './components/Button';
import RollLog from './components/RollLog';

class App extends React.Component<{}, AppState> {

  constructor( props: {} ) {
    super( props );

    let initRoll: Array<DiceRoll> = [];
    let log = []; 
    
    let localStorageLog: string|null = localStorage.getItem( 'rollLog' );
    if( localStorageLog !== null ) {
      log = JSON.parse( localStorageLog );
    }

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
    this.clearRollLog = this.clearRollLog.bind( this );

    this.state = {
      rollLog: log,
      currentRoll: initRoll,
      rollOutcome: {
        dice: [],
        fullRoll: [],
        calcRoll: [],
      },
    };
  }

  diceAmountChange( event: React.ChangeEvent<HTMLInputElement>, key: string ) {
    
    var currentRollClone: Array<DiceRoll> = this.state.currentRoll.map((roll => Object.assign({}, roll)));
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
      currentRoll: currentRollClone,
    });

  }

  rollCurrent( event: React.MouseEvent<HTMLElement> ) {

    let fullRoll = [];

    // Roll the dice
    for( let i = 0; i < this.state.currentRoll.length; i++ ) {
      
      if( this.state.currentRoll[i].amount <= 0 ) {
        continue;
      }

      let dieKey = this.state.currentRoll[i].key;
      let die = diceTypes[dieKey];

      for( let j = 0; j < this.state.currentRoll[i].amount; j++ ) {

        let side = Math.floor( Math.random() * die.sides.length );
        let roll = die.sides[side];
        
        for( let k = 0; k < roll.length; k++ ) {
          fullRoll.push( roll[k] );
        }

      }

    }

    // Calculate the roll outcome
    let calcRoll = this.calculateRoll( [...fullRoll] );
    let rollOutcome = {
      dice: this.state.currentRoll.map( roll => Object.assign( {}, roll ) ),
      fullRoll,
      calcRoll,
    };

    this.setState({
      rollOutcome: Object.assign( {}, rollOutcome ),
    })

    this.pushToLog( rollOutcome );

  }

  calculateRoll( fullRoll: Array<DieSymbol> ): Array<DieSymbol> {

    let calcRoll = [];

    for( let i = 0; i < fullRoll.length; i++ ) {

      if( fullRoll[i].key === diceSymbols.blank.key ) {
        continue;
      }

      if( !fullRoll[i].opposite ) {
        calcRoll.push( fullRoll[i] );
        continue;
      }

      let oppositeFound = false;
      for( let j = i; j < fullRoll.length; j++ ) {
        
        if( fullRoll[j].key === fullRoll[i].opposite ) {
          fullRoll.splice( j, 1 );
          oppositeFound = true;
          break;
        }

      }

      if( oppositeFound ) {
        continue;
      }

      calcRoll.push( fullRoll[i] );

    }

    return calcRoll;

  }

  pushToLog( roll: RollOutcome ) {
    
    let log = this.state.rollLog.length >= 50 ? [roll] : [roll, ...this.state.rollLog];

    localStorage.setItem( 'rollLog', JSON.stringify( log ) );

    this.setState({
      rollLog: log,
    });

  }

  clearCurrentRoll( event: React.MouseEvent<HTMLElement> ) {

    var currentRollClone: Array<DiceRoll> = this.state.currentRoll.map( roll => Object.assign( {}, roll ) );

    for( let i = 0; i < currentRollClone.length; i++ ) {
        currentRollClone[i].amount = 0;
    }

    this.setState({
      currentRoll: currentRollClone,
    });

  }

  clearRollLog() {

    let log: RollOutcome[] = [];

    localStorage.setItem( 'rollLog', JSON.stringify( log ) );

    this.setState({
      rollLog: log,
    });

  }

  render(){ 
    return (
    <div className="App">
      <h1>Star Wars: Edge of the Empire Dice Roller</h1>
      <p>A simple dice roller for the Edge of the Empire tabletop</p>
      <p>Click on the dice you want to roll and type in the amounts, then click the roll button.</p>

      <section className="section-roll">
        <ResultsBox 
          fullRoll={ this.state.rollOutcome.fullRoll }
          calcRoll={ this.state.rollOutcome.calcRoll }
        />
        <DiceDisplay 
          numberChangeHandler={ this.diceAmountChange } 
          currentRoll={ this.state.currentRoll } 
        />
      </section>

      <section className="section-btns">
        <Button 
          text="Roll"
          className="btn btn-primary"
          clickHandler={ this.rollCurrent }
        />
        <Button 
          text="Clear Dice"
          className="btn btn-secondary"
          clickHandler={ this.clearCurrentRoll }
        />
        <Button 
          text="Clear Log"
          className="btn btn-secondary"
          clickHandler={ this.clearRollLog }
        />
      </section>

      <h3>Roll Log</h3>
      <section className='section-roll-log'>
        <RollLog rollLog={ this.state.rollLog } />
      </section>
    </div>
    );
  }
}

type AppState = {
  rollLog: Array<RollOutcome>,
  currentRoll: Array<DiceRoll>,
  rollOutcome: RollOutcome
};

// The combined results of all dice rolls
export type RollOutcome = {
  dice: Array<DiceRoll>,
  fullRoll: Array<DieSymbol>,
  calcRoll: Array<DieSymbol>,
};

// The dice roll details - { key: 'green', displayName: 'Green', amount: 3 }
export type DiceRoll = {
  key: string,
  displayName: string,
  amount: Number,
};

export type DieSymbol = {
  key: string,
  displayName?: string,
  glyph?: string,
  opposite?: string,
};

export type DieType = {
  key: string,
  displayName: string,
  sides: Array<Array<DieSymbol>>,
};

export const diceSymbols: {[key: string]: DieSymbol} = {
  triumph: {
    key: 'triumph',
    displayName: 'Triumph',
    glyph: 'e',
  },
  success: {
    key: 'success',
    displayName: 'Success',
    glyph: 'q',
    opposite: 'failure',
  },
  advantage: {
    key: 'advantage',
    displayName: 'Advantage',
    glyph: 'w',
    opposite: 'threat',
  },
  despair: {
    key: 'despair',
    displayName: 'Despair',
    glyph: 'y',
  },
  failure: {
    key: 'failure',
    displayName: 'Failure',
    glyph: 'r',
    opposite: 'success',
  },
  threat: {
    key: 'threat',
    displayName: 'Threat',
    glyph: 't',
    opposite: 'advantage',
  },
  blank: {
    key: 'blank',
  },
  dark: {
    key: 'dark',
    displayName: 'Dark Side',
    glyph: 'i',
  },
  light: {
    key: 'light',
    displayName: 'Light Side',
    glyph: 'u',
  }
};

export const diceTypes: {[key: string]: DieType} = {
  green: {
    key: 'green',
    displayName: 'Green',
    sides: [
      [ diceSymbols.success ],
      [ diceSymbols.advantage ],
      [
        diceSymbols.success,
        diceSymbols.advantage,
      ],
      [
        diceSymbols.success,
        diceSymbols.success,
      ],
      [ diceSymbols.advantage ],
      [ diceSymbols.success ],
      [
        diceSymbols.advantage,
        diceSymbols.advantage,
      ],
      [ diceSymbols.blank ],
    ],
  },
  yellow: {
    key: 'yellow',
    displayName: 'Yellow',
    sides: [
      [
        diceSymbols.advantage,
        diceSymbols.advantage,
      ],
      [ diceSymbols.advantage ],
      [
        diceSymbols.advantage,
        diceSymbols.advantage,
      ],
      [ diceSymbols.triumph ],
      [ diceSymbols.success ],
      [
        diceSymbols.success,
        diceSymbols.advantage,
      ],
      [ diceSymbols.success ],
      [
        diceSymbols.success,
        diceSymbols.advantage,
      ],
      [ 
        diceSymbols.success,
        diceSymbols.success,
      ],
      [
        diceSymbols.success,
        diceSymbols.advantage,
      ],
      [ 
        diceSymbols.success,
        diceSymbols.success,
      ],
      [ diceSymbols.blank ],
    ],
  },
  blue: {
    key: 'blue',
    displayName: 'Blue',
    sides: [
      [
        diceSymbols.success,
        diceSymbols.advantage,
      ],
      [ diceSymbols.advantage ],
      [
        diceSymbols.advantage,
        diceSymbols.advantage,
      ],
      [ diceSymbols.blank ],
      [ diceSymbols.success ],
      [ diceSymbols.blank ],
    ],
  },
  purple: {
    key: 'purple',
    displayName: 'Purple',
    sides: [
      [ diceSymbols.threat ],
      [ diceSymbols.failure ],
      [ 
        diceSymbols.threat, 
        diceSymbols.failure, 
      ],
      [ diceSymbols.threat ],
      [ diceSymbols.blank ],
      [
        diceSymbols.threat,
        diceSymbols.threat,
      ],
      [
        diceSymbols.failure,
        diceSymbols.failure,
      ],
      [ diceSymbols.threat ],
    ],
  },
  red: {
    key: 'red',
    displayName: 'Red',
    sides: [
      [
        diceSymbols.threat,
        diceSymbols.threat,
      ],
      [ diceSymbols.threat ],
      [
        diceSymbols.threat,
        diceSymbols.threat,
      ],
      [ diceSymbols.threat ],
      [
        diceSymbols.threat,
        diceSymbols.failure,
      ],
      [ diceSymbols.failure ],
      [
        diceSymbols.threat,
        diceSymbols.failure,
      ],
      [ diceSymbols.failure ],
      [
        diceSymbols.failure,
        diceSymbols.failure,
      ],
      [ diceSymbols.despair ],
      [
        diceSymbols.failure,
        diceSymbols.failure,
      ],
      [ diceSymbols.blank ],
    ],
  },
  black: {
    key: 'black',
    displayName: 'Black',
    sides: [
      [ diceSymbols.failure ],
      [ diceSymbols.failure ],
      [ diceSymbols.threat ],
      [ diceSymbols.threat ],
      [ diceSymbols.blank ],
      [ diceSymbols.blank ],
    ],
  },
  force: {
    key: 'force',
    displayName: 'Force',
    sides: [
      [ diceSymbols.dark ],
      [
        diceSymbols.light,
        diceSymbols.light,
      ],
      [ diceSymbols.dark ],
      [
        diceSymbols.light,
        diceSymbols.light,
      ],
      [ diceSymbols.dark ],
      [
        diceSymbols.light,
        diceSymbols.light,
      ],
      [ diceSymbols.dark ],
      [ diceSymbols.light ],
      [ diceSymbols.dark ],
      [ diceSymbols.light ],
      [ diceSymbols.dark ],
      [
        diceSymbols.dark,
        diceSymbols.dark,
      ],
    ],
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