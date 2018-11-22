const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const LocalStrategy = require('passport-local').Strategy;

const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');

// JSON WEB TOKEN strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    // find user specified in token
    const user = await User.findById(payload.sub);

    // if user doesn t exist
    if (!user) {
      return done(null, false);
    }

    // otherwise return user through req.user
    done(null, user);

  } catch (error) {
    done(error, false);
  }

}));

// LOCAL strategy
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    // if no user exit
    if (!user) {
      return done(null, false);
    }

    // check if password match
    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return done(null, false);
    }

    // if ok return user
    done(null, user);

  } catch (error) {

    done(error, false);

  }

}
));
