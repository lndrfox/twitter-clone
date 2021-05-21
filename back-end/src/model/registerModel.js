/*-- REQUIRES --*/

const bcrypt= require('bcryptjs');

function registerModel(){

	this.registerUser = async (userName , password, account) => {

		/*-- CONNECTING DB --*/

		const db=require('./connectDB');
		let connection;
		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}
		
		/*-- CHECKING IF userName IS ALREADY USED --*/

		const [rows, field] =  await connection.execute("SELECT login FROM users WHERE login= ?",[userName]);

			if(rows.length !== 0){

				db.closeDB(connection);
				return false;
			}

			/*-- INSERTING THE USER INTO THE DATABASE --*/

			else{

				let salt= bcrypt.genSaltSync(10);
				let hashedPW=bcrypt.hashSync(password, salt);
				
				connection.query("INSERT INTO users (login, password) VALUES (? ,?) ",
					[userName, hashedPW],
					function(err, result){
					if(err) throw err;
				});

				db.closeDB(connection);
				return true;
			}
		

	}
}

/*-- EXPORT --*/

module.exports = new registerModel();
