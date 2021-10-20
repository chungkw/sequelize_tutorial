const router = require('express').Router();

const categories = require('../controllers/categories');

router.get('/users', categories.getAll);
router.get('/users/:cid', categories.getById);
router.post('/users', categories.new);
router.put('/users/:cid', categories.edit);
router.delete('/users/:cid', categories.delete);

module.exports = router;
