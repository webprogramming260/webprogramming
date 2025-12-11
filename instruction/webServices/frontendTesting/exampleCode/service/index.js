const app = require('./service.js');

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
