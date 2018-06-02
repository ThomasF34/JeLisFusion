
// Modules
const express = require('express');
const router = express();

booksRoute = require('./bookRoute');
userRoute = require('./userRoute');
categoryRoute = require('./categoryRoute');
publisherRoute = require('./publisherRoute');
workshopRoute = require('./workshopRoute');
participateRoute = require('./participateRoute');
authorRoute = require('./authorRoute');

//Call for book route
router.use('/book', booksRoute);
router.use('/author', authorRoute);
router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/publisher', publisherRoute);
router.use('/workshop', workshopRoute);
router.use('/participate', participateRoute);

module.exports = router;
