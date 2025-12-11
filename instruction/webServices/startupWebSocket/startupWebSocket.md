# Startup WebSocket

![Overview](../../technologies.png)

## Prerequisites

Before you start work on this deliverable make sure you have read all of the proceeding instruction topics and have completed all of the dependant exercises (topics marked with a ☑). This includes:

- [WebSocket](../webSocket/webSocket/webSocket.md)
- [Debugging WebSocket](../webSocket/debugging/debugging.md)
- [WebSocket chat](../webSocket/chat/chat.md)
- [Simon WebSocket](../../simon/simonWebSocket/simonWebSocket.md)

Failing to do this will likely slow you down as you will not have the required knowledge to complete the deliverable.

## Getting started

Now that you have learned how to use WebSocket network connections, it is time to add it to your startup application. The main things you should focus on in this deliverable include listening for a connection on your backend, making a connection from your frontend, sending messages between the two, and displaying the result in your application.

You must use the same startup GitHub repository that you created in the earlier instruction. Update the notes.md file with things that you learn as you work on your startup. As you make changes to your HTML, CSS, and JavaScript commit those changes and push them to GitHub. Make sure you have enough commits that you can demonstrate your ownership of the code and protect yourself from loss. Usually this will mean at least ten commits, but in reality you may have many more than that. Failing to fully document your work may result in the rejection of your submission.

Remember to use the browser's debugger window to debug your frontend HTML, CSS and JavaScript. You can also debug your backend service JavaScript running on Node.js using the built in VS Code Node.js debugger.

Once you have developed your application to where you want it, you need to release it to your production environment. Usethe `deployService.sh` script from the [Simon WebSocket repository](https://github.com/webprogramming260/simon-websocket/blob/main/deployService.sh) and use `startup` for the service parameter (`-s`).

```sh
./deployService.sh -k <yourpemkey> -h <yourdomain> -s startup
```

For example,

```sh
./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

Doing this will make this deliverable of your startup available from `https://startup.yourdomainname`.

## 🚀 Deliverable

1. Review and deploy Simon WebSocket
   1. Clone the Simon WebSocket repository to your development environment.
   1. Run `npm install` in root of the project.
   1. Open the project in VS Code and examine the application's use of JavaScript to support WebSocket communication.
   1. Create and configure the `dbConfig.json` file with your MongoDB credentials.
   1. Execute in your development environment by debugging the application using VS Code's Node.js debugger (press F5 while viewing index.js). Set breakpoints in VS Code and step through the backend JavaScript related to WebSocket communication.
   1. Open your browser to https://localhost:3000 and use the browser's dev tools to step through the frontend JavaScript using the Source tab.
   1. Deploy to your production environment using the deployment script so that it is available with your domain's `simon` subdomain.
1. Listen for WebSocket requests on your backend.
1. Connect the WebSocket from your frontend.
1. Send messages over your WebSocket connection.
1. Connect your WebSocket functionality to your application interface.
1. Configure the `vite.config.js` file to proxy WebSocket requests during debugging.
1. Make sure your name is displayed in the application and that there is a link to your GitHub repository.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.

## Grading Rubric

- **Prerequisite**: Simon WebSocket deployed to your production environment
- **Prerequisite**: A link to your GitHub startup repository prominently displayed on your application's home page
- **Prerequisite**: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- **Prerequisite**: Enough Git commits to fully prove your ownership of your code. This usually means dozens of commits spread across multiple days of the deliverable development period. Failure to do this may result in the rejection of your submission.
- WebSocket support for data pushed from the backend
  - 20% - Backend listens for WebSocket connection
  - 20% - Frontend makes WebSocket connection
  - 20% - Data sent over WebSocket connection
  - 20% - WebSocket data displayed in the application interface
  - 20% - The application is fully functional. There are no mocks or placeholder features.

## Go celebrate

You did it! This is a significant milestone. You have completely implemented your startup! You are now an official Startup Founder. Time to grab some friends and throw a **Going Live** party. Show them what you have accomplished, and celebrate with sushi for everyone 🍣.
