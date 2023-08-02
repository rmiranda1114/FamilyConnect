const express = require('express');
const app = express();
require('./startup/routes.js')(app);
require('./startup/db.js')();
require('dotenv').config();
require('./startup/prod.js')(app);
const PORT = process.env.PORT || 6001;


app.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`)
})

