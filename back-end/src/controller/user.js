/*-- REQUIRES --*/

const express=require('express');
const router=express.Router();
const model=require('../model/userModel');



/*-- GET ROUTE --*/

router.post('/'

,async function(req, res){ 


		try{

			let canModify=false;

			if(req.body.login){

				let user = await model.userInfo(req.body.login);

				let posts;

				if(global.tokens.hasOwnProperty(req.body.token)){

					posts = await model.userPostLogged(req.body.login, global.tokens[req.body.token]);

				}

				else{

					 posts = await model.userPost(req.body.login);

				}
				
				if(global.tokens.hasOwnProperty(req.body.token) && req.body.login ==global.tokens[req.body.token]){
					canModify =true;
				}
				res.send({user : user, posts: posts , canModify : canModify});
			}

			else{

				if(global.tokens.hasOwnProperty(req.body.token)) {
					let user = await model.userInfo(global.tokens[req.body.token]);
					let posts = await model.userPostLogged(global.tokens[req.body.token], global.tokens[req.body.token]);
					canModify= true;
					res.send({user : user, posts: posts, canModify : canModify});
				}

				else {
					res.send({user : null, posts: null, canModify: canModify});
				}

			}	


		}catch(error){
			console.error(error);
			return res.status(500).send('Erreur interne au serveur, connexion à la base de données impossible');
		}

});

router.post('/modif'

,async function(req, res){ 


		try{
			if(global.tokens.hasOwnProperty(req.body.token)) {

				await model.modifDesc(global.tokens[req.body.token], req.body.desc);
			}

			res.end();


		}catch(error){
			console.error(error);
			return res.status(500).send('Erreur interne au serveur, connexion à la base de données impossible');
		}

});

router.post('/cover'

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

router.post('/photo'

,async function(req, res){ 


		try{
			if(global.tokens.hasOwnProperty(req.body.token)) {

				await model.modifPhoto(global.tokens[req.body.token], req.body.link);
			}

			res.end();


		}catch(error){
			console.error(error);
			return res.status(500).send('Erreur interne au serveur, connexion à la base de données impossible');
		}

});



/*-- EXPORT --*/

module.exports= router;