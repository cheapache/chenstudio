const jwt = require('jsonwebtoken');

class Authen{
    constructor(connection){
        this.conn = connection;
        this.tb_user = 'tb_user';
        this.tb_log = 'tb_userlog';
    }

    _register(req, cb){

        var sql = "INSERT INTO " + this.tb_user 
        + " (username, password, flag, created) VALUES ('" 
        + req.body.username + "', '" 
        + req.body.password + "', 'Y', NOW());";

        this.conn.query(sql, function(e, rows){
            if (!e){
                cb(true);
            }
            else{
                cb(false);
            }
        });
    }

    _login(req, cb){

        var conn = this.conn;
        var tb_user = this.tb_user;

        var sql = "SELECT * FROM " 
        + tb_user + " WHERE username = '" 
        + req.body.username + "';";

        //console.log(sql);
        conn.query(sql, function(e, rows){
            if (!e){
                if (rows.length > 0){
                    var sqlpwd = "SELECT * FROM " 
                    + tb_user + " WHERE username = '" 
                    + req.body.username + "' AND password = '" 
                    + req.body.password + "';";

                    conn.query(sqlpwd, function(e, rows){
                        if (!e){
                            if (rows.length > 0){

                                var params = {
                                    userid: rows[0].id,
                                    username: rows[0].username,
                                    tstmp: new Date()
                                }

                                const token = jwt.sign(params, '9xGl54Tn');

                                cb({ 
                                    status: 'login successfully',
                                    message: 'Logged in!',
                                    data: [{
                                        userid: rows[0].id,
                                        token: token
                                    }]
                                });

                            }
                            else{
                                cb({ status: 'login failed', message: 'Password is wrong, Please try agian' });
                            }
                        }
                        else{
                            throw(e);
                        }
                    });

                }
                else{
                    cb({ status: 'login failed', message: 'Username is wrong' });
                }

            }   
            else{
                cb(e);
            }
        });
    }

    _savelog(req, cb){

        var sql = "INSERT INTO " + this.tb_log + " (userid, action, tstmp) VALUES (" 
        + req.userid + ", '"
        + req.action + "', NOW());";
        
        this.conn.query(sql, function(e, rows){
            if (!e){
                cb(true);
            }
            else{
                cb(false);
            }
        });

    }
}

module.exports=Authen;

