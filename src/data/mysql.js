const mysql = require('mysql');

class Mysql {

    async connect() {
        try {
            const connection = mysql.createConnection({
                host: process.env.MY_SQL_HOST,
                port: process.env.MY_SQL_PORT,
                user: process.env.MY_SQL_USER,
                password: process.env.MY_SQL_PASSWORD,
                database: process.env.MY_SQL_DATABASE
            })
            return connection
        } catch (ex) {
            console.error(ex.toString())
            throw ex

        }
    }

    static async executeQuery(sqlQry, cb) {

        const mysql = new Mysql()

        const connection = await mysql.connect();

        connection.query(sqlQry, (error, results, fields) => {
            if (error)
                console.error(error);
            else {
                console.log('executou!');
                connection.end();  
                cb(JSON.stringify(results))
                //return results
            }
        });

    }

    static closeConnection(conn) {
        try {
            conn.close();
        } catch (ex) {
            console.error(ex.toString())
        }
    }
}

module.exports = Mysql;