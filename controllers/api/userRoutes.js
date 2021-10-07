const router = require('express').Router();
const { User, Post } = require('../../models');
const sequelize = require('../../config/connection');

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
    await sequelize.sync({ force: false });
    const data = req.body;
    data.user_id = req.session.user_id;
    await Post.create(data);
  };
  makePost();
});
module.exports = router;
