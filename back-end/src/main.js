const express = require('express');
const bodyParser = require('body-parser');
const path= require('path');


const app = new express();
const router= express.Router();

/*-- APP SET UP --*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

app.use(function(req, res, next) {
	  if (req.originalUrl.includes('favicon.ico')) {
	    res.status(204).end()
	  }
  next();
}
);

router.use('/',function(req, res) {

	console.log("pouet");
	return;

});

/*-- SETTING UP ROUTER FOR OUR SERVER --*/

app.use('/',router);


/*-- PICKING PORT NUMBER AND LISTENING --*/

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));