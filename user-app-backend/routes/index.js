const { getUsers, mockUserlist } = require('../controllers/user.controller');

const express = require('express'),
    routes = express.Router();

routes.get('/users', getUsers);
routes.post('/users', mockUserlist);
// routes.get('/users', verifyToken, userList);

module.exports = routes