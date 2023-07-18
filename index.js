const express = require ('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const fm=require('front-matter');
const FormData = require('form-data');
const fs = require('fs');
const port = 6000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
