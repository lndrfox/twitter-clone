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
			"WITH REA AS (SELECT Sum(case when reaction = \"l\" then 1 Else 0 End) AS nb_likes, Sum(case when reaction =\"d\" then 1 else 0 end) as nb_dislikes, id_message FROM reactions GROUP BY id_message), MESSAGES AS (SELECT U.login, U.profile_pic,  U.t_name, M.content, M.date_message , M.id_message, COALESCE(REA.nb_likes, 0)  as nb_likes, COALESCE(REA.nb_dislikes,0) 	as nb_dislikes,COUNT(DISTINCT RT.login_user) as nb_rt FROM users U JOIN messages M ON (U.login = M.login_poster) LEFT OUTER JOIN REA ON (REA.id_message =  M.id_message) LEFT OUTER JOIN retweet RT ON (RT.id_message = M.id_message ) GROUP BY M.id_message ORDER BY date_message DESC)SELECT MESSAGES.login, MESSAGES.t_name, MESSAGES.profile_pic, MESSAGES.content, MESSAGES.date_message, MESSAGES.id_message, MESSAGES.nb_likes, MESSAGES.nb_rt, MESSAGES.nb_dislikes, R.login_user as login_rter, U.t_name as t_name_rter, U.profile_pic as profile_pic_rter, R.date_retweet FROM MESSAGES NATURAL JOIN retweet R JOIN users U ON(U.login = R.login_user) UNION ALL SELECT MESSAGES.login, MESSAGES.t_name, MESSAGES.profile_pic, MESSAGES.content, MESSAGES.date_message, MESSAGES.id_message, MESSAGES.nb_likes, MESSAGES.nb_rt, MESSAGES.nb_dislikes, null as login_rter, null as t_name_rter , null as profile_pic_rter, null as date_retweet FROM MESSAGES  ORDER BY CASE WHEN date_retweet = null THEN date_message ELSE CASE WHEN date_retweet> date_message THEN date_retweet ELSE date_message END END DESC"

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
			"WITH REA AS (SELECT count(case when reaction = \"l\" then 1 Else null End) AS nb_likes, count(case when reaction = \"d\" then 1 else null end) as nb_dislikes, id_message FROM reactions GROUP BY id_message), MESSAGES AS (SELECT U.login, U.profile_pic,  U.t_name, M.content, M.date_message , M.id_message, COALESCE(REA.nb_likes, 0) as nb_likes, COALESCE(REA.nb_dislikes, 0) as nb_dislikes, COUNT(DISTINCT RT.login_user) as nb_rt, CASE WHEN EXISTS (SELECT * FROM retweet WHERE login_user = ? AND id_message = M.id_message) THEN 1 ELSE 0 END AS user_rt , CASE WHEN EXISTS (SELECT * FROM reactions WHERE reaction =\"l\" AND login_user = ? AND id_message = M.id_message) THEN 1 ELSE 0 END AS user_liked, CASE WHEN EXISTS (SELECT * FROM reactions WHERE reaction =\"d\" AND login_user = ? AND id_message = M.id_message) THEN 1 ELSE 0 END AS user_disliked FROM users U JOIN messages M ON (U.login = M.login_poster) LEFT OUTER JOIN REA ON (REA.id_message =  M.id_message) LEFT OUTER JOIN retweet RT ON (RT.id_message = M.id_message )  GROUP BY M.id_message ORDER BY date_message DESC) SELECT MESSAGES.login, MESSAGES.t_name, MESSAGES.profile_pic, MESSAGES.content, MESSAGES.date_message, MESSAGES.id_message, MESSAGES.nb_likes, MESSAGES.nb_rt, MESSAGES.nb_dislikes,MESSAGES.user_liked, MESSAGES.user_disliked, MESSAGES.user_rt, R.login_user as login_rter, U.t_name as t_name_rter, U.profile_pic as profile_pic_rter, R.date_retweet FROM MESSAGES NATURAL JOIN retweet R JOIN users U ON(U.login = R.login_user) UNION ALL SELECT MESSAGES.login, MESSAGES.t_name, MESSAGES.profile_pic, MESSAGES.content, MESSAGES.date_message, MESSAGES.id_message, MESSAGES.nb_likes, MESSAGES.nb_rt, MESSAGES.nb_dislikes, MESSAGES.user_liked, MESSAGES.user_disliked, MESSAGES.user_rt, null as login_rter, null as t_name_rter , null as profile_pic_rter, null as date_retweet FROM MESSAGES ORDER BY CASE WHEN date_retweet = null THEN date_message ELSE CASE WHEN date_retweet> date_message THEN date_retweet ELSE date_message END END DESC"
			, [login,login,login]);

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


	this.rt = async (id_message, login) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("INSERT IGNORE INTO retweet (id_message, login_user) VALUES (? ,?) ",
					[id_message, login],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);


		
	},

	this.unrt = async (id_message, login) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("DELETE FROM retweet WHERE id_message= ? AND login_user = ? ",
					[id_message, login],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);


		
	}

	this.like = async (id_message, react, login) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("INSERT IGNORE INTO reactions (id_message, login_user, reaction) VALUES (? ,?, ?) ",
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

	},

	this.displayComments = async () => {

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
			"SELECT c.id_commentaire, c.id_message, c.login, c.content, c.date_commentaire, u.profile_pic, u.t_name FROM commentaires c JOIN users u ON (u.login = c.login)",
			);
		db.closeDB(connection);
		return rows;
	},

	this.addComment = async(login, id_message, content) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("INSERT INTO commentaires (id_message, login, content) VALUES (? ,?, ?) ",
					[id_message, login, content],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);

	}

}


/*-- EXPORT --*/

module.exports = new homeModel();
