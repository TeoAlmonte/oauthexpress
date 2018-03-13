var passport = require('passport');
var Twitter = require('passport-twitter').Strategy;

module.exports = function () {
  passport.use(new Twitter({
    consumerKey: 	'XWG5uKimX5SKhlH0L0sPDu47W',
    consumerSecret: 	'pOVif9Lu6VjQTjbplh1CfMlOGhatvsVVMYa7DpmyyzYig0bKht',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    passReqToCallback: true
  },
    function(req, token, tokenSecret, profile, done) {
      let user = {};
      user.image = profile._json.profile_image_url;
      user.displayName = profile.displayName;
      user.twitter = {};
      user.twitter.id = profile.id;
      user.twitter.token = token;
      done(null, user)
    }
  ))
}
