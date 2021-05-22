/*-- REQUIRES --*/

const express=require('express');
const router=express.Router();
const model=require('../model/usercoverModel');



/*-- POST ROUTE --*/

router.post('/'

,async function(req, res){ 


		try{
			if(global.tokens.hasOwnProperty(req.body.token)) {

				await model.modifCover(global.tokens[req.body.token], req.body.link);
			}

			res.end();


		}catch(error){
			console.error(error);
			return res.status(500).send('Erreur interne au serveur, connexion à la base de données impossible');
		}

});



/*-- EXPORT --*/

module.exports= router;