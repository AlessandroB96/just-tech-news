const User = require('./user');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comments');

//CREATE ASSOCIATIONS

//linking models together 
//a user can make many posts, therefor we have a one-to-many relationship 
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//many-to-many relationship
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

//must make reverse association to complete model link 
//belongsTo tells the server that a post can only belong to 1 userx
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//many-to-many relationship 
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
})

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

//exporting User model data
module.exports = { User, Post, Vote, Comment };