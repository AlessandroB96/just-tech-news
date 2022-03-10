const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//creating our post model
class Post extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                    sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                    'vote_count'
                    ]
                ]
            })
        });
    }
}

//creating fields/columns for the Post model
//Post model takes in 2 parameters: the Post schema, and configuring the metadata and naming convention 
Post.init(
   {
       id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true
       },
       title: {
           type: DataTypes.STRING,
           allowNull: false
       },
       post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
       },
       user_id: {    //this column determines who posts the news article 
           type: DataTypes.INTEGER,
           references: {
               model: 'user',
               key: 'id'      //references user model with the primary key 'id'
           }
       }
   },
   {
       sequelize,
       freezeTableName: true,
       underscored: true,
       modelName: 'post'
   }
);

module.exports = Post;