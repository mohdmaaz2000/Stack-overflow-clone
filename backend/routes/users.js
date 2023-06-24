const express = require('express')

const route = express.Router();

const auth = require('../controllers/auth');
const users = require('../controllers/fetchUsers');

route.post('/signup',auth.signup);
route.post('/login',auth.login);

route.get('/allUsers',users.fetchAllUsers);
route.patch('/updateUser/:id',users.updateUser);

module.exports = route