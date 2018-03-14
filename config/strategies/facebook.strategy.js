let passport = require('passport');
let Facebook = require('passport-facebook').Strategy

var User = require('../../models/user');

module.exports = function () {
  passport.use(new Facebook({
    clientID: '1594028320652707',
    clientSecret: 'fe06d85ca4ba5daf25b3e503dd25b546',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    passReqToCallback: true,
    profileFields: ['emails', 'displayName']
  },
    function(req, accessToken, refreshToken, profile, done) {
      var query = {
        'facebook.id': profile.id
      };

      User.findOne(query, function (error, user) {
        if (user) {
            console.log('found');
            done(null, user);
        } else {
          console.log('new user')
          let user = new User;
          user.email = profile.emails[0].value;
          user.displayName = profile.displayName;
          user.facebook = {};
          user.facebook.id = profile.id;
          user.facebook.token = accessToken;
          user.save();
          done(null, user)
        }
      })
    }
  ))
}
