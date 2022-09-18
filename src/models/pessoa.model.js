const mongoose = require('mongoose')
const logger = require('new-relic-logs')
const pessoaSchema = mongoose.Schema({
    nome: {
        type: 'string',
        required: true
    },
    altura: {
        type: 'string',
        required: true
    },
    peso: {
        type: 'string',
        required: true
    },
    peso: {
      type: 'string',
      required: true
    },
    imc: {
      type: 'number',
      required: true
    },
})

const PessoaModel = mongoose.model('Pessoa', pessoaSchema)

class Pessoa {
  constructor(body) {
      this.body = body
  }

  async register() {
      try {
          this.pessoa = await PessoaModel.create(this.body)
          logger.info('Novo registro adicionado')
      } catch (e) {
          logger.error('Falha ao criar registro')
      }
  }

  // async update() {
  //     try {
  //         const filter = this.body.user_id
  //         const update = this.body.user_data
  //         this.user = await UsuarioModel.findByIdAndUpdate(filter,update,{
  //             new : true
  //         })
  //         console.log('New user updated :', this.user)
  //         return {
  //             status: 200
  //         }
  //     } catch (e) {
  //         console.error('Failed to update user')
  //         console.log(e)
  //         return {
  //             status: 400
  //         }
  //     }
  // }

  // //Remove user
  // async delete() {
  //     try {
  //         const filter = this.body.user_id
  //         this.user = await UsuarioModel.findByIdAndRemove(filter)
  //         console.log('user removed :', this.user)
  //         return {
  //             status: 200
  //         }
  //     } catch (e) {
  //         console.error('Failed to remove user')
  //         console.log(e)
  //         return {
  //             status: 400
  //         }
  //     }
  // }

  // //Get all users
  async list() {
      try {
          this.pessoa = await PessoaModel.find({}).sort({_id: -1}).limit(5)
          return {
              status: 200,
              pessoa: this.pessoa
          }
      } catch (error) {
          logger.error(error)
      }
  }
}

module.exports = Pessoa

