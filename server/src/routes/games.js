const router = require('express').Router();

const games = require('../controllers/games');

router.get('/games', games.getAll);
router.get('/games/:gid', games.getById);
router.post('/games', games.new);
router.put('/games/:gid', games.edit);
router.delete('/games/:gid', games.delete);

module.exports = router;
