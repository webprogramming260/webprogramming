# Simon WebSocket

🎥 **Instruction video**: [Simon WebSocket](https://youtu.be/oVO2VIG0zfI)

![Simon](../simon.png)

This deliverable demonstrates peer-to-peer communication using WebSocket. The functionality that Simon provides for peer communication is intentionally limited to display notifications between users. This was done so that the application would clearly demonstrate how WebSocket works rather than clutter the application with functionality that uses WebSockets.

You can view this application running here: [Example Simon WebSocket](https://simon-websocket.cs260.click)

## Handling WebSocket requests

After installing the `ws` NPM package the next step is to attach a WebSocket listener to the HTTP server that was created in an earlier deliverable. This work is all done in the PeerProxy class implemented in the `peerProxy.js` file. The PeerProxy class contains the protocol upgrade from HTTP to WebSocket, tracks new WebSocket connections, passes (or proxies) requests between connections, and implements ping/pong to keep connections alive.

## Displaying and generating WebSocket messages

The `src/play/gameNotifier.js` file contains the functions for connecting, broadcasting, receiving, and displaying events using WebSocket.

![Simon WebSocket](simonWebSocket.jpg)

Leveraging the concepts demonstrated in this deliverable, you can implement additional functionality that uses peer-to-peer interactions. For example, you could make it so each connected peer has to complete one of the Simon patterns in turn.

## Configuring Vite to proxy ws requests

In order to debug WebSocket messages in your development environment using Vite you need to instruct Vite to proxy WebSocket requests to your service. This is similar to what you already do to proxy endpoint requests.

This is done by modifying `vite.config.js` and adding the path for `/ws`. You will need to make a similar change for your startup application in order to proxy the WebSocket messages to your service.

```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
});
```

Note that this is only used for debugging in your development environment. It is completely ignored in your production deployment.

## Study this code

Get familiar with what this code teaches.

- Clone the repository to your development environment.
  ```sh
  git clone https://github.com/webprogramming260/simon-websocket.git
  ```
- Set up your Atlas credentials in a file named `dbConfig.json` that is in the same directory as `database.js`.
- Add `dbConfig.json` to your `.gitignore` file so that it doesn't put your credentials into GitHub accidentally.
- Review the code and get comfortable with everything it represents.
- Debug the code in your browser by hosting it from a VS Code debug session. This [video on debugging a node.js based service](https://youtu.be/B0le_Z_2TQY) will step you through the process.
- Use the browser's dev tools to set breakpoints in the code and step through it each line.
- Make modifications to the code as desired. Experiment and see what happens.

## Deploy to production

- Deploy to your production environment using the `deployService.sh` script found in the [example class application](https://github.com/webprogramming260/simon-websocket/blob/main/deployService.sh). Take some time to understand how it works.

  ```sh
  ./deployService.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```

- Update your `startup` repository notes.md with what you learned.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
