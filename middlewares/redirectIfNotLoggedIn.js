module.exports = function (req, res, next) {
  if (!req.cookies || !req.cookies.token) {
    req.session = req.session || {};
    req.session.redirectTo = req.originalUrl;
    return res.redirect('/login');
  }
  next();
};
