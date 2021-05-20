const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path= require('path');

const register= require('./controller/register');

const app = new express();

/*-- APP SET UP --*/

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));





/*-- SETTING UP ROUTER FOR OUR SERVER --*/


app.use('/register',register);

/*-- PICKING PORT NUMBER AND LISTENING --*/

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));