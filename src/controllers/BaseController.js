class BaseController {

    OkOnlyData(resp, data) {
        resp.status(200).send(data)
    }

    Ok(resp, data) {
        resp.status(200).send({
            r: true,
            data: data
        })
    }

    Fail(resp, errors) {
        resp.status(200).send({
            r: false,
            errors: errors
        })
    }

    BadRequest(resp, errors) {

        resp.status(400).send({
            r: false,
            errors: errors
        })
    }

    ServerError(resp, ex) {
        console.error(ex.toString())
        const message = typeof ex == 'string' ? ex : `${ex.message}\n ${ex.stack}`

        console.error(ex);

        resp.status(500).send({
            ex: message
        })

    }
}

module.exports = BaseController