const express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('passport')
const env = require('env2')('./config.env');
var forceSSL = process.env.HEROKU_FORCE_SSL == true;

var app = express();
var index = require('./routes/index');
var oauth = {
  google: require('./routes/oauth/google')
};
var notes = require('./routes/notes');

app.use(session({
  secret: process.env.SESSION_SECRET || 'we are your secret, my friend',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true } //how to configure it to start working properly?
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use( passport.initialize());
app.use( passport.session());

app.use('*', (req, res, next) => {
  if(forceSSL && req.headers['x-forwarded-proto']!=='https'){
    return res.redirect(301, 'https://' + HEROKU_APP_NAME + '.herokuapp.com' + req.url);
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));

/**
 * We expose templates for the web browser. When browser adds specific header,
 * we don't render template, and instead we send template path and data.
 * Browser will render it on its own.
 */
app.use('*', function(req, res, next){
  if(req.get('x-accept-renderable')) {
    res.render = (view, locals, callback) => {
      return res.json({
        view: view,
        data: locals
      });
    }
  }
  next();
})

app.use('/oauth/google', oauth.google);
app.use('/', index);
app.use('/notes', notes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
