var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = 3000;


app.listen(port, () => {
	console.log("Server is listening on port + ", port);
})
