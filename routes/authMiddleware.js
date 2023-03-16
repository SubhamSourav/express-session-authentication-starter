module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "You are not Authorized to view this" });
  }
};

module.exports.isAdmin = (req, res, next) => {};
