/*-- REQUIRE --*/

const mysql= require('mysql2/promise');

function DataBase(){

	this.connectDB= async () => {

		/*-- CONNECT TO DB --*/

			const db=await mysql.createConnection({
			host : 'localhost',
			user : 'juliaa', //YOUR MYSQL USERNAME HERE
			password: 'colibrij4',//YOUR PASSWORD HERE
			database:'twitternj'
		});

		db.connect(function(err){

		if(err){

			console.error('error connecting to database: '+err.stack);
			throw err;
			return;
		}

		console.log('connection successfull');
	    });

	    return db;
	};

	/*-- CLOSING DB --*/

	this.closeDB= (db) => {

		db.end();
	}
}

/*-- EXPORT --*/

module.exports = new DataBase();