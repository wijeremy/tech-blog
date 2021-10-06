const withAuth = (req, res, next) => {
  console.log(req.url);
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
