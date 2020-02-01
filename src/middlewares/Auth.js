const UNAUTHORIZED = {
    code: 401,
    json: {
        r: false,
        errors: ['401 - UNAUTHORIZED']
    }
}
const FORBIDDEN = {
    code: 403,
    json: {
        r: false,
        errors: ['403 - FORBIDDEN']
    }
}

const AuthMiddleware = (authConfig) => {
    const {
        roles,
        config = {}
    } = authConfig;
    return async (req, resp, next) => {
        try {
            if (!roles) return next();
            if (roles.length == 0) return next();
            
            const {
                client,
                uid
            } = req.headers;

            const accessToken = req.headers["access-token"];

            if (!client ||
                !accessToken ||
                !uid) {
                return resp
                    .status(UNAUTHORIZED.code)
                    .send(UNAUTHORIZED.json);
            }

            next()

            
        } catch (ex) {
            return resp.status(500).send({
                ex: `${ex.message}\n ${ex.stack}`
            });
        }
    }
}



module.exports = AuthMiddleware;
