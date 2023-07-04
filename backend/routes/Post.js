const express = require('express');
const post = require('../controllers/Post');
const {uploadPost} = require('../middleware/PostConfig');

const route = express.Router();

route.post('/post/:id',uploadPost.single('userPost'), post.postData);

module.exports = route;