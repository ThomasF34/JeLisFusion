
// Modules
const express = require('express');
const router = express();

booksRoute = require('./booksRoute');
userRoute = require('./userRoute');
categoryRoute = require('./categoryRoute');

//Call for book route
router.use('/book', booksRoute);
router.use('/user', userRoute);
router.use('/category', categoryRoute);

console.log('Dans le main router');

module.exports = router;
