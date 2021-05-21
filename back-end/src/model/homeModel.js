/*-- REQUIRES --*/

function homeModel(){

	this.displayMessages = async () => {

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		/*-- GETTING USERS MATCHING WITH userName --*/

		const [rows, field] = await connection.execute(
			"SELECT U.login, U.profile_pic, M.content, M.date_message , M.id_message  FROM users U JOIN messages M WHERE (U.login = M.login_poster)"
			);

		db.closeDB(connection);
		return rows;
	}

	this.postMessage = async(login, post_content) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("INSERT INTO messages (login_poster, content) VALUES (? ,?) ",
					[login, post_content],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);


	}


}


/*-- EXPORT --*/

module.exports = new homeModel();
