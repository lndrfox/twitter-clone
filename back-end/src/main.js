const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path= require('path');

const connectionDB= require('./model/connectDB');

const app = new express();
const router= express.Router();

/*-- APP SET UP --*/

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));



router.use('/',async function(req, res) {

	
	res.send("salut");

});

/*-- SETTING UP ROUTER FOR OUR SERVER --*/

app.use('/',router);


/*-- PICKING PORT NUMBER AND LISTENING --*/

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));