import React from 'react';
import ReactDOM from 'react-dom/client';

// ## Naive implementation of React state that handles any number of state declarations.

class NaiveReact {
  static stateTable = [];
  static initialRender = true;
  static statePos = 0;
  static dirtyState = false;

  static useState(defaultState) {
    let state;
    if (this.initialRender) {
      state = {
        value: defaultState,
        newValue: defaultState,
        updateValue: (newState) => {
          state.newValue = newState;
          this.dirtyState = true;
        },
      };
      this.stateTable.push(state);
    } else {
      state = this.stateTable[this.statePos++];
    }

    return [state.value, state.updateValue];
  }

  static render(component, root) {
    root.render(component());
    setInterval(() => {
      if (this.dirtyState) {
        this.initialRender = false;
        this.statePos = 0;
        this.updateState();
        root.render(component());
        this.dirtyState = false;
      }
    }, 100);
  }

  static updateState() {
    this.stateTable.forEach((state) => {
      if (state.value !== state.newValue) {
        state.value = state.newValue;
      }
    });
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
NaiveReact.render(App, root);

function App() {
  const [color, updateColor] = NaiveReact.useState('#737AB0');

  return (
    <div>
      <h1>Pick a color</h1>
      <ColorDisplay color={color} />
      <ColorPicker color={color} updateColor={updateColor} />
    </div>
  );
}

function ColorDisplay({ color }) {
  return (
    <div>
      Your color: <span style={{ color: color }}>{color}</span>
    </div>
  );
}

function ColorPicker({ color, updateColor }) {
  function onChange(e) {
    updateColor(e.target.value);
  }

  return (
    <div>
      <span>Pick a color: </span>
      <input type='color' onChange={onChange} value={color} />
    </div>
  );
}
