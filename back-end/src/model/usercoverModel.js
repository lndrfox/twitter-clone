/*-- REQUIRES --*/

function usercoverModel(){

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


}


/*-- EXPORT --*/

module.exports = new usercoverModel();
