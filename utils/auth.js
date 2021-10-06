const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    console.log(req.body);
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
