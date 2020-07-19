var mysql = require('mysql');

class Db {
    constructor(){
        this.conn;
    }

    _connect(){

        this.conn = mysql.createPool({
            connectionLimit: 100,
            host: 'localhost',
            user: 'sa',
            password: '9xAl54Tn',
            database: 'homework_pmh',
            debug: false
        });

        return this.conn;

    }
}

module.exports=Db;





