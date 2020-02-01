const Mysql = require("./../data/mysql")
const BaseCommand = require('./BaseCommand');

class UsuarioCommand extends BaseCommand {

    constructor() {
        super();
        const mysql = new Mysql();
        this.knexConn = mysql.connect();
    }

    signIn(email, password) {
        try {

            const query = {
                email, 
                password
            }

            const usuario = this.knexConn.where(query).select().table('user')
            
            return usuario
            
        } catch (ex) {
            return this.handleException(ex)
        }
    }

}

module.exports = UsuarioCommand