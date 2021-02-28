const Post = require('../models/post');
const Review = require('../models/review');

module.exports = {
    //Reviews create
    async reviewCreate(req, res, next) {
        //find post by its id
        let post = await Post.findById(req.params.id);
        //create review
        // req.body.author = req.user._id;
        let review = await Review.create(req.body.review);
        //assign review to the post
        post.reviews.push(review);
        //Save the post
        post.save();
        //redirect to the post
        req.session.success = 'Review created successfully!';
        res.redirect(`/posts/${post.id}`);
    },
    //Reviews update
    async reviewUpdate(req, res, next) {
        
    },
    //Reviews delete
    async reviewDelete(req, res, next) {

    }
}