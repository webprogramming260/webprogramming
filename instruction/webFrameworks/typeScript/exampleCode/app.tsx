import React, { JSX } from 'react';
import ReactDOM from 'react-dom/client';

interface Props {
  greeting: string;
  count?: number;
}

function App({ greeting, count = 3 }: Props): JSX.Element {
  return (
    <div>
      {Array.from({ length: count }).map((_, index: number) => (
        <h1 key={index}>{greeting}, World!</h1>
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App greeting='hello' />);
