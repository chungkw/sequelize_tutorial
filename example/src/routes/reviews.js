const router = require('express').Router();

const reviews = require('../controllers/reviews');

router.get('/reviews', reviews.getAll);
router.get('/reviews/:rid', reviews.getById);
router.post('/reviews', reviews.new);
router.put('/reviews/:rid', reviews.edit);
router.delete('/reviews/:rid', reviews.delete);

module.exports = router;
