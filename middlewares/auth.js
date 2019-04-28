module.exports = {
    checkAuth: (req, res, next) => {
        let auth = req.get("Authorization").split(" ")[1];
        if(!auth){
            res.render("index", {errors: ["Google signin is required!!!"]});
            return;
        }
        res.locals.accessToken = auth;
        res.locals.gmail = req.body.gmail;
        console.log()
        //console.log(res.locals.accessToken);
        next();
    }
}