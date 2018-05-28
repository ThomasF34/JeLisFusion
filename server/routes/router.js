
// Modules
const express = require('express');
const router = express();

booksRoute = require('./bookRoute');
userRoute = require('./userRoute');
categoryRoute = require('./categoryRoute');
publisherRoute = require('./publisherRoute');
workshopRoute = require('./workshopRoute');

//Call for book route
router.use('/book', booksRoute);
router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/publisher', publisherRoute);
router.use('/workshop', workshopRoute);

module.exports = router;
