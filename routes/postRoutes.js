const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/posts', postController.getPosts);
router.post('/posts', postController.addPost);
router.get('/posts/edit/:id', postController.editPost);
router.post('/posts/edit/:id', postController.updatePost);
router.post('/posts/delete/:id', postController.deletePost);

module.exports = router;
