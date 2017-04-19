const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

const pg = require('./db/knex.js')
const linkQuery = require('./db/link-query')

const app = express();
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`app running on ${port}`);
})

app.set('view engine', 'hbs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// hit default route
app.get('/', (req, res) => {
  // select all from table
  // pg('links').select()
  let newArray = []
  let data = pg.select('*').from('comment').join('links', {'links.id': 'comment.link_id'})
  // get data from promise
  .then(function(data) {
    //console log that table
    res.render('index', {data})
    linkQuery.sortArray(data, newArray)
    linkQuery
    console.log(newArray);
  })
  // linkQuery.getComments()
  // .then(data => {
  //   let comment = data
  //   res.render('index', {comment})
  //   console.log(comment)
  // })
})

// app.get('/', (req, res) => {
//   linkQuery.getComments()
//   .then(data => {
//     let comment = data
//     res.render('index', {comment})
//     console.log(comment)
//   })
// })

app.post ('/add-link', (req, res) => {
  linkQuery.add(req.body)
  .then(() => {
    res.redirect('/')
  })
})

app.post('/upvote/:id', (req, res) => {
  linkQuery.upVote(req.params.id)
  .then(() => {
    res.redirect('/')
  })
})

app.post('/downvote/:id', (req, res) => {
  linkQuery.downVote(req.params.id)
  .then(() => {
    res.redirect('/')
  })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
