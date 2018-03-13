let passport = require('passport');
let Google = require('passport-google-oauth20').Strategy

module.exports = function () {
  passport.use(new Google({
    clientID: '970303320746-fm2358lferrtkdcd1nugaopgq2s8jp1o.apps.googleusercontent.com',
    clientSecret: 'qNYQBimlD9HUe2_-ycMHcK6e',
    callbackURL: 'http://localhost:3000/auth/google/callback'},
    function(req, accessToken, refreshToken, profile, done) {
      let user = {};
      user.email = profile.emails[0].value;
      user.image = profile._json.image.url;
      user.displayName = profile.displayName;
      user.google = {};
      user.google.id = profile.id;
      user.google.token = accessToken;
      done(null, user)
    }
  ))
}
