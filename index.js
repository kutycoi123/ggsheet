"use-strict";
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var port = 3000;
var SheetRouter = require("./routes/sheet");
var AuthMiddleware = require("./middlewares/auth");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ggsheetDB', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Db connected");
});
var User = require("./models/user.model");
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AuthMiddleware.checkAuth);

app.use("/spreadsheets", SheetRouter);
app.get("/", (req, res, next)=>{
	res.render("index");
})
app.post("/login", (req, res, next) => {
	//console.log(req);
	let {gmail, access_token} = req.body;
	User.findOneAndUpdate({gmail}, {gmail , access_token}, {new: true, upsert: true}, function(err, data){
		if(err){
			console.log(err);
			res.json({errors: [err]});
			return;
		}
		console.log("Data:", data);
		res.render("dashboard/index", {user: data});
	})
	
})
app.post("/logout", (req, res, next) => {
	res.render("index");
})
app.listen(port, () => {
	console.log("Server is listening on port + ", port);
})
