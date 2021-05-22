/*-- REQUIRES --*/

const express=require('express');
const router=express.Router();
const model=require('../model/userModel');



/*-- GET ROUTE --*/

router.post('/'

,async function(req, res){ 


		try{
			if(global.tokens.hasOwnProperty(req.body.token)) {

				let user = await model.userInfo(global.tokens[req.body.token]);
				let posts = await model.userPost(global.tokens[req.body.token]);

				res.send({user : user, posts: posts});
			}

			else {
				res.send({user : null, posts: null});
			}

		}catch(error){
			console.error(error);
			return res.status(500).send('Erreur interne au serveur, connexion à la base de données impossible');
		}

});



/*-- EXPORT --*/

module.exports= router;