const express = require('express');
const router = require('express-promise-router')();
// const router = express.Router // replaced w express-promise-router

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

router.route('/signup')

  .post(
    // 1. validation
    validateBody(schemas.authSchema),
    // 2. if validation pass
    UsersController.signUp
  );

router.route('/signin')
  .post(UsersController.signIn);

router.route('/secret')
  .post(UsersController.secret);

module.exports = router;
