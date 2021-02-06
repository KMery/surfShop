const Post = require('../models/post');

module.exports = {
    //Post index
    async getPosts(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts });
    },
    //Post new
    newPost(req, res, next) {
        res.render('posts/new');
    },
    //Post create
    async createPost(req, res, next) {
        //use req.body to create a post
        let post = await Post.create(req.body);
        res.redirect(`/posts/${post.id}`);
    }
}