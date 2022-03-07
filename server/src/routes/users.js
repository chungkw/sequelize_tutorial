const router = require('express').Router();

const users = require('../controllers/users');

router.get('/users', users.getAll);
router.get('/users/:uid', users.getById);
router.post('/users', users.new);
router.put('/users/:uid', users.edit);
router.delete('/users/:uid', users.delete);

router.put('/restore/users/:uid', users.restore);
router.delete('/stupid/users/:uid', users.stupidDelete);

module.exports = router;
