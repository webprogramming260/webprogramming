# Startup React Phase 2: Reactivity

![Overview](../../technologies.png)

## Prerequisites

Before you start work on this deliverable make sure you have read all of the proceeding instruction topics and have completed all of the dependant exercises (topics marked with a ☑). This includes:

- [JavaScript Console](../../javascript/console/console.md)
- [Types, operators, conditionals, and loops](../../javascript/typeConstruct/typeConstruct.md)
- [String](../../javascript/string/string.md)
- [Functions](../../javascript/functions/functions.md)
- [Arrow functions](../../javascript/arrow/arrow.md)
- ☑ [Arrays](../../javascript/array/array.md)
- [Objects and classes](../../javascript/objectClasses/objectClasses.md)
- [JSON](../../javascript/json/json.md)
- [LocalStorage](../../javascript/localStorage/localStorage.md)
- ☑ [Promises](../../javascript/promises/promises.md)
- ☑ [Async/await](../../javascript/asyncAwait/asyncAwait.md)
- [Destructuring](../../javascript/destructuring/destructuring.md)
- [Debugging JavaScript](../../javascript/debuggingJavascript/debuggingJavascript.md)
- ☑ [Reactivity](../react/reactivity/reactivity.md)
- [Hooks](../react/hooks/hooks.md)
- [Simon React P2: Reactivity](../../simon/simonReact/simonReactP2.md)
- [🎥 Reactivity tutorial video](https://youtu.be/xmH_DJF7kOQ)

Failing to do this will likely slow you down as you will not have the required knowledge to complete the deliverable.

## Getting started

With your startup ported to React it is time to implement all of the reactivity necessary to make your application functional. This includes writing significant JavaScript such that a user can fully interact with the application.

Making your application interactive will require significant modifications to your frontend code. Make sure you reserve enough time to successfully complete this work.

## Mocking out functionality

Upon completion of this deliverable your startup must be fully functional. For parts of your application that require third party services, backend service support, or database persistence, you will need to stub, or mock, out those pieces in your JavaScript. Here are some examples of how you can stub out functionality.

1. **Local storage**: If you need to store credentials or game state you can use the browser's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) until you have a database where you can store such information. Note that this data will only be available on the browser where the data was created.
   ```js
   // This will be replaced with data service calls
   localStorage.setItem('userName', 'Tom');
   const userName = localStorage.getItem('userName');
   ```
1. **Hard coded responses**: If you need an endpoint that provides external data such as a weather report or an LLM response you can simply hard code a single response that looks exactly like what a future endpoint will return.
   ```js
   function getWeather() {
     // This will be replaced with a 3rd party service call
     return { date: '2026-05-20', outlook: 'fair' };
   }
   const weather = getWeather();
   ```
1. **setInterval**: If you need data that would have be pushed from a server over a WebSocket for functionality such as a stock price update or a peer chat message, you can use the [setInterval](../../javascript/timeoutAndInterval/timeoutAndInterval.md) function.
   ```js
   setInterval(() => {
     // This will be replaced with WebSocket messages
     const userName = `User-${Math.floor(Math.random() * 100)}`;
     displayPeerMessage({ msg: 'Hello', from: userName });
   }, 1000);
   ```

## Getting started

You must use the same startup GitHub repository that you created in the earlier instruction. Update the `notes.md` file with things that you learn as you work on your startup. As you make changes to your application, commit those changes and push them to GitHub. Make sure you have enough commits that you can demonstrate your ownership of the code and protect yourself from loss. Usually this will mean at least ten commits, but in reality you may have many more than that. Failing to fully document your work may result in the rejection of your submission.

Remember to use the the browser's debugger window to debug your CSS and JavaScript. You can also debug your service JavaScript running on Node.js using the built in VS Code Node.js debugger.

Once you have developed your application to where you want it, you need to release it to your production environment. Use the same `deployReact.sh` script that you used in the previous React deliverable. Make sure to use `startup` for the service parameter (`-s`).

```sh
./deployReact.sh -k <yourpemkey> -h <yourdomain> -s startup
```

For example,

```sh
./deployReact.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

Doing this will make this deliverable of your startup available from `https://startup.yourdomainname`.

## 🚀 Deliverable

1. Review and deploy Simon React
   1. Clone the Simon React repository to your development environment.
   1. Execute your frontend code in your development environment by running `npm run dev` from the console in the root of the project. This will automatically open your browser to https://localhost:5173. Use the browser's dev tools to step through the frontend JavaScript using the Source tab.
   1. Deploy to your production environment using the deployment script so that it is available with your domain's `simon` subdomain.
1. Implement the JavaScript code using the React framework to make your startup completely functional.
   1. Use React `useState` and component properties for the reactive parts of each component.
   1. Add React `useEffect` for component lifecycle events.
   1. Add JavaScript to control what gets rendered based upon the current state of the component.
   1. Mock out a working solution for any functionality that will be implemented in a later deliverable. For example, use [setInterval](../../javascript/timeoutAndInterval/timeoutAndInterval.md) to simulate WebSocket message, or use [LocalStorage](../../javascript/localStorage/localStorage.md) for persisting user data.
1. Make sure your name is displayed in the application and that there is a link to your GitHub repository.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's `notes.md` file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.

## Grading Rubric

- **Prerequisite**: Simon React deployed to your production environment
- **Prerequisite**: A link to your GitHub startup repository prominently displayed on your application's home page
- **Prerequisite**: Notes in your startup Git repository `README.md` file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- **Prerequisite**: Enough Git commits to fully prove your ownership of your code. This usually means dozens of commits spread across multiple days of the deliverable development period. Failure to do this may result in the rejection of your submission.
- Application converted to use React
  - 70% Multiple react components that **implement or mock all app functionality**
  - 30% React `useState` and `useEffect` hooks

## Go celebrate

With the addition of reactivity to your startup it should be basically functional. Anything that remains should be stubbed out in some way that makes the application usable. Time to celebrate. I'm thinking tacos. 🌮
