var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')('1594028320652707', 'fe06d85ca4ba5daf25b3e503dd25b546')

/* GET users listing. */
router.get('/', function(req, res) {

  if(!req.user){
    res.redirect('/');
  }
  else {
    if(req.user.facebook) {
      facebook.getImage(req.user.facebook.token, function(results){
        req.user.facebook.image = results.url;
        facebook.getFriends(req.user.facebook.token, function(results){
          req.user.facebook.friends = results.total_count;
          facebook.getGender(req.user.facebook.token, function(results){
            req.user.facebook.gender = results.gender;
          res.render('users', {user:req. user})
        })
      })
    })
    } else {
      res.render('users', {user: req.user});
    }
  }
});

module.exports = router;
