const mysql = require("./../data/mysql")
const BaseCommand = require('./BaseCommand');

class UsuarioCommand extends BaseCommand {

    constructor() {
        super();
    }

    signIn(email, password) {
        try {

            mysql.executeQuery(`SELECT * FROM user WHERE email = "${email}" and password = "${password}"`, result => {
                return result;
            })
            
        } catch (ex) {
            return this.handleException(ex)
        }
    }

}

module.exports = UsuarioCommand