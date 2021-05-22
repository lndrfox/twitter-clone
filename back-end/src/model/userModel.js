/*-- REQUIRES --*/

function userModel(){

	this.userInfo = async (userName) => {

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection = await db.connectDB();
		}catch(error){

			throw error;
		}

		/*-- GETTING USER MATCHING WITH userName --*/

		const [rows, field] = await connection.execute("SELECT login, description, profile_pic, cover_pic, date_inscription FROM users WHERE login = ?",[userName]);

		db.closeDB(connection);
		return rows[0];
	}

	this.userPost = async (userName) => {

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection = await db.connectDB();
		}catch(error){

			throw error;
		}

		/*-- GETTING USER MATCHING WITH userName --*/

		const [rows, field] = await connection.execute("SELECT content, date_message, id_message FROM messages WHERE (? = login_poster) ORDER BY date_message DESC", [userName]);

		db.closeDB(connection);
		return rows;
	}

	this.modifDesc = async(login, desc) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("UPDATE users SET description = ? WHERE login = ?",[desc, login],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);


	}

	this.modifCover = async(login, link) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("UPDATE users SET cover_pic = ? WHERE login = ?",[link, login],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);


	}

	this.modifPhoto = async(login, link) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("UPDATE users SET profile_pic = ? WHERE login = ?",[link, login],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);


	}
}


/*-- EXPORT --*/

module.exports = new userModel();
