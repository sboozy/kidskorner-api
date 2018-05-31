const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const authController = require('./controller/authController');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const app = express();
const PORT = process.env.PORT || 3005;

// Requests get logged to the console
app.use(logger('dev'));
// Gives us easier access to the request body as an object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(authController.receiveToken);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);


app.get('/', (req, res) => {
  res.send('Home route');
})

app.listen(PORT, () => console.log(`here we go again, on ${PORT}`));
