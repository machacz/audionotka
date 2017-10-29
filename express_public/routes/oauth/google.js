
var express = require('express');
var router = express.Router();
var passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth/google',
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
       process.nextTick(function () {

         // To keep the example simple, the user's Google profile is returned to
         // represent the logged-in user.  In a typical application, you would want
         // to associate the Google account with a user record in your database,
         // and return that user instead.
         return done(null, profile);
       });
  }
));

router.get('/request',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ]}
));

router.get( '/',
	passport.authenticate( 'google', {
		successRedirect: '/account',
		failureRedirect: '/login'
}));

module.exports = router;
