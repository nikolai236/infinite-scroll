const router = require('express').Router()

const imageController = require('../controllers/imageController')

router.get('/file/:filename', imageController.getSingleImage);
router.get('/page/:num', imageController.getPage);
router.delete('/:name', imageController.deleteImage);

module.exports = router;
