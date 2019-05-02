'use-strict'


var User = require("../models/user.model");
module.exports = {
    login: (req, res, next) => {
        let {gmail, access_token} = req.body;
        User.findOneAndUpdate({gmail}, {gmail , access_token}, {new: true, upsert: true}, function(err, data){
            if(err){
                console.log(err);
                res.json({errors: [err]});
                return;
            }
            res.render("dashboard/index", {user: data});
        })
        
    },
    logout: (req, res, next) => {
        let {gmail, access_token} = req.body;
        User.updateOne({gmail}, {access_token: ""}, function(err, response){
            if(err){
                console.log(err);
                res.render("index", {errors: [err]});
                return;
            }
            console.log(response);
            res.render("index");
        })
    }

}