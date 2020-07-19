const Router = require('express').Router();
const Db = require('../config/db');
const connection = new Db()._connect();

const Report = require('../models/report'); 
const report = new Report(connection);

var verify = require('./verifytoken');

Router.post('/select', (req, res) => {
    report._select(req, (data) => {
        res.json(data);
    });
});

Router.post('/select_single', (req, res) => {
    report._select_single(req, (data) => {
        res.json(data);
    });
});

Router.post('/reset', (req, res) => {
    report._reset(req, (data) => {
        res.json(data);
    });
});

Router.post('/select_code', (req, res) => {
    report._select_code(req, (data) => {
        res.json(data);
    });
});

Router.post('/search_code', (req, res) => {
    report._search_code(req, (data) => {
        res.json(data);
    });
});




module.exports = Router;