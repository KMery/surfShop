const User = require('../models/user');
const Post = require('../models/post');
const passport = require('passport');
let mapBoxToken = process.env.MAPBOX_TOKEN;

module.exports = {
    //GET /
    async landingPage(req, res, next) {
        const posts = await Post.find({});
        res.render('index', {posts, mapBoxToken, title: 'Surf Shop - Home'});
    },
    //post register method
    async postRegister(req, res, next) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        });

        await User.register(newUser, req.body.password);
        res.redirect('/');
    },
    //post login method
    postLogin(req, res, next) {
        passport.authenticate('local', { 
            successRedirect: '/', 
            failureRedirect: '/login' 
        })(req, res, next)
    },
    //get logout method
    getLogout(req, res, next) {
        req.logout();
        res.redirect('/');
    }
}