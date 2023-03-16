const passport = require("passport");
const { validPassword } = require("../lib/passwordUtils");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;

const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false);
    }
    const isValid = validPassword(password, user.hash, user.salt);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
