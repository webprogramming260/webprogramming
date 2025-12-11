const express = require('express');
const app = express();

//app.use(express.json());

// Basic replacement for express.json() middleware
app.use((req, res, next) => {
  req.body = {};
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    if (data) {
      req.body = JSON.parse(data);
    }
    next();
  });
});

app.put('/data', (req, res) => {
  res.send({ body: req.body });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
