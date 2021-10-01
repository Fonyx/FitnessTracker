const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const controllers = require('./controllers');
const Logger = require("./libs/logger");
const configuredMorgan = require("./config/morgan");
const mongoose = require('mongoose');
const hbs = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 28017;
const db_url = process.env.MONGODB_URL;

// setup handlebars
app.engine('hbs', hbs({layoutsDir: __dirname + '/views/layouts', extname: 'hbs'}));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// must tell app to use morgan middleware before importing the controllers
app.use(configuredMorgan);
// use me once the app knows to use morgan on controllers
app.use(controllers);

// DATABASE CONNECTION
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(db_url, connectionParams)
.then(() => {
    Logger.info(`Connected to database @ FirstTracker.uvvp5.mongodb.net`);
    app.listen(PORT, () => {
        Logger.info('Server is running http://localhost:'+PORT);
    });
})
.catch( (err) => {
    Logger.error(`Error connecting to the database. \n${err}`);
})


