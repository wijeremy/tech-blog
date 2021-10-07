const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const sequelize = require('../../config/connection');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again',
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again',
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/create', (req, res) => {
  const create = async () => {
    try {
      await User.create(req.body);
      res.json({ message: 'User Creation Successful!' });
    } catch (err) {
      res.status(400).json(err);
    }
  };
  create();
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/post', (req, res) => {
  const makePost = async () => {
    const data = req.body;
    data.user_id = req.session.user_id;
    await Post.create(data);
  };
  makePost();
});

router.delete('/post/:id', (req, res) => {
  const deletePost = async () => {
    const id = parseInt(req.params.id);
    await Post.destroy({ where: { id } });
  };
  deletePost();
});

router.post('/comment', (req, res) => {
  const makeComment = async () => {
    const data = req.body;
    data.user_id = req.session.user_id;
    console.log(data);
    await Comment.create(data);
  };
  makeComment();
});

router.delete('/comment/:id', (req, res) => {
  const deleteComment = async () => {
    const id = parseInt(req.params.id);
    await Comment.destroy({ where: { id } });
  };
  deleteComment();
  console.log('hello world');
  res.json({ message: 'hello' });
});

router.get('/comment', (req, res) => {
  const finder = async () => {
    const commentData = await Comment.findAll();
    const comments = commentData.map((i) => i.get({ plain: true }));
    res.json(comments);
  };
  finder();
});

router.get('/users', (req, res) => {
  const find = async () => {
    const userData = await User.findAll();
    const users = userData.map((i) => i.get({ plain: true }));
    res.json(users);
  };
  find();
});
module.exports = router;
