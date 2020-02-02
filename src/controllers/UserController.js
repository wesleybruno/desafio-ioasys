const UserCommnad = require('../command/UserCommand');
const BaseController = require('./BaseController');
const Joi = require('joi')

class UserController extends BaseController {
    get signIn() {
        return {
            auth: {
                roles: [],
                config: {}
            },
            schema: {
                body: {
                    email: Joi.string().required(),
                    password: Joi.string().required()
                }
            },
            fn: async (req, resp) => {
                try {
                    const command = new UserCommnad();

                    const { 
                        email, password
                    } = req.body

                    const result = await command.signIn(email, password);

                    if (command.isValid())
                        return this.OkWithHeaders(resp, result);
                    else
                        return this.Fail(resp, command.errors);
                } catch (ex) {
                    return this.ServerError(resp, ex);
                }
            }
        }
    }
}

module.exports = UserController