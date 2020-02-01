const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const userRouter = require('./src/routes/UserRouter');
const enterpriseRouter = require('./src/routes/EnterpriseRouter');

require('dotenv').config()

app.use(cors());

app.use([
    bodyParser.json({
        limit: '10mb'
    }),
    bodyParser.urlencoded({
        extended: false
    })
]);

app.use('/api/v2/users', userRouter.configure());
app.use('/api/v2/enterprises', enterpriseRouter.configure());

const port = process.env.PORT || '3000';

app.use('/service-status', (req, resp, next) => {
    return resp.status(200).send({
        r: true,
        data: { message: 'Servico Rodando!', version: pjson.version }
    })
});

app.use((req, resp, next) => {
    return resp.status(404).send({
        r: false,
        errors: ['404 - Not Found']
    });
});

app.use((err, req, resp, next) => {
    return resp.status(400).send(err);
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})