const router = require('express').Router();

const games = require('../controllers/games');

router.get('/users', games.getAll);
router.get('/users/:gid', games.getById);
router.post('/users', games.new);
router.put('/users/:gid', games.edit);
router.delete('/users/:gid', games.delete);

module.exports = router;
