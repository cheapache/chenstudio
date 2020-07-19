const Router = require('express').Router();
const Db = require('../config/db');
const connection = new Db()._connect();

const Authen = require('../models/authen');
const authen = new Authen(connection);

Router.post('/register', (req, res) => {

    authen._register(req, (data) => {
        if (data){
            res.json({ status: 'successfully', message: 'user created.' });
        }
        else{
            res.json({ status: 'failed', message: 'user not created.' });
        }
    });

});

Router.post('/login', (req, res) => {
    
    authen._login(req, (data) => {
        if (data){
            authen._savelog({ userid: data.data[0].userid, action: 'login' }, (result) => {
                if (result){
                    res.header('authen-token', data.data[0].token);
                    res.json(data);
                }
            });
        }
        else{
            res.json(data);
        }
    });

    //res.json(req);
});

Router.post('/logout', (req, res) => {

    authen._savelog({ userid: req.body.userid, action: 'logout' }, (result) => {
        if (result){
            res.header('authen-token', null);
            res.status(400).json({ status: 'logout successfully', message: 'See you.'});
        }
    });

});

module.exports = Router;