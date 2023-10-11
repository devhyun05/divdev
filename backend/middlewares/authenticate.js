const ensureLogin = (req, res, next) => {
    if (req.session.isLoggedIn !== undefined && 
        req.session.isLoggedIn &&
        req.session.user !== undefined) {
        // if user has logged in allow them to go to desired endpoint
        next();
    } else {       
        res.redirect("/login");
    }
}