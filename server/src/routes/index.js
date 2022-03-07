const router = require('express').Router();

const { errorHandler } = require('../middlewares/errorHandler');

const users = require('./users');
const stories = require('./stories');

const games = require('./games');
const categories = require('./categories');
const reviews = require('./reviews');

router.use(users);
router.use(stories);

router.use(games);
router.use(categories);
router.use(reviews);

router.use(errorHandler);

module.exports = router;
