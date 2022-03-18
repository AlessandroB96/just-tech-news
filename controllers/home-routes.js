const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//take a single "post" object and pass it to the homepage.handlebars template
router.get('/', (req, res) => {
  console.log(req.session);
    Post.findAll({
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
          // pass a single post object into the homepage template
          const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('homepage', { posts });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

    router.get('/login', (req, res) => {
      //using cookies to redirect to homepage if already logged in before 
      if(req.session.loggedIn) {
        res.redirect('/');
        return;
      }
        res.render('login');
      });
    
module.exports = router;