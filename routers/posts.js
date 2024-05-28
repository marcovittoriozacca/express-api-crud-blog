const express = require('express');
const router = express.Router();
//posts controller
const posts = require('../controllers/posts.js');

const {deletePostCheck} = require('../middlewares/deletePostCheck.js');

//default route for posts
router.get('/', posts.index);

//show route to get the single element
router.get('/:slug', posts.show);

//create route - at the moment its just displays an h1
router.post('/', posts.create);

//download route to download the single post image
router.get('/:slug/download', posts.download);

//destroy route to delete a given post
router.delete('/:slug', deletePostCheck, posts.destroy);


module.exports = router;