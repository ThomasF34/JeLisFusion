
// Modules
const express = require('express');
const router = express();

booksRoute = require('./booksRoute');

//Call for book route
router.use('/book', booksRoute);

console.log('Dans le main router');
module.exports = router;
