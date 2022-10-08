const express = require("express");
const route = express.Router();
const moment = require("moment");
const Pessoa = require("./models/pessoa.model")
const logger = require('new-relic-logs')


//Página inicial
route.get("/", (req, res) => {
  res.render("index");
});

//Verificação de integridade do Kubernetes
route.get("/healthz", (req, res) => {
  logger.info("Requisição em /healthz");
  res.status(200).send({
    status: 200,
    message: "success",
    time: moment().format(),
  });
});

//Rota que realiza o calculo
route.get("/calculo", async (req, res) => {
  logger.info("Requisição em /calc");
  let resultado = parseFloat((req.query.peso / (req.query.altura * req.query.altura)).toFixed(1))
  const pessoa = new Pessoa(  {nome: req.query.nome, peso: req.query.peso, altura: req.query.altura, imc: resultado})
  const response = await pessoa.register()
  logger.info("Novo registro adicionado: ", JSON.stringify({nome: req.query.nome, peso: req.query.peso, altura: req.query.altura, imc: resultado}))
  res.status(200).send({
    status: 200,
    message: resultado,
    time: moment().format(),
  });
});

//Rota para obter o historico de verificações no banco de dados
route.get("/list", async (req, res) => {
  const pessoa = new Pessoa()
  const response = await pessoa.list()
  logger.info("Requisição realizada em /list ", JSON.stringify(response))
  res.status(200).send({
    status: 200,
    message: response,
    time: moment().format(),
  });
});


route.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

module.exports = route;
