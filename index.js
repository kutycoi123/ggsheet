"use-strict";
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res, next)=>{
	res.render("index");
})
app.listen(port, () => {
	console.log("Server is listening on port + ", port);
})
