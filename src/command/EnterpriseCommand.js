const Mysql = require("./../data/mysql")
const BaseCommand = require('./BaseCommand');

class EnterpriseCommand extends BaseCommand {

    constructor() {
        super();
        const mysql = new Mysql();
        this.knexConn = mysql.connect();
    }

    getById(id) {
        try {
            const query = {
                id
            }
            return this.knexConn.where(query).select().table('enterprises')
            
        } catch (ex) {
            return this.handleException(ex)
        }
    }

    getFilter(enterprise_types, name){
        try {

            const query = {}

            if(enterprise_types)
                query.type = enterprise_types

            return this.knexConn.where(query).andWhere('name', 'like', `%${name}%`).select().table('enterprises')

        } catch (ex) {
            return this.handleException(ex)
        }
    }

}

module.exports = EnterpriseCommand