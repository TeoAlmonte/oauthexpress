let OAuth = require('OAuth').OAuth2;

let Facebook = function (facebookKey, facebookSecret){
  let key = facebookKey;
  let secret = facebookSecret;
  let oauth = new OAuth(
    key, secret, 'https://graph.facebook.com',
    null,
    'oauth2/token',
    null
  )
  let getImage = function(userKey, done) {
    oauth.get('https://graph.facebook.com/v2.12/me/picture?redirect=false&type=large',
  userKey,
    function(err, results, res) {
      results = JSON.parse(results);
      done(results.data);
    });
  }

  let getFriends = function(userKey, done) {
    oauth.get('https://graph.facebook.com/v2.12/me/friends?redirect=false',
    userKey,
      function(err, results, res) {
        results = JSON.parse(results);
        done(results.summary);
      });
    }

  let getGender = function(userKey, done) {
    oauth.get('https://graph.facebook.com/v2.12/me?fields=gender',
    userKey,
      function(err, results, res) {
        results = JSON.parse(results);
        done(results);
        console.log(`${results.gender} person`)
      });
    }
    return {
      getImage: getImage,
      getFriends: getFriends,
      getGender: getGender
    }
}

module.exports = Facebook;