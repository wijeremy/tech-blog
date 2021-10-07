const { Post } = require('../models');

const isOwned = async (req, res, next) => {
  const arr = req.url.split('/');
  const id = parseInt(req.params.id);
  switch (arr[1]) {
    case 'user':
      if (req.session.user_id !== id) {
        res.redirect('/');
      }
      next();
      break;
    case 'post':
      const postData = await Post.findByPk(id);
      const post = postData.get({ plain: true });
      if (req.session.user_id !== post.user_id) {
        res.redirect('/');
      }
      next();
      break;
    default:
      res.redirect('/');
  }
};

module.exports = isOwned;
