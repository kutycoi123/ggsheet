"use-strict";
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var port = 3000;
var SheetRouter = require("./routes/sheet");
var AuthMiddleware = require("./middlewares/auth");
var mongoose = require('mongoose');

var User = require("./models/user.model");
var AuthController = require("./controllers").auth;
mongoose.connect('mongodb://localhost/ggsheetDB', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Db connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.use("/spreadsheet", AuthMiddleware.checkAuth,SheetRouter);

app.get("/", (req, res, next)=>{
	res.render("index");
})
app.post("/login", AuthController.login)
app.post("/logout", AuthController.logout)
app.listen(port, () => {
	console.log("Server is listening on port + ", port);
})
