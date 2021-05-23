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



router.post('/logged'

,async function(req, res){ 

	if(global.tokens.hasOwnProperty(req.body.token)){

		res.send({messages : await model.displayMessagesLogged(global.tokens[req.body.token],req.body.post_content)});
	}

	res.end();

});

router.get('/',
	async function(req,res){
		res.send({messages : await model.displayMessages()} );
	});

router.post('/react'

,async function(req, res){ 


	if(global.tokens.hasOwnProperty(req.body.token)){

		await model.like(req.body.id, req.body.react, global.tokens[req.body.token]);
	}

	res.end();

});


router.post('/react/un'

,async function(req, res){ 


	if(global.tokens.hasOwnProperty(req.body.token)){

		await model.unlike(req.body.id, global.tokens[req.body.token]);
	}

	res.end();

});


router.post('/rt'

,async function(req, res){ 


	if(global.tokens.hasOwnProperty(req.body.token)){

		await model.rt(req.body.id, global.tokens[req.body.token]);
	}

	res.end();

});

router.post('/rt/un'

,async function(req, res){ 


	if(global.tokens.hasOwnProperty(req.body.token)){

		await model.unrt(req.body.id, global.tokens[req.body.token]);
	}

	res.end();

});




/*-- EXPORT --*/

module.exports= router;