const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const isOwned = require('../utils/owned');
const { format_date } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((i) => i.get({ plain: true }));

    const postData = await Post.findAll();
    const posts = postData.map((i) => i.get({ plain: true }));
    // posts[0].holler();
    posts.map((post) => {
      const getPostName = () => {
        for (let i = 0; i < users.length; i++) {
          if (post.user_id === users[i].id) {
            return users[i].name;
          }
        }
      };
      const postName = getPostName();
      post.name = postName;
      // post.owned = post.isOwned();
      return post;
    });

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
      posts,
      format_date,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/user/:id', withAuth, isOwned, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = await User.findByPk(userId);
    const user = userData.get({ plain: true });
    const postData = await Post.findAll({
      where: {
        user_id: userId,
      },
    });

    const posts = postData.map((i) => i.get({ plain: true }));
    posts.map((i) => {
      i.name = user.name;
      i.owned = true;
    });
    res.render('homepage', {
      user,
      posts,
      format_date,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    throw err;
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id);

    const userData = await User.findAll({
      attributes: { exclude: ['password', 'email'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((i) => i.get({ plain: true }));

    const commentsData = await Comment.findAll({
      where: {
        post_id: postId,
      },
    });
    const comments = commentsData.map((i) => i.get({ plain: true }));

    const nameNames = (id) => {
      for (let j = 0; j < users.length; j++) {
        if (id === users[j].id) {
          return users[j].name;
        }
      }
    };

    comments.map((i) => {
      if (i.user_id === req.session.user_id) {
        i.owned = true;
      }
      i.name = nameNames(i.user_id);
    });

    const postData = await Post.findByPk(postId);
    const post = postData.get({ plain: true });
    post.name = nameNames(post.user_id);
    res.render('post', {
      post,
      comments,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    throw err;
  }
});

router.get('/user', withAuth, (req, res) => {
  res.render('login');
});

router.get('/post', withAuth, (req, res) => {
  res.render('postMaker');
});
module.exports = router;
