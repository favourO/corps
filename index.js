const express = require('express');
const route = require('./route');

const app = express();

const port = 4000;
const posts = require('./post');
app.use(express.json())

app.use('/', route);

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})