# React hooks

📖 **Recommended reading**: [Reactjs.org - Hooks Overview](https://reactjs.org/docs/hooks-overview.html)

React hooks allow React function style components to be able to do everything that a class style component can do and more. Additionally, as new features are added to React they are including them as hooks. This makes function style components the preferred way of doing things in React. You have already seen one use of hooks to declare and update state in a function component with the `useState` hook.

```jsx
function Clicker({ initialCount }) {
  const [count, updateCount] = React.useState(initialCount);
  return <div onClick={() => updateCount(count + 1)}>Click count: {count}</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker initialCount={3} />);
```

## useEffect hook

The `useEffect` hook allows you to represent lifecycle events. For example, if you want to run a function every time the component completes rendering, you could do the following.

```jsx
function UseEffectHookDemo() {
  React.useEffect(() => {
    console.log('rendered');
  });

  return <div>useEffectExample</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UseEffectHookDemo />);
```

## UseEffect dependencies

By default, the **useEffect** callback is called every time the component is rendered. You can control what triggers a **useEffect** hook by specifying its dependencies. In the following example we have two state variables, but we only want the **useEffect** hook to be called when the component is initially called and when the first variable is clicked. To accomplish this you pass an array of dependencies as a second parameter to the **useEffect** call.

```jsx
function UseEffectHookDemo() {
  const [count1, updateCount1] = React.useState(0);
  const [count2, updateCount2] = React.useState(0);

  React.useEffect(() => {
    console.log(`count1 effect triggered ${count1}`);
  }, [count1]);

  return (
    <ol>
      <li onClick={() => updateCount1(count1 + 1)}>Item 1 - {count1}</li>
      <li onClick={() => updateCount2(count2 + 1)}>Item 2 - {count2}</li>
    </ol>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UseEffectHookDemo />);
```

If you specify an empty array `[]` as the hook dependency then it is only called when the component is first rendered.

> [!NOTE]
>
> Hooks must be called at the top scope of the function and cannot be called inside of a loop or conditional. This restriction ensures that hooks are always called in the same order when a component is rendered.

## useEffect clean up

You can also take action when the component cleans up by returning a cleanup function when you call `useEffect`. Consider the example where a component creates a database connection. The database connection is a resource that needs to be released when the component is destroyed. In the example, the function returned from **useEffect** when get called when the component gets destroyed. This is triggered after a user clicks five times on the clicker component.

```jsx
function Clicker() {
  const [count, update] = React.useState(5);

  return (
    <div onClick={() => update(count - 1)}>
      Click count: {count}
      {count > 0 ? <Db /> : <div>DB Connection Closed</div>}
    </div>
  );
}

function Db() {
  React.useEffect(() => {
    console.log('connected');

    return function cleanup() {
      console.log('disconnected');
    };
  }, []);

  return <div>DB Connection</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```
