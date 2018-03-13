var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

  if(!req.user){
    res.redirect('/');
  }
  else {
    res.render('users', {user: {name: req.user.displayName,
                         image: req.user.image}})
  }
});

module.exports = router;
