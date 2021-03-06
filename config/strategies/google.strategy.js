let passport = require('passport');
let Google = require('passport-google-oauth20').Strategy

var User = require('../../models/user');

module.exports = function () {
  passport.use(new Google({
    clientID: '970303320746-fm2358lferrtkdcd1nugaopgq2s8jp1o.apps.googleusercontent.com',
    clientSecret: 'qNYQBimlD9HUe2_-ycMHcK6e',
    callbackURL: 'http://localhost:3000/auth/google/callback'},
    function(req, accessToken, refreshToken, profile, done) {
      var query = {
        'google.id': profile.id
      };

      User.findOne(query, function (error, user) {
        if (user) {
            console.log('found');
            done(null, user);
        } else {
          console.log('new user')
          let user = new User;
          user.email = profile.emails[0].value;
          user.image = profile._json.image.url;
          user.displayName = profile.displayName;
          user.google = {};
          user.google.id = profile.id;
          user.google.token = accessToken;
          user.save();
          done(null, user)
        }
      })
    }
  ));

};