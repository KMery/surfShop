const Post = require('../models/post');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
let mapBoxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require('../cloudinary');

module.exports = {
    //Post index
    async postIndex(req, res, next) {
        let post = await Post.paginate({}, {
            page: req.query.page || 1,
            limit: 10,
            sort: '-_id'
        });
        post.page = Number(post.page);
        res.render('posts/index', { 
            post, 
            mapBoxToken: mapBoxToken, 
            title: "Post index" 
        });
    },
    //Post new
    postNew(req, res, next) {
        res.render('posts/new');
    },
    //Post create
    async postCreate(req, res, next) {
        req.body.post.images = [];
        for (const file of req.files) {
            req.body.post.images.push({
                url: file.secure_url,
                public_id: file.public_id
            });
        };
        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.post.location,
                limit: 1
            })
            .send();
        req.body.post.geometry = response.body.features[0].geometry;
        let post = new Post(req.body.post);
		post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;
		await post.save();
        req.session.success = "Post created successfully!";
        res.redirect(`/posts/${post.id}`);
    },
    //Post show
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id).populate({
            path: 'reviews',
            options: { sort: { '_id': -1 } },
            populate: {
                path: 'author',
                model: 'User'
            } 
        });
        const floorRating = post.calculateAvgRating();
        res.render('posts/show', { post, mapBoxToken, floorRating }); 
    },
    //Post edit
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', { post });
    },
    //Post update
    async postUpdate(req, res, next) {
        let post = await Post.findById(req.params.id);
        //deletions of selected images (from cloudinary and db)
        if (req.body.deleteImages && req.body.deleteImages.length > 0) {
            let deleteImages = req.body.deleteImages; 
            for (const public_id of deleteImages) {
                await cloudinary.v2.uploader.destroy(public_id);
                for (const image of post.images) {
                    if (public_id === image.public_id) {
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1);
                    }
                }
            }
        };
        //check if there are new images to upload
        if (req.files) {
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
                console.log(post.images);
            };  
        };
        //check if location was updated
        if (req.body.location !== post.location) {
            let response = await geocodingClient
                .forwardGeocode({
                    query: req.body.post.location,
                    limit: 1
                })
                .send();
            post.geometry = response.body.features[0].geometry;
            post.location = req.body.location;
        }
        //update the post with the new properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;
        //save updated post
        post.save();
        //redirect to the show page (by id)
        res.redirect(`/posts/${post.id}`);
    },
    //Post delete
    async postDelete(req, res, next) {
        let post = await Post.findById(req.params.id);
        //delete images from cloudinary before delete the post
        for (const image of post.images) {
            await cloudinary.v2.uploader.destroy(image.public_id);
        };
        //delete the post
        await post.remove();
        req.session.success = "Post deleted successfully!"
        res.redirect('/posts');
    }
}