/*-- REQUIRES --*/

const express=require('express');
const router=express.Router();
const model=require('../model/homeModel');



/*-- POST ROUTE --*/

router.post('/'

,async function(req, res){ 

	if(global.tokens.hasOwnProperty(req.body.token)){

		await model.postMessage(global.tokens[req.body.token],req.body.post_content);
	}

	res.end();

});

router.get('/',
	async function(req,res){

		let r = await model.displayMessages() ;
		res.send({messages : r} );
	});



/*-- EXPORT --*/

module.exports= router;