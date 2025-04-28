const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const rutaTienda = require('./routes/rutaTienda');


const app = express();
const PORT = process.env.PORT || 3000


app.use