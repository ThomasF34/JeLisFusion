
// Modules
const express = require('express');
const router = express();

booksRoute = require('./booksRoute');
userRoute = require('./userRoute');

//Call for book route
router.use('/book', booksRoute);
router.use('/user', userRoute);

console.log('Dans le main router');

module.exports = router;
