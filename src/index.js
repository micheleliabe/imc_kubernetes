require('newrelic');
const logger = require('new-relic-logs')


require("dotenv").config();
const moment = require("moment");
const path = require("path");
const express = require("express");
const app = express();
const ejs = require("ejs");
const morgan = require('morgan')
const mongoose = require('mongoose');

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve('public')));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");  

  
//Tenta conectar com o banco de dados, se conseguir emite um sinal
mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.emit('pronto');
  })
  .catch(e => logger.info(e));

const routes = require("./routes");
app.use(routes);
app.on('pronto', () => {
  app.listen(process.env.PORT, () => {
    console.log("App listen on port: ", process.env.PORT);
  });
});