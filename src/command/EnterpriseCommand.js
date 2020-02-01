const mysql = require("./../data/mysql")
const BaseCommand = require('./BaseCommand');

class EnterpriseCommand extends BaseCommand {

    constructor() {
        super();
    }

    getById(id) {
        try {

            mysql.executeQuery(`SELECT * FROM enterprises where id = "${id}"`, result => {
                return result;
            })

            
        } catch (ex) {
            return this.handleException(ex)
        }
    }

    getFilter(enterprise_types, name){
        try {

            mysql.executeQuery(`SELECT * FROM enterprises WHERE type = "${enterprise_types}" and name = "${name}"`, result => {
                return result;
            })
        } catch (ex) {
            return this.handleException(ex)
        }
    }

}

module.exports = EnterpriseCommand