const express = require("express");
const routesApi = require('./routes/api')
const cors = require('cors');
const { initDB } = require('./models/index.js')
const port = 8082;

const app = express();
app.use(express.json());
app.use(cors());
app.use(routesApi);

app.listen(port, function () {
    initDB();
});

