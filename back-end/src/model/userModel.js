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

		const [rows, field] = await connection.execute("SELECT login, t_name, description, profile_pic, cover_pic, date_inscription FROM users WHERE login = ?",[userName]);

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

		const [rows, field] = await connection.execute("WITH MESSAGES AS (SELECT U.login, U.profile_pic,  U.t_name, M.content, M.date_message , M.id_message,COUNT(case R.reaction when \"l\" then 1 else null end) as nb_likes,COUNT(case R.reaction when \"d\" then 1 else null end) as nb_dislikes, COUNT(DISTINCT RT.login_user) as nb_rt FROM users U JOIN messages M ON (U.login = M.login_poster) LEFT OUTER JOIN reactions R ON (R.id_message =  M.id_message) LEFT OUTER JOIN retweet RT ON (RT.id_message = M.id_message )  WHERE (M.login_poster = ?) GROUP BY M.id_message ORDER BY date_message DESC) SELECT MESSAGES.login, MESSAGES.t_name, MESSAGES.profile_pic, MESSAGES.content, MESSAGES.date_message, MESSAGES.id_message, MESSAGES.nb_likes, MESSAGES.nb_rt, MESSAGES.nb_dislikes, R.login_user as login_rter, U.t_name as t_name_rter, U.profile_pic as profile_pic_rter, R.date_retweet FROM MESSAGES NATURAL JOIN retweet R JOIN users U ON(U.login = R.login_user) WHERE (R.login_user = ?) UNION ALL SELECT MESSAGES.login, MESSAGES.t_name, MESSAGES.profile_pic, MESSAGES.content, MESSAGES.date_message, MESSAGES.id_message, MESSAGES.nb_likes, MESSAGES.nb_rt, MESSAGES.nb_dislikes, null as login_rter, null as t_name_rter , null as profile_pic_rter, null as date_retweet FROM MESSAGES  ORDER BY CASE WHEN date_retweet = null THEN date_message ELSE CASE WHEN date_retweet> date_message THEN date_retweet ELSE date_message END END DESC",
		 [userName, userName]);

		db.closeDB(connection);
		return rows;
	}

	this.userPostLogged = async (userName, currentUser) => {

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection = await db.connectDB();
		}catch(error){

			throw error;
		}

		/*-- GETTING USER MATCHING WITH userName --*/

		const [rows, field] = await connection.execute("WITH MESSAGES AS (SELECT U.login, U.profile_pic,  U.t_name, M.content, M.date_message , M.id_message, COUNT(case R.reaction when \"l\" then 1 else null end) as nb_likes, COUNT(case R.reaction when \"d\" then 1 else null end) as nb_dislikes, COUNT(DISTINCT RT.login_user) as nb_rt, CASE WHEN EXISTS (SELECT * FROM retweet WHERE login_user = ? AND id_message = M.id_message) THEN 1 ELSE 0 END AS user_rt , CASE WHEN EXISTS (SELECT * FROM reactions WHERE reaction =\"l\" AND login_user = ? AND id_message = M.id_message) THEN 1 ELSE 0 END AS user_liked, CASE WHEN EXISTS (SELECT * FROM reactions WHERE reaction =\"d\" AND login_user = ? AND id_message = M.id_message) THEN 1 ELSE 0 END AS user_disliked FROM users U JOIN messages M ON (U.login = M.login_poster) LEFT OUTER JOIN reactions R ON (R.id_message =  M.id_message) LEFT OUTER JOIN retweet RT ON (RT.id_message = M.id_message )  WHERE (M.login_poster = ?) GROUP BY M.id_message ORDER BY date_message DESC) SELECT MESSAGES.login, MESSAGES.t_name, MESSAGES.profile_pic, MESSAGES.content, MESSAGES.date_message, MESSAGES.id_message, MESSAGES.nb_likes, MESSAGES.nb_rt, MESSAGES.nb_dislikes,MESSAGES.user_liked, MESSAGES.user_disliked, MESSAGES.user_rt, R.login_user as login_rter, U.t_name as t_name_rter, U.profile_pic as profile_pic_rter, R.date_retweet FROM MESSAGES NATURAL JOIN retweet R JOIN users U ON (U.login = R.login_user) WHERE (R.login_user = ?) UNION ALL SELECT MESSAGES.login, MESSAGES.t_name, MESSAGES.profile_pic, MESSAGES.content, MESSAGES.date_message, MESSAGES.id_message, MESSAGES.nb_likes, MESSAGES.nb_rt, MESSAGES.nb_dislikes, MESSAGES.user_liked, MESSAGES.user_disliked, MESSAGES.user_rt, null as login_rter, null as t_name_rter , null as profile_pic_rter, null as date_retweet FROM MESSAGES ORDER BY CASE WHEN date_retweet = null THEN date_message ELSE CASE WHEN date_retweet> date_message THEN date_retweet ELSE date_message END END DESC"
			, [currentUser, currentUser, currentUser, userName, userName]);

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

	this.modifName = async(login, name) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("UPDATE users SET t_name = ? WHERE login = ?",[name, login],
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

	this.abonnement = async (suiveur, suivi) => {

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection = await db.connectDB();
		}catch(error){

			throw error;
		}

		/*-- GETTING USER MATCHING WITH userName --*/

		const [rows, field] = await connection.execute("SELECT login_suivi, login_suiveur FROM abonnements WHERE login_suivi = ? AND login_suiveur = ?"
			,[suivi, suiveur]);

		db.closeDB(connection);
		return rows;
	}

	this.abonner = async(suiveur, suivi) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("INSERT INTO abonnements (login_suivi, login_suiveur) VALUES (? ,?)",[suivi, suiveur],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);
	}


	this.desabonner = async(suiveur, suivi) =>{

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection= await db.connectDB();
		}catch(error){

			throw error;
		}

		connection.query("DELETE FROM abonnements WHERE login_suivi = ? AND login_suiveur = ?",[suivi, suiveur],
					function(err, result){
					if(err) throw err;
				});

		db.closeDB(connection);
	}

	this.nbabonnement = async (user) => {

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection = await db.connectDB();
		}catch(error){

			throw error;
		}

		/*-- GETTING USER MATCHING WITH userName --*/

		const [rows, field] = await connection.execute("SELECT count(*) AS nb FROM abonnements WHERE login_suiveur = ? GROUP BY login_suiveur"
			,[user]);

		db.closeDB(connection);
		if(rows.length === 0) {
			return 0;
		}
		else {
			return rows[0].nb;
		}
	}

	this.nbabonnes = async (user) => {

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection = await db.connectDB();
		}catch(error){

			throw error;
		}

		/*-- GETTING USER MATCHING WITH userName --*/

		const [rows, field] = await connection.execute("SELECT count(*) AS nb FROM abonnements WHERE login_suivi = ? GROUP BY login_suivi"
			,[user]);

		db.closeDB(connection);
		if(rows.length === 0) {
			return 0;
		}
		else {
			return rows[0].nb;
		}
	}

	this.following = async (userName) => {

		/*-- CONNECTING TO DATABASE --*/

		const db=require('./connectDB');
		let connection;

		try{
			connection = await db.connectDB();
		}catch(error){

			throw error;
		}

		/*-- GETTING USER MATCHING WITH userName --*/

		const [rows, field] = await connection.execute("SELECT login_suivi FROM abonnements WHERE login_suiveur = ?",[userName]);

		db.closeDB(connection);
		return rows;
	}
}


/*-- EXPORT --*/

module.exports = new userModel();
