var time = require('time');

class Resgister{
    constructor(connection){
        this.conn = connection;
        this.tb_transection = 'tb_transection';
        this.tb_code = 'tb_code';
        this.tb_user = 'tb_user';
    }

    _regiscode(req, cb){
        const conn = this.conn;
        const tb_transection = this.tb_transection;
        const tb_code = this.tb_code;
        const tb_user = this.tb_user;
        var _serialcode;
        var _type;
        var _point;

        var sqlcode = "SELECT serialcode, flaguse, type, userid, point, extra_point, startdate, enddate FROM " 
        + this.tb_code + " WHERE serialcode = '" + req.body.serialcode + "';";

        conn.query(sqlcode, function(e, rows){
            //conn.end();
            if (!e){
                if (rows.length > 0){
                    _serialcode = rows[0].serialcode;
                    _type = rows[0].type;
                    _point = rows[0].point;
    
                    if (rows[0].type == 'S'){ // code spacial type S
    
                        if (rows[0].flaguse == 'N'){
    
                            var sqltransection = "INSERT INTO " + tb_transection + " (serialcode, userid, type, point, tstmp) VALUES ('" 
                            + rows[0].serialcode + "', " 
                            + req.body.userid + ", '" 
                            + _type + "', " 
                            + _point + ", NOW());";
        
                            conn.query(sqltransection, function(e, rows){
                                //conn.end();
                                if (!e){
    
                                    var sqlupdate = "UPDATE " + tb_code + " SET flaguse = 'Y', userid = " 
                                    + req.body.userid + " WHERE serialcode = '" 
                                    + _serialcode + "';";
    
                                    conn.query(sqlupdate, function(e, rows){
                                        //conn.end();
                                        if (!e){
    
                                            var sql = "SELECT A.serialcode, A.userid, B.username, A.type, A.point FROM " + tb_transection 
                                            + " A LEFT JOIN " 
                                            + tb_user + " B ON A.userid = B.id WHERE A.userid = " 
                                            + req.body.userid + " AND A.serialcode = '" 
                                            + _serialcode + "';";
    
                                            conn.query(sql, function(e, rows,){
                                                //conn.end();
                                                if (!e){
                                                    cb({ status: 'Register Successfully', message: 'You give ' + rows[0].point});
                                                }
                                                else{
                                                    cb(e);
                                                }
                                            });
    
                                        }
                                        else{
                                            cb(e);
                                        }
                                    });
                                }
                                else{
                                    cb(e);
                                }
                            });
                        }
                        else{
    
                            var sqlsearch_transection = "SELECT * FROM " + tb_transection + " WHERE serialcode = '" 
                            + rows[0.].serialcode + "' AND userid = "
                            + req.body.userid + ";";
    
                            conn.query(sqlsearch_transection, function(e, rows){
                                //conn.end();
                                if (!e){
                                    if (rows.length > 0){
                                        cb({ status: 'register failed', message: 'code is duplicate' });
                                    }
                                    else{
    
                                        var sqltransection = "INSERT INTO " + tb_transection + " (serialcode, userid, type, point, tstmp) VALUES ('" 
                                        + _serialcode + "', " 
                                        + req.body.userid + ", '" 
                                        + _type + "', " 
                                        + _point + ", NOW());";
    
                                        conn.query(sqltransection, function(e, rows){
                                            //conn.end();
                                            if (!e){
                                                var sql = "SELECT A.serialcode, A.userid, B.username, A.type, A.point FROM " + tb_transection 
                                                + " A LEFT JOIN " 
                                                + tb_user + " B ON A.userid = B.id WHERE A.userid = " 
                                                + req.body.userid + " AND A.serialcode = '" 
                                                + _serialcode + "';";
        
                                                conn.query(sql, function(e, rows,){
                                                    //conn.end();
                                                    if (!e){
                                                        cb({ status: 'Register Successfully', message: 'You give ' + rows[0].point});
                                                    }
                                                    else{
                                                        cb(e);
                                                    }
                                                });
                                            }
                                            else{
                                                cb(e);
                                            }
    
                                        });
                                    }
                                }
                                else{
                                    cb(e);
                                }
                            });
                        }
    
                    }
                    else{ // code standard type N
    
                        if (rows[0].flaguse == 'N'){
    
                            var extrapoint = 0;
    
                            var datenow = new time.Date();
                            datenow.setTimezone('Asia/Bangkok');
                        
                            if (datenow >= rows[0].startdate && datenow <= rows[0].enddate){
                                extrapoint = rows[0].point + rows[0].extra_point;
                            }
                            else{
                                extrapoint = rows[0].point;
                            }
    
                            var sqltransection = "INSERT INTO " + tb_transection + " (serialcode, userid, type, point, tstmp) VALUES ('" 
                            + rows[0].serialcode + "', " 
                            + req.body.userid + ", '" 
                            + rows[0].type + "', " 
                            + extrapoint + ", NOW());";
    
                            conn.query(sqltransection, function(e, rows){
                                //conn.end();
                                if (!e){
    
                                    var sqlupdate = "UPDATE " + tb_code + " SET flaguse = 'Y', userid = " 
                                    + req.body.userid + " WHERE serialcode = '" 
                                    + _serialcode + "';";
    
                                    conn.query(sqlupdate, function(e, rows){
                                        //conn.end();
                                        if (!e){
    
                                            var sql = "SELECT A.serialcode, A.userid, B.username, A.type, A.point FROM " + tb_transection 
                                            + " A LEFT JOIN " 
                                            + tb_user + " B ON A.userid = B.id WHERE A.userid = " 
                                            + req.body.userid + " AND A.serialcode = '" 
                                            + _serialcode + "';";
    
                                            conn.query(sql, function(e, rows,){
                                                //conn.end();
                                                if (!e){
                                                    cb({ status: 'Register Successfully', message: 'You give ' + rows[0].point});
                                                }
                                                else{
                                                    cb(e);
                                                }

                                            });
                                        }
                                        else{
                                            cb(e);
                                        }

                                    });
                                }
                                else{
                                    cb(e)
                                }

                            });
                        }
                        else{ //code is used
                            cb({ status: 'register failed', message: 'code is duplicate' });
                        }
                    }

                }
                else{
                    cb({ status: 'register failed', message: 'Your code invalid.'});
                }

            }
            else{
                cb(e);
            }

       });

    }   
}

module.exports=Resgister; 