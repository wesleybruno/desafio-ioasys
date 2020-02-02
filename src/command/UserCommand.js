const Mysql = require("./../data/mysql")
const BaseCommand = require('./BaseCommand');

class UsuarioCommand extends BaseCommand {

    constructor() {
        super();
        const mysql = new Mysql();
        this.knexConn = mysql.connect();
    }

    async signIn(email, password) {
        try {

            const query = {
                email, 
                password
            }

            const results = await this.knexConn.where(query).select().table('user')
            return JSON.parse(JSON.stringify(results))[0]
            
        } catch (ex) {
            return this.handleException(ex)
        }
    }

}

module.exports = UsuarioCommand