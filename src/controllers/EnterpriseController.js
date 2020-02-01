const EnterpriseCommnad = require('../command/EnterpriseCommand');
const BaseController = require('./BaseController');
const Joi = require('joi')

class EnterpriseController extends BaseController {

    get getById() {
        return {
            auth: {
                roles: ["USUARIO"],
                config: {}
            },
            schema: {
                params: {
                    id: Joi.number().required()
                }
            },
            fn: async (req, resp) => {
                try {
                    const command = new EnterpriseCommnad();

                    const { id } = req.params

                    const result = await command.getById(id);

                    if (command.isValid())
                        return this.Ok(resp, result);
                    else
                        return this.Fail(resp, command.errors);
                } catch (ex) {
                    return this.ServerError(resp, ex);
                }
            }
        }
    }

    get getFilter() {
        return {
            auth: {
                roles: ["USUARIO"],
                config: {}
            },
            schema: {
                query: {
                    enterprise_types: Joi.string().required(),
                    name: Joi.string().required()
                }
            },
            fn: async (req, resp) => {
                try {
                    const command = new EnterpriseCommnad();

                    const {
                        enterprise_types,
                        name
                    } = req.params

                    const result = await command.getFilter(enterprise_types, name);

                    if (command.isValid())
                        return this.Ok(resp, result);
                    else
                        return this.Fail(resp, command.errors);
                } catch (ex) {
                    return this.ServerError(resp, ex);
                }
            }
        }
    }

}

module.exports = EnterpriseController