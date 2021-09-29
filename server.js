const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const compression = require('compression');
const controllers = require('./controllers');
const Logger = require("./libs/logger");
const configuredMorgan = require("./config/morgan");
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 27017;


app.use(compression());
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
mongoose.connect(process.env.MONGO_DB_URL, connectionParams)
    .then( () => {
        console.log('Connected to database ');
        app.listen(PORT, () => {
          // tslint:disable-next-line:no-console
          console.log('Server is running http://localhost:'+PORT);
          Logger.error("This is an error log");
          Logger.warn("This is a warn log");
          Logger.info("This is a info log");
          Logger.http("This is a http log");
          Logger.debug("This is a debug log");
        });
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


