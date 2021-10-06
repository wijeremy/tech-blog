const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((i) => i.get({ plain: true }));

    const postData = await Post.findAll();
    const posts = postData.map((i) => i.get({ plain: true }));
    const namedPosts = posts.map((post) => {
      const getPostName = () => {
        for (let i = 0; i < users.length; i++) {
          if (post.user_id === users[i].id) {
            return users[i].name;
          }
        }
      };
      const postName = getPostName();
      post.name = postName;
      return post;
    });

    console.log(namedPosts);
    console.log(users);
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
      posts,
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

module.exports = router;
