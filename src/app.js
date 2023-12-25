const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const cors = require('cors');
const { isCelebrateError } = require('celebrate');
const { PORT } = require('./config');
const port = process.env.PORT || 5000;

//connect with db
require('./db/conn');

// static_path
const static_path = path.join(__dirname, '../public');
app.use(express.static(static_path));

// hbs
app.set('view engine', 'hbs');

const template_path = path.join(__dirname, '../templates/views');
const partial_path = path.join(__dirname, '../templates/partials');
app.set('views', template_path);
hbs.registerPartials(partial_path);

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//test
app.get('/', (req, res) => {
  res.render('index');
});

//start
app.get('/', (req, res) => {
  res.send('Welcome to this Api...');
});

//Define routes
app.use('/user', require('./routes/user'));
app.use('/user', require('./routes/item'));

//admin
app.use('/admin', require('./routes/admin/auth'));
app.use('/admin', require('./routes/admin/item'));

app.get('/*', (req, res) => {
  res.render('not_found');
});

// app.use(errors());
let errorHandling = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body'); // 'details' is a Map()

    const { details, _original } = errorBody;
    const msg = details[0].message;

    const RenderPage = _original.Renderpage;
    if (!RenderPage) return res.render('index', { status: 400, message: msg });
    return res.render(RenderPage, {
      status: 400,
      message: msg,
    });
  }

  return next(err);
};
app.use(errorHandling);

app.listen(port, (req, res) => {
  console.log(`🚀 App running on: http://localhost:${PORT}`);
});
