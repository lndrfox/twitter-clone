/*-- REQUIRES --*/

const express=require('express');
const router=express.Router();
const model=require('../model/registerModel');


/*-- POST ROUTE --*/

router.post('/'
, async function(req, res){ 


		try{

			let success= await model.registerUser(req.body.nickname, req.body.password);

			/*-- IF SUCH AN USER ALREADY EXISTS --*/

			if(success === false){

				res.send("Ce pseudo est déjà prit");
			}

			else{

				res.send("Inscription avec succès");
			}
		}catch(error){
			console.error(error);
			res.status(500).send('Erreur interne au serveur, connexion à la base de données impossible');
		}
	

});



/*-- EXPORT --*/

module.exports= router;