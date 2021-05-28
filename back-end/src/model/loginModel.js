/*-- REQUIRES --*/

const bcrypt= require('bcryptjs');

function loginModel(){

	this.loginUser = async (userName, password) => {

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		/*-- GETTING USERS MATCHING WITH userName --*/

		const [rows, field] = await connection.execute("SELECT login, password FROM users WHERE login = ?",[userName]);

		/*-- IF USER DOESN'T EXIST --*/

		if(rows.length === 0){

			db.closeDB(connection);
			return "Utilisateur inexistant";
		}

		else{

			/*-- IF PASSWORD MATCH --*/

			if(bcrypt.compareSync(password , rows[0].password)){

				return "Success"
					
			}

			else{

				return "Mot de passe incorrect";
			}

		}
		
	}


}


/*-- EXPORT --*/

module.exports = new loginModel();
