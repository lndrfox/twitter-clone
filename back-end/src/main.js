const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path= require('path');

const register= require('./controller/register');
const login= require('./controller/login');
const logout= require('./controller/logout');
const home= require('./controller/home');
const user= require('./controller/user');
const usermodif = require('./controller/usermodif');


const app = new express();
const router= express.Router();

/*-- APP SET UP --*/

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

global.tokens={};


router.get('/',function(req, res) {

		return res.send("salut");


});


/*-- SETTING UP ROUTER FOR OUR SERVER --*/

app.use('/',router);
app.use('/register',register);
app.use('/login',login);
app.use('/logout',logout);
app.use('/home',home);
app.use('/user', user);
app.use('/usermodif', usermodif);


/*-- PICKING PORT NUMBER AND LISTENING --*/

const PORT = 5050;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));