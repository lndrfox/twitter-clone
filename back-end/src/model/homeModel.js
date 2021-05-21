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

		const [rows, field] = await connection.execute
			("SELECT U.login, U.profile_pic, M.content, M.date_message  FROM users U JOIN messages M WHERE (U.login = M.login_poster)");


		return rows;
	}

	this.postMessage = async() =>{


		
	}


}


/*-- EXPORT --*/

module.exports = new homeModel();
