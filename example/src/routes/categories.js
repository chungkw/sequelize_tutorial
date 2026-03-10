const router = require('express').Router();

const categories = require('../controllers/categories');

router.get('/categories', categories.getAll);
router.get('/categories/:cid', categories.getById);
router.post('/categories', categories.new);
router.put('/categories/:cid', categories.edit);
router.delete('/categories/:cid', categories.delete);

module.exports = router;
