const Express = require('express');
const UserController = require('./user.controller');
const jwt = require('jsonwebtoken');

const router = Express.Router();

router.post('/register', UserController.registerController);
router.post('/login', UserController.login);
router.delete(
  '/deleteAccount',
  function (req, res, next) {
    var token = req.get('Authorization');
    console.log('token', token);
    try {
      var payload = jwt.verify(token, 'mysecretkey');
    } catch {
      console.log('Token is not Valid');
      res.status(401).send({
        message: 'Token not Valid',
      });
    }
    if (payload) {
      next();
    }
    console.log('Token Verification result', payload);
    res.send({
      message: 'Token Verified',
    });
  },
  UserController.deleteAccount
);

router.post('/forgotPassword', UserController.forgotPassword);
router.get('/search', UserController.search);
router.put('/updateprofile', function (req, res, next) {
  var token = req.get('Authorization');
  console.log('token', token);
  try {
    var payload = jwt.verify(token, 'mysecretkey');
  } catch {
    console.log('Token is not Valid');
    res.status(401).send({
      message: 'Token not Valid',
    });
  }
  if (payload) {
    req.body.email = payload.email
    next()
  }
  console.log('Token Verification result', payload);
  res.send({
    message: 'Token Verified',
  });
}, UserController.updateProfile);

router.get('/loginStatus', UserController.checkStatus)

module.exports = router;
/**
 * exports.whatever = 'pooja'
 * exports.x = 10
 *
 * This type will export in Object format
 *
 * module.exports = router
 * will not send data in object format but will directly send
 */
