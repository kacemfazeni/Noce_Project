const express = require('express');
const PostController = require('../Controller/post');
const router = express.Router();
router.get('/', PostController.findAll);
router.get('/:id', PostController.findOne);
router.post('/', PostController.create);
router.patch('/:id', PostController.update);
router.delete('/:id', PostController.destroy);
module.exports = router ;