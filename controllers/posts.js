const Post = require('../models/post');

module.exports = {
    //Post index
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts });
    },
    //Post new
    postNew(req, res, next) {
        res.render('posts/new');
    },
    //Post create
    async postCreate(req, res, next) {
        //use req.body to create a post
        let post = await Post.create(req.body);
        res.redirect(`/posts/${post.id}`);
    },
    //Post show
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });
    },
    //Post edit
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', { post });
    }
}