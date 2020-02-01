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
                authorization
            } = req.headers;

            if (!authorization) {
                return resp
                    .status(UNAUTHORIZED.code)
                    .send(UNAUTHORIZED.json);
            }

            const token = authorization.split(' ')[1]

            if (!authorization.match(/Bearer /)) {
                sentryPayload.message = 'AuthMiddleware Step 2'
                Sentry.captureEvent(sentryPayload);

                return resp
                    .status(UNAUTHORIZED.code)
                    .send(UNAUTHORIZED.json);
            }

            const tokenDecoded = Jwt.verify(token, PRIVATE_KEY);


            if (!roles.includes(tokenDecoded.type)) {
                return resp
                    .status(FORBIDDEN.code)
                    .send(FORBIDDEN.json);
            }

        } catch (ex) {

            if (
                ex.name == 'TokenExpiredError' ||
                ex.name == 'JsonWebTokenError'
            ) {
                return resp
                    .status(UNAUTHORIZED.code)
                    .send(UNAUTHORIZED.json);
            }

            return resp.status(500).send({
                ex: `${ex.message}\n ${ex.stack}`
            });
        }
    }
}



module.exports = AuthMiddleware;
