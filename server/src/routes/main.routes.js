const router = require('express').Router();

const { errorHandler } = require('../middlewares/errorHandler');

const users = require('./users.routes');
const stories = require('./stories.routes');

const games = require('./games.routes');
const categories = require('./categories.routes');
const reviews = require('./reviews.routes');

router.use(users);
router.use(stories);

router.use(games);
router.use(categories);
router.use(reviews);

router.use(errorHandler);

module.exports = router;
