const router = require('express').Router();

const stories = require('../controllers/stories');

router.get('/stories', stories.getAll);
router.get('/stories/:sid', stories.getById);
router.post('/stories', stories.new);
router.put('/stories/:sid', stories.edit);
router.delete('/stories/:sid', stories.delete);

module.exports = router;
