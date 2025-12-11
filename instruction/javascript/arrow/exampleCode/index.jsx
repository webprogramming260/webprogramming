import React from 'react';
import ReactDOM from 'react-dom/client';

// function App() {
//   const [count, setCount] = React.useState(0);

//   function Increment() {
//     setCount(count + 1);
//   }

//   function Decrement() {
//     setCount(count - 1);
//   }

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={Increment}>n++</button>
//       <button onClick={Decrement}>n--</button>
//     </div>
//   );
// }

// function App() {
//   const [count, setCount] = React.useState(0);

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={() => setCount(count + 1)}>n++</button>
//       <button onClick={() => setCount(count - 1)}>n--</button>
//     </div>
//   );
// }

// function App() {
//   const [count, setCount] = React.useState(0);

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={() => setCount((prevCount) => prevCount + 1)}>
//         n++
//       </button>
//       <button onClick={() => setCount((prevCount) => prevCount - 1)}>
//         n--
//       </button>
//     </div>
//   );
// }

function App() {
  const [count, setCount] = React.useState(0);

  function counterOpFactory(op) {
    return () => setCount((prevCount) => op(prevCount));
  }
  const incOp = counterOpFactory((c) => c + 1);
  const decOp = counterOpFactory((c) => c - 1);
  const tenXOp = counterOpFactory((c) => c * 10);
  const zeroOp = counterOpFactory((c) => 0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={incOp}>n++</button>
      <button onClick={decOp}>n--</button>
      <button onClick={tenXOp}>n*10</button>
      <button onClick={zeroOp}>0</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
