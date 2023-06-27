const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const bodyParser = require('body-parser');
const routes = require('./src/routes/routes.js');

// Your routes and middleware configuration
const port = process.env.PORT || 8000;
const host = process.env.HOST || '127.0.0.1';

app.get('/', (req, res) => {
    res.send('Hello, World !');
});

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});