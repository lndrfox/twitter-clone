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
			"SELECT U.login, U.profile_pic, M.content, M.date_message , M.id_message, COUNT(case R.reaction when \"l\" then 1 else null end) as nb_likes, COUNT(case R.reaction when \"d\" then 1 else null end) as nb_dislikes FROM users U JOIN messages M ON (U.login = M.login_poster) LEFT OUTER JOIN reactions R ON (R.id_message =  M.id_message) GROUP BY M.id_message ORDER BY M.date_message DESC"
			);
		db.closeDB(connection);
		return rows;
	},

	this.displayMessagesLogged = async (login) => {

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
			"SELECT U.login, U.profile_pic, U.t_name, M.content, M.date_message , M.id_message, COUNT(case R.reaction when \"l\" then 1 else null end) as nb_likes, COUNT(case R.reaction when \"d\" then 1 else null end) as nb_dislikes,CASE WHEN R.reaction = \"l\" AND R.login_user = ? THEN 1 ELSE 0 END AS user_liked, CASE WHEN R.reaction = \"d\" AND R.login_user = ? THEN 1 ELSE 0 END AS user_disliked FROM users U JOIN messages M ON (U.login = M.login_poster) LEFT OUTER JOIN reactions R ON (R.id_message =  M.id_message) GROUP BY M.id_message ORDER BY M.date_message DESC"
			, [login,login]);
		db.closeDB(connection);
		return rows;
	},

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


	},

	this.like = async (id_message, react, login) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("INSERT INTO reactions (id_message, login_user, reaction) VALUES (? ,?, ?) ",
					[id_message, login, react],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);


		
	},

	this.unlike = async (id_message, login) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("DELETE FROM reactions WHERE id_message= ? AND login_user = ? ",
					[id_message, login],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);


		
	}


}


/*-- EXPORT --*/

module.exports = new homeModel();
