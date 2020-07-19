class Report{
    constructor(connection){
        this.conn = connection;
        this.tb_transection = 'tb_transection'; 
        this.tb_code = 'tb_code';
        this.tb_user = 'tb_user';
    }

    _select(req, cb){

        var sql = "SELECT A.id, A.serialcode, A.userid, B.username, A.type, A.point, DATE_FORMAT(A.tstmp, '%d/%m/%Y %H:%i') as tstmp FROM " + this.tb_transection  
        + " A LEFT JOIN " 
        + this.tb_user + " B ON A.userid = B.id ORDER BY A.tstmp DESC;";
        
        this.conn.query(sql, function(e, rows){
            if (!e){
                cb(rows);
            }
            else{
                cb(e);
            }
        });
    }

    _select_single(req, cb){

        var sql = "SELECT A.id, A.serialcode, A.userid, B.username, A.type, A.point, DATE_FORMAT(A.tstmp, '%d/%m/%Y %H:%i') as tstmp  FROM " + this.tb_transection  
        + " A LEFT JOIN " + this.tb_user 
        + " B ON A.userid = B.id WHERE B.username LIKE '%" 
        + req.body.search + "%' OR A.serialcode LIKE'%" 
        + req.body.search + "%' ORDER BY A.tstmp DESC;";

        this.conn.query(sql, function(e, rows){
            if (!e){
                cb(rows);
            }
            else{
                cb(e);
            }
        });

    }

    _reset(req, cb){

        var tb_code = this.tb_code;
        var conn = this.conn;

        var sql_delete = "DELETE FROM " 
        + this.tb_transection + " WHERE id = " 
        + req.body.id + ";";

        conn.query(sql_delete, function(e, rows){
            if (!e){
                
                var sql_update = "UPDATE " 
                + tb_code + " SET flaguse = 'N', userid = 0 WHERE serialcode = '" 
                + req.body.serialcode + "';";

                console.log(sql_update);

                conn.query(sql_update, function(e, rows){
                    if(!e){
                        cb({ status: 'successfully', message: 'reset code successfully'});
                    }
                    else{
                        cb({ status: 'failed', message: 'reset code failed'});
                    }
                });
            }
            else{
                cb(e);
            }
        });
    }

    _select_code(req, cb){

        var tb_code = this.tb_code;
        var conn = this.conn;

        var sql = "SELECT serialcode, flag, flaguse, type, point, extra_point, DATE_FORMAT(startdate, '%d/%m/%Y %H:%i') as startdate, DATE_FORMAT(enddate, '%d/%m/%Y %H:%i') as enddate FROM " 
        + tb_code + ";";

        conn.query(sql, function(e, rows){
            if (!e){
                cb(rows);
            }
            else{
                cb(e);
            }
        });
    }

    _search_code(req, cb){

        var tb_code = this.tb_code;
        var conn = this.conn;

        var sql = "SELECT serialcode, flag, flaguse, type, point, extra_point, DATE_FORMAT(startdate, '%d/%m/%Y %H:%i') as startdate, DATE_FORMAT(enddate, '%d/%m/%Y %H:%i') as enddate FROM " 
        + tb_code + " WHERE serialcode LIKE '%" + req.body.search + "%';";

        conn.query(sql, function(e, rows){
            if (!e){
                cb(rows);
            }
            else{
                cb(e);
            }
        });
    }
}

module.exports=Report;