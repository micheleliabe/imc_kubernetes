
# IMC - Kubernetes App

Calculadora de IMC feita para ser utilizada em Labs de Kubernetes e Docker


## Demonstração

Acesse o link para ver uma demonstração
http://imc.micheldias.com/

![alt text](https://github.com/micheleliabe/imc_kubernetes/blob/master/calculadoraIMC.gif?raw=true)

## Documentação da API

#### Realiza o calculo

```http
  GET /calculo
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome da pessoa |
| `altura` | `float` | **Obrigatório**. Tamanho da pessoa |
| `peso` | `float` | **Obrigatório**. Peso da pessoa |

#### Lista as ultimas verificações

```http
  GET /list
```

#### Verificação de integridade

```http
  GET /healthz
```


## Autores

- [@micheleliabe](https://www.github.com/micheleliabe)


## Instalação

Esta aplicação pode ser monitorada utilizando o NewRelic. Crie uma conta em https://newrelic.com/

---

Utilizamos o MongoDB para salvar o histórico de consultas. Sugiro que crie um cluster no MongoDB ATLAS 
https://www.mongodb.com/atlas/database

---


Clone o repositório

```bash
git clone -b master git@github.com:micheleliabe/imc_kubernetes.git
```

Crie o arquivo .env na raiz do projeto com as variáveis de ambiente abaixo:


```bash
PORT=3000
ENVIRONMENT=development
NEW_RELIC_LICENSE_KEY= INFORME a LICENSE_KEY do NEW RELIC
NEW_RELIC_APP_NAME= INFORME O NOME QUE DESEJA VISUALIZAR NO NEW_RELIC
CONNECTIONSTRING= INFORME A CONNECTIONSTRING DO MONGODB ATLAS
```

Crie o ambiente com o docker compose

```bash
docker compose up
```