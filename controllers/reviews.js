const Post = require('../models/post');
const Review = require('../models/review');

module.exports = {
    //Reviews create
    async reviewCreate(req, res, next) {
        //find post by its id
        let post = await Post.findById(req.params.id).populate('reviews').exec();
        //get length of the reviews from the user
        let haveReviewed = post.reviews.filter(review => {
            return review.author.equals(req.user._id);
        }).length;
        //check if already has reviewed
        if (haveReviewed) {
            req.session.error = 'Sorry, you can only create one review per post.';
            return res.redirect(`/posts/${post.id}`); 
        }
        //create review
        req.body.review.author = req.user._id;
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
        await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
        req.session.success = 'Review updated successfully!';
        res.redirect(`/posts/${req.params.id}`);
    },
    //Reviews delete
    async reviewDelete(req, res, next) {
        await Post.findByIdAndUpdate(req.params.id, {
            $pull: { reviews: req.params.review_id }
        });
        await Review.findByIdAndRemove(req.params.review_id);
        req.session.success = 'Review deleted successfully!';
        res.redirect(`/posts/${req.params.id}`);
    }
}