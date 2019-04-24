module.exports = {
    checkAuth: (req, res, next) => {
        let auth = req.get("Authorization");
        if(!auth){
            res.render("index", {errors: ["Google signin is required!!!"]});
            return;
        }
        res.locals.accessToken = auth;
        console.log(res.locals.accessToken);
        next();
    }
}