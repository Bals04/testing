const express = require('express');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
const gymroutes = require('./routes/gymroute');
const PORT = process.env.PORT || 3000;

app.use('/', gymroutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
