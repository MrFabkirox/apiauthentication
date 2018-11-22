const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
  return JWT.sign({
    iss: 'apiauthentication',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
};

module.exports = {
  signUp: async (req, res, next) => {
    /*  // done by module express-promise-router
        try {
            [block]
        } catch(error) {
            next(error)
        }
        */

    // joi validation on Email & Pwd
    // req.value.body used from validation

    // 1. capture entry
    const { email, password } = req.value.body;

    // 2. check if email already in db
    const foundUser = await User.findOne({ email: email});
    if(foundUser) {
      return res.status(403).json({ 'error': 'Email already in use'});
    }

    // 3. create new user if not already in db
    const newUser = new User({
      email: email, // ES6, if key:value identic, only one required
      password: password
    });

    await newUser.save();

    // old way, req.value.body instead req.body because validation
    // const email = req.value.body.email;
    // const password = req.value.body.password;

    // 4. generate token
    const token = signToken(newUser);

    // 5. respond with token
    res.status(200).json({
      'token': token,
      'newUser': newUser
    });

  },

  signIn: async (req, res, next) => {
    // Generate token
    console.log('UsersController.signIn() called');
  },

  secret: async (req, res, next) => {

    // logged
    res.status(200).json({
      'mess': res.User
    });

    console.log('UsersController.secret() reached');

    res.status(200).json({
      'user': res.User,
      'body': res.body
    });

  }

};
