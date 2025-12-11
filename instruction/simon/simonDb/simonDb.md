# Simon DB

![Simon](../simon.png)

This deliverable demonstrates using MongoDB to persistently store user's scores and authentication data.

You can view this application running here: [Example Simon DB](https://simon-db.cs260.click)

![Simon DB](simonDb.jpg)

## Database support

This version of Simon calls the database service to save high scores and authorization data. This creates a third layer in our Simon technology stack.

1. **Frontend client application** - HTML/CSS/JavaScript/React
1. **Backend web service** - Caddy, Node.js, Express
1. **Database service** - MongoDB

![Simon DB](dataService.png)

### Create a MongoDB Atlas cluster

You need to get a MongoDB Atlas account and create a database cluster that you can use as your database service. If you have not done that yet, go back and review the instruction on [data services](../../webServices//dataServices/dataServices.md).

### Store database credentials

Make sure you follow the instruction given previously about providing and protecting your MongoDB credentials in a file named `dbConfig.json`. This file will get deployed to production with the `deployService.sh` script.

```json
{
  "hostname": "cs260.abcdefg.mongodb.net",
  "userName": "myMongoUserName",
  "password": "toomanysecrets"
}
```

> [!NOTE]
>
> Make sure you include `dbConfig.json` in your `.gitignore` file so that it does not get pushed up to GitHub.

### Connecting to the database

Now you can make a connection to your MongoDB server hosted with Atlas. You also want to test your connection to make sure it is available before you start handling user requests.

```Javascript
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();
```

## Database requests

Because MongoDB was designed to represent its data in a way that is very similar to JavaScript objects, it is very easy for us to insert, update, and search for our data objects.

The following shows the majority of the database calls to MongoDB.

```js
function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addScore(score) {
  return scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}
```

You can see that in most cases it is a simple passthrough from the application logic found in `index.js` to MongoDB. The exception is the `getHighScores` call where we need to provide the parameters for searching the scores and limiting the results to the top 10 highest scores.

## Study this code

Get familiar with what this code teaches.

- Clone the repository to your development environment.
  ```sh
  git clone https://github.com/webprogramming260/simon-db.git
  ```
- Set up your Atlas credentials in a file named `dbConfig.json` that is in the same directory as `database.js`.
- Add `dbConfig.json` to your `.gitignore` file so that it doesn't put your credentials into GitHub accidentally.
- Review the code and get comfortable with everything it represents.
- Debug the code in your browser by hosting it from a VS Code debug session. This [video on debugging a node.js based service](https://youtu.be/B0le_Z_2TQY) will step you through the process.
- See how data is populated in the database by viewing the contents of the database using the MongoDB Atlas console.
- Make modifications to the code as desired. Experiment and see what happens.

## Deploy to production

- Deploy to your production environment using the `deployService.sh` script found in the [example class application](https://github.com/webprogramming260/simon-db/blob/main/deployService.sh). Take some time to understand how it works.

  ```sh
  ./deployService.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```

- Update your `startup` repository notes.md with what you learned.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
