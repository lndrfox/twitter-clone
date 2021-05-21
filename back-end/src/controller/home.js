/*-- REQUIRES --*/

const express=require('express');
const router=express.Router();
const model=require('../model/homeModel');



/*-- POST ROUTE --*/

router.post('/'

,async function(req, res){ 

	if(global.tokens.hasOwnProperty(req.body.token)){

		model.postMessage(global.tokens[req.body.token],req.body.post_content);
	}

	res.end();

});



/*-- EXPORT --*/

module.exports= router;