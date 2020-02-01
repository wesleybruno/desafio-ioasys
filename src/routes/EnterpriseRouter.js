const express = require('express');
const EnterpriseController = require('../controllers/EnterpriseController')
const validate = require('express-validation')

const auth = require('./../middlewares/Auth')

class EnterpriseRouter {
    static configure() {
        const router = express.Router();
        const enterpriseController = new EnterpriseController();

        router.get(`/`,
            validate(enterpriseController.getFilter.schema),
            auth(enterpriseController.getFilter.auth),
            enterpriseController.getFilter.fn);
        
        router.get(`/:id`,
            validate(enterpriseController.getById.schema),
            auth(enterpriseController.getById.auth),
            enterpriseController.getById.fn);

        //#endregion
        return router;
    }
}

module.exports = EnterpriseRouter;