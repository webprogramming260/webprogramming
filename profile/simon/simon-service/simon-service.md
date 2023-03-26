# Simon Service

![Simon](../simon.png)

This deliverable demonstrates converting the JavaScript application into a web application by implementing a web service that listens on a network port for HTTP requests. The web service provide endpoints for getting and updating the scores. The application also uses a couple third party endpoints to display inspirational quotes on the about page and show a random header image.

We will use Node.js and Express to create our HTTP service.

You can view this application running here: [Example Simon Service](https://simon-service.cs260.click)

![Simon Service](simonService.jpg)

## Service endpoint definitions

Here is our design, documented using curl commands, for the two endpoints that the Simon web service provides.

**GetScores** - Get the latest high scores.

```sh
curl -X GET /api/scores

#Response
{ "scores":[
  {"name":"Harvey", "score":"337", "date":"2022/11/20"},
  {"name":"도윤 이", "score":"95", "date":"2019/05/20"}
]}
```

**SubmitScore** - Submit a score for consideration in the list of high scores.

```sh
curl -X POST /api/score -d '{"name":"Harvey", "score":"337", "date":"2022/11/20"}'

#Response
{ "scores":[
  {"name":"Harvey", "score":"337", "date":"2022/11/20"},
  {"name":"도윤 이", "score":"95", "date":"2019/05/20"}
]}
```

## Third party endpoints

The about.js file contains code for making calls to third party endpoints using fetch. We make one call to `picsum.photos` to get a random picture and another to `quotable.io` to get a random quote. Once the endpoint asynchronously returns, the DOM is updated with the requested data. Here is an example of the quote endpoint call.

```js
function displayQuote(data) {
  fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#quote');

      const quoteEl = document.createElement('p');
      quoteEl.classList.add('quote');
      const authorEl = document.createElement('p');
      authorEl.classList.add('author');

      quoteEl.textContent = data.content;
      authorEl.textContent = data.author;

      containerEl.appendChild(quoteEl);
      containerEl.appendChild(authorEl);
    });
}
```

## Steps to convert Simon to a service

Converting Simon to a service involved the following steps.

1. Move all the previous deliverable code files (_.html, _.js, \*.css, favicon.ico, and assets) into a sub-directory named `public`. We will use the HTTP Node.js based service to host the front-end application files. This is done with the static file middleware that we will add our service `index.js`.

   ```js
   app.use(express.static('public'));
   ```

   When running our service the static file middleware takes care of reading the front-end code from the `public` directory and returning it to the browser. The service only directly handles the endpoint requests.

   ![Simon service](../simon-react/simonProduction.jpg)

1. Within the project directory run `npm init -y`. This configures the directory to work with **node.js**.
1. Modify or create `.gitignore` to ignore `node_modules`.
1. Install the Express package by running `npm install express`. This will write the Express package dependency in the `package.json` file and install all the Express code to the `node_modules` directory.
1. Create a file named `index.js` in the root of the project. This is the entry point that **node.js** will call when you run your web service.
1. Add the basic Express JavaScript code needed to host the application static content and the desired endpoints.

   ```js
   const express = require('express');
   const app = express();

   // The service port. In production the front-end code is statically hosted by the service on the same port.
   const port = process.argv.length > 2 ? process.argv[2] : 3000;

   // JSON body parsing using built-in middleware
   app.use(express.json());

   // Serve up the front-end static content hosting
   app.use(express.static('public'));

   // Router for service endpoints
   const apiRouter = express.Router();
   app.use(`/api`, apiRouter);

   // GetScores
   apiRouter.get('/scores', (_req, res) => {
     res.send(scores);
   });

   // SubmitScore
   apiRouter.post('/score', (req, res) => {
     scores = updateScores(req.body, scores);
     res.send(scores);
   });

   // Return the application's default page if the path is unknown
   app.use((_req, res) => {
     res.sendFile('index.html', { root: 'public' });
   });

   app.listen(port, () => {
     console.log(`Listening on port ${port}`);
   });
   ```

1. Modify the Simon application code to make service endpoint requests to our newly created HTTP service code.

   ```js
   async function loadScores() {
     const response = await fetch("/api/scores")
     const scores = await response.json()

     // Modify the DOM to display the scores
   ```

## Study this code

Get familiar with what the example code teaches.

- Clone the repository to your development environment.

  ```sh
  git clone https://github.com/webprogramming260/simon-service.git
  ```

- Review the code and get comfortable with everything it represents.
- View the code in your browser by hosting it from a VS Code debug session.
- Use the browser's dev tools to set breakpoints in the code and step through it each line.
- Make modifications to the code as desired. Experiment and see what happens.

## Deploy to production

- Deploy to your production environment using a copy of the `deployService.sh` script found in the [example class application](https://github.com/webprogramming260/simon-service/blob/main/deployService.sh). Take some time to understand how it works.

  ```sh
  ./deployService.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```

  ⚠ **NOTE** - The deployment script for this project is different than pervious deployment scripts since it needs to set up the Node.js service for your backend code, and copy your front-end code to the `public` directory. You also want to make sure that your node.js HTTP service code for Simon is configured to listen on port 3000. When you deploy your Start Up you want to make sure that code is configured to listen on port 4000.

- Update your `start up` repository README.md to record and reflect on what you learned.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
- Submit the URL to your production environment for grading using the Canvas assignment page.

## Grading Rubric

- 50% - Simon Service to your production environment
- 50% - Notes in your `start up` repository README.md about what you have learned
