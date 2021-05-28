/*-- REQUIRES --*/

const express=require('express');
const router=express.Router();
const model=require('../model/loginModel');



/*-- POST ROUTE --*/

router.post('/'

,async function(req, res){ 


		try{

			let success= await model.loginUser(req.body.nickname, req.body.password);

			let token = "";

			if(success=="Success"){

				var randtoken = require('rand-token');
				token = randtoken.generate(16);
				global.tokens[token]=req.body.nickname;
			}

			res.send({success : success , token : token});


		}catch(error){
			console.error(error);
			return res.status(500).send('Erreur interne au serveur, connexion à la base de données impossible');
		}

});



/*-- EXPORT --*/

module.exports= router;