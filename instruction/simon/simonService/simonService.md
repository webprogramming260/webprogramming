# Simon Service

![Simon](../simon.png)

This deliverable demonstrates adding a backend web service that serves up the frontend application code, handles HTTP endpoint requests, authenticates users, and stores information in memory on the server. The web service provides endpoints for getting and updating the scores. The application also uses a couple third party endpoints to display inspirational quotes on the about page and show a random header image.

We will use Node.js and Express to create our HTTP service.

You can view this application running here: [Example Simon Service](https://simon-service.cs260.click)

![Simon Service](simonService.jpg)

## Service endpoint definitions

Here is our design, documented using `curl` commands, for the endpoints that the Simon web service provides. Note that the auth endpoints are using authorization tokens contained in HTTP cookies.

**CreateAuth** - Create a new user.

```sh
curl -X POST $host/api/auth/create -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}' -c cookies.txt -b cookies.txt

# Response 200
{"email":"s@byu.edu"}
```

**GetAuth** - Login an existing user.

```sh
curl -X POST $host/api/auth/login -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}' -c cookies.txt -b cookies.txt

# Response 200
{"email":"s@byu.edu"}
```

**DeleteAuth** - Logout a user

```sh
curl -v -X DELETE $host/api/auth/logout -c cookies.txt -b cookies.txt

# Response 204
```

**GetScores** - Get the latest high scores.

```sh
curl $host/api/scores -c cookies.txt -b cookies.txt

# Response
{ "scores":[
  {"name":"Harvey", "score":"337", "date":"2022/11/20"},
  {"name":"도윤 이", "score":"95", "date":"2019/05/20"}
]}
```

**SubmitScore** - Submit a score for consideration in the list of high scores.

```sh
curl -X POST $host/api/score  -H 'Content-Type: application/json' -d '{"name":"Harvey", "score":"337", "date":"2022/11/20"}' -c cookies.txt -b cookies.txt

# Response
[
  {"name":"Harvey", "score":"337", "date":"2022/11/20"},
  {"name":"도윤 이", "score":"95", "date":"2019/05/20"}
]
```

## Backend changes

We create our service with a new directory in the root of the project named `service`. To initialize the service code we open up a command console window and setup the NPM project and install **Express**.

```sh
mkdir service && cd service
npm init -y
npm install express
```

In the `service` directory, we create a file named `index.js`. `index.js` is the file we will use with **node.js** to start up our web service. In index.js we create a very basic simple service by adding very basic Express JavaScript code. The code parses the arguments that are passed to node.js on startup to determine what HTTP port to use. If no port is specified then 3000 is used. We then include a temporary endpoint that accepts all HTTP GET requests by specifying `*` as the path. Later, we will replace this endpoint later with the ones we defined above.

```js
const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.get('*', (_req, res) => {
  res.send({ msg: 'Simon service' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

Now we can run the application with `node index.js` and hit the service with Curl.

```sh
node index.js &
curl localhost:3000

{"msg":"Simon service"}

# use fg to foreground and kill the process
```

### Add the endpoints

Now that we have the service up and running, we want to replace the simple `*` endpoint with the ones needed for the Simon backend service endpoints. To fully implement the service we do the following:

1. **Install required packages**. The service supports authentication tracking with cookies, representing its tokens with a universally unique ID (UUID), and cryptographically hashing password with bcrypt and so we need to install and import those NPM packages.

```sh
npm install cookie-parser bcryptjs uuid
```

```js
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
```

1. **Parse JSON**. All of our endpoints use JSON and so we want Express to automatically parse that for us.

   ```js
   app.use(express.json());
   ```

1. **Create the memory data structures**. Add data structures for both the users and the scores. That means whenever the service is restarted the users and scores will be lost. When we introduce the database in a later deliverable, the data will be persistent there.

   ```js
   let users = [];
   let scores = [];
   ```

1. **Set up a router path for the endpoints**. We want all of our endpoints to have a path prefix of `/api` so that we can distinguish them from requests to load the frontend files. This is done with a `express.Router` call.

   ```js
   let apiRouter = express.Router();
   app.use(`/api`, apiRouter);
   ```

1. **Delete the placeholder endpoint**. Delete the placeholder endpoint `app.get('*' ...` that we created to demonstrate that the service was working.

1. **Add the service endpoints**. Add all of the code for the different Simon endpoints. This includes the authentication and score endpoints. This code uses some helper functions for dealing with cookies and creating and finding users. If you don't understand what this code is doing then go back and review the [login](../../webServices/login/login.md) and [Express](../../webServices/express/express.md) topics.

   ```js
   // CreateAuth a new user
   apiRouter.post('/auth/create', async (req, res) => {
     if (await findUser('email', req.body.email)) {
       res.status(409).send({ msg: 'Existing user' });
     } else {
       const user = await createUser(req.body.email, req.body.password);

       setAuthCookie(res, user.token);
       res.send({ email: user.email });
     }
   });

   // GetAuth login an existing user
   apiRouter.post('/auth/login', async (req, res) => {
     const user = await findUser('email', req.body.email);
     if (user) {
       if (await bcrypt.compare(req.body.password, user.password)) {
         user.token = uuid.v4();
         setAuthCookie(res, user.token);
         res.send({ email: user.email });
         return;
       }
     }
     res.status(401).send({ msg: 'Unauthorized' });
   });

   // DeleteAuth logout a user
   apiRouter.delete('/auth/logout', async (req, res) => {
     const user = await findUser('token', req.cookies[authCookieName]);
     if (user) {
       delete user.token;
     }
     res.clearCookie(authCookieName);
     res.status(204).end();
   });

   // Middleware to verify that the user is authorized to call an endpoint
   const verifyAuth = async (req, res, next) => {
     const user = await findUser('token', req.cookies[authCookieName]);
     if (user) {
       next();
     } else {
       res.status(401).send({ msg: 'Unauthorized' });
     }
   };

   // GetScores
   apiRouter.get('/scores', verifyAuth, (_req, res) => {
     res.send(scores);
   });

   // SubmitScore
   apiRouter.post('/score', verifyAuth, (req, res) => {
     scores = updateScores(req.body);
     res.send(scores);
   });

   // Default error handler
   app.use(function (err, req, res, next) {
     res.status(500).send({ type: err.name, message: err.message });
   });

   // Return the application's default page if the path is unknown
   app.use((_req, res) => {
     res.sendFile('index.html', { root: 'public' });
   });
   ```

1. **Add the score and user helper functions**. The final part of the service code consists of some simple helper functions that will create and update users, as well as update the scores. When we move to the database implementation of the service these functions will be changed so that they store data in the database instead of in memory.

   ```js
   // updateScores considers a new score for inclusion in the high scores.
   function updateScores(newScore) {
     let found = false;
     for (const [i, prevScore] of scores.entries()) {
       if (newScore.score > prevScore.score) {
         scores.splice(i, 0, newScore);
         found = true;
         break;
       }
     }

     if (!found) {
       scores.push(newScore);
     }

     if (scores.length > 10) {
       scores.length = 10;
     }

     return scores;
   }

   async function createUser(email, password) {
     const passwordHash = await bcrypt.hash(password, 10);

     const user = {
       email: email,
       password: passwordHash,
       token: uuid.v4(),
     };
     users.push(user);

     return user;
   }

   async function findUser(field, value) {
     if (!value) return null;

     return users.find((u) => u[field] === value);
   }

   // setAuthCookie in the HTTP response
   function setAuthCookie(res, authToken) {
     res.cookie(authCookieName, authToken, {
       secure: true,
       httpOnly: true,
       sameSite: 'strict',
     });
   }
   ```

### Secure endpoints

With the addition of authentication functionality we can restrict the access to endpoints using a simple Express middleware technique. The following code creates a middleware function named `verifyAuth` that gets the requesting user's authentication cookie. If there is a user that matches the cookie then it allows the HTTP request to continue to the next middleware handler. Otherwise it will fail the request with a 401 (unauthorized) HTTP status code.

```js
// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};
```

We then use the middleware `verifyAuth` function as a parameter in any endpoint that we want to secure. By placing it as the first middleware callback, it stops the endpoint from being called if the user is not authenticated.

```js
// GetScores
apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.send(scores);
});
```

### Testing the service

Now we can start the service up by pressing `F5` inside of VS code and then open a command console window to execute some Curl commands.

```sh
host=http://localhost:3000

curl -X POST $host/api/auth/create -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}' -c cookies.txt -b cookies.txt

curl -X POST $host/api/score  -H 'Content-Type: application/json' -d '{"name":"Harvey", "score":"337", "date":"2022/11/20"}' -c cookies.txt -b cookies.txt

curl $host/api/scores -c cookies.txt -b cookies.txt
```

### Serving the frontend static file

In addition to serving up endpoints, we also use the Simon service to serve the static files generated when we bundled the React frontend. Our endpoints will be services on the `/api` path and everything else will look in the `public` directory of the service. If it finds a match, for `index.html` for example, then that file is returned.

![Simon service](simonProduction.jpg)

To make this happen, we only need to add the Express middleware to serve static files from the the `public` directory.

```js
app.use(express.static('public'));
```

However, we don't have a `public` directory with the frontend files in it. This will happen when we deploy to our web server in AWS. For now, you can test that it is working by creating a simple index.html file in the `service/public` directory and then requesting it with curl. Once you have done this delete the test `service/public` directory so that we don't leave any cruft around.

## Frontend changes

Now that we have the service endpoints all set up we need to call them from the frontend code. This happens when we want to save and retrieve scores, as well as when we want to register or login a user.

### Saving scores

The `play/simonGame.jsx` file is modified to store scores by making a fetch request to the Simon service.

```jsx
async function saveScore(score) {
  const date = new Date().toLocaleDateString();
  const newScore = { name: userName, score: score, date: date };

  await fetch('/api/score', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newScore),
  });

  // Let other players know the game has concluded
  GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);
}
```

The scores are loaded in `scores/scores.jsx` where we use a React useEffect hook to reactively display the scores once they are loaded from the service.

```jsx
React.useEffect(() => {
  fetch('/api/scores')
    .then((response) => response.json())
    .then((scores) => {
      setScores(scores);
    });
}, []);
```

Now you can shutdown the frontend and restart it without losing your scoring data.

### Registering and logging in users

We follow a similar process for handling users. This is done by altering `login/unauthenticated.jsx` to contain code that handles register and login requests.

```jsx
async function loginOrCreate(endpoint) {
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  } else {
    const body = await response.json();
    setDisplayError(`⚠ Error: ${body.msg}`);
  }
}
```

Likewise, `login/authenticated.jsx` is altered to handle the logout event.

```jsx
function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  })
    .catch(() => {
      // Logout failed. Assuming offline
    })
    .finally(() => {
      localStorage.removeItem('userName');
      props.onLogout();
    });
}
```

### Remove localstorage usage

Since we now persist scores in the service we no longer need to persistent them in local storage. We can remove that code from both `simonGame.jsx` and `scores.jsx`.

### Configuring Vite for debugging

When running in production, the Simon web service running under Node.js on port 3000 serves up the bundled Simon React application code when the browser requests `index.html`. The service pulls those files from the application's static HTML, CSS, and JavaScript files located in the `public` directory as described above.

However, when the application is running in debug mode in your development environment, we actually need two HTTP servers running: one for the Node.js backend HTTP server, and one for the Vite frontend HTTP server. This allows us to develop and debug both our backend and our frontend while viewing the results in the browser.

By default, Vite uses port 5173 when running in development mode. Vite starts up the debugging HTTP server when we run `npm run dev`. That means the browser is going to send network requests to port 5173. We can configure the Vite HTTP server to proxy service HTTP to the Node.js HTTP server by creating a configuration file named `vite.config.js` in the root of the project with the following contents (later, we will modify this file to allow proxying of WebSocket requests as well).

```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
```

When running in this configuration, the network requests now flow as shown below. Without this you will not be able to debug your React application in your development environment.

![Setting up React ports](simonDevelopmentDebugging.jpg)

With the backend service running, and our files in the place where Vite expects them, we can test that everything still works. You can start Vite in dev mode with the command `npm run dev`, followed by pressing the `o` key to open the application in the browser. When you reach this point with your startup, make sure that you commit your changes.

### Third party endpoints

The `about.jsx` file contains code for making calls to third party endpoints using `fetch`. The requests are triggered by the React useEffect hook. We make one call to `picsum.photos` to get a random picture and another to `quote.cs260.click` to get a random quote. Once the endpoint asynchronously returns, the React state variables are updated. Here is an example of the quote endpoint call.

```js
React.useEffect(() => {
  const random = Math.floor(Math.random() * 1000);
  fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#picture');

      const width = containerEl.offsetWidth;
      const height = containerEl.offsetHeight;
      const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
      setImageUrl(apiUrl);
    })
    .catch();

  fetch('https://quote.cs260.click')
    .then((response) => response.json())
    .then((data) => {
      setQuote(data.quote);
      setQuoteAuthor(data.author);
    })
    .catch();
}, []);
```

## Study this code

Get familiar with what the example code teaches.

- Clone the repository to your development environment.

  ```sh
  git clone https://github.com/webprogramming260/simon-service.git
  ```

- Review the code and get comfortable with everything it represents.
- Debug the backend code by launching it with a VS Code debug session.
- Debug the frontend code by launching it with Vite and using the browser debugger.
- Use the browser's dev tools to set breakpoints in the frontend code and step through it each line.
- Make modifications to the code as desired. Experiment and see what happens.

## Deploy to production

> [!IMPORTANT]
>
> The `deployService.sh` script for this project is different from previous deployment scripts, since it needs to set up the Node.js service for your backend code, and copy your frontend code to the `public` directory. You also want to make sure that your Node.js HTTP service code for Simon is configured to listen on port 3000. When you deploy your Startup you want to make sure that code is configured to listen on port 4000.

- Deploy to your production environment using the `deployService.sh` script found in the [example class application](https://github.com/webprogramming260/simon-service/blob/main/deployService.sh). This script will bundle your React frontend application as well as build your backend application. Take some time to understand how it works.

  ```sh
  ./deployService.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```

- Update your `startup` repository `notes.md` with what you learned.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
