const router = require('express').Router();

const reviews = require('../controllers/reviews');

router.get('/users', reviews.getAll);
router.get('/users/:rid', reviews.getById);
router.post('/users', reviews.new);
router.put('/users/:rid', reviews.edit);
router.delete('/users/:rid', reviews.delete);

module.exports = router;
