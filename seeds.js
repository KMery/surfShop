const faker = require('faker');
const post = require('./models/post');
const Post = require('./models/post');

async function seedPost() {
    await Post.remove({});
    for (const i of new Array(40)) {
        const post = {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            coordinates: [-38.4192641, -63.5989206],
            author: {
                '_id' : '603c11a280e116234843efb3',
                'username' : 'test1'
            } 
        }
        await Post.create(post);
    }
    console.log('40 new post created');
};

module.exports = seedPost;