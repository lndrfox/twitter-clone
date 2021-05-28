/*-- REQUIRES --*/

const express=require('express');
const router=express.Router();
const model=require('../model/loginModel');



/*-- POST ROUTE --*/

router.post('/'

,async function(req, res){ 

	if(global.tokens.hasOwnProperty(req.body.token)){

		delete global.tokens[req.body.token];

	}

	res.send("ok");

});



/*-- EXPORT --*/

module.exports= router;