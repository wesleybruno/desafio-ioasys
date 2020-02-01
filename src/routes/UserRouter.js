const express = require('express');

const validate = require('express-validation') 

const auth = require('./../middlewares/Auth')

const UserController = require('./../controllers/UserController')

class UserRouter {

    static configure() {
        const router = express.Router();
        const controller = new UserController();

        router.post(`/auth/sign_in`,
            // validate(controller.signIn.schema),
            // auth(controller.signIn.auth),
            controller.signIn.fn);

        //#endregion
        return router;
    }
}

module.exports = UserRouter;