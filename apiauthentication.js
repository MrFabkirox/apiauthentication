const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(morgan('common'));
app.use(bodyParser.json());


// Routes
app.use('/users', require('./routes/users'));

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'index'
  });
});

// Errors

// Reaching here, no route has matched the request
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Sending the error, from the 404 or any other source
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


// Server Start
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server on ${port}`);
