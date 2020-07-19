
const Router = require('express').Router();
const Db = require('../config/db');
const connection = new Db()._connect();

const Register = require('../models/register');
const register = new Register(connection);

var verify = require('./verifytoken');


Router.post('/regiscode', verify, (req, res) => {
    register._regiscode(req, (data) => {
        res.json(data);
    });
});

module.exports = Router;