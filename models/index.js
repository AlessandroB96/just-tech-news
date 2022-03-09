const User = require('./user');
const Post = require('./Post');

//create associations
//linking models together 
//a user can make many posts, therefor we have a one-to-many relationship 
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//must make reverse association to complete model link 
//belongsTo tells the server that a post can only belong to 1 userx
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//exporting User model data
module.exports = { User, Post };