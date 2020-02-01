const mysql = require('mysql');
var knex = require('knex');



class Mysql {

    connect() {
        try {
            const connection  = knex({
            client: 'mysql',
            connection: {
                host : process.env.MY_SQL_HOST,
                user : process.env.MY_SQL_USER,
                password : process.env.MY_SQL_PASSWORD,
                database : process.env.MY_SQL_DATABASE
            },
            pool: { min: 0, max: 20 }
            });

            return connection

        } catch (ex) {
            console.error(ex.toString())
            throw ex

        }
    }
}

module.exports = Mysql;