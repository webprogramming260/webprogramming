import React from 'react';
import ReactDOM from 'react-dom/client';

// --------------------------------------------
// ## Simple React
// Uncomment the following code to see how you can use vanilla JS to implement React state for a single variable.

// let color;
// let colorNext;

// React.useState = (defaultValue) => {
//   color = color || defaultValue;
//   const updateColor = (newColor) => (colorNext = newColor);
//   return [color, updateColor];
// };

// setInterval(() => {
//   if (colorNext && color !== colorNext) {
//     color = colorNext;
//     root.render(App());
//   }
// }, 50);

// --------------------------------------------
// ## Normal React

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

function App() {
  const [color, updateColor] = React.useState('#737AB0');

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
