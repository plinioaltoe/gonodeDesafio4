'use strict'

const moment = use('moment')
const Calendario = use('App/Models/Calendario')

class CalendarioController {
  async index ({ auth }) {
    const user = await auth.getUser()
    const calendarios = await Calendario.query()
      .whereRaw(` user_id = ${user.id}`)
      .with('owner')
      .with('users')
      .fetch()

    return calendarios
  }

  async store ({ request, auth }) {
    const data = request.only([
      'titulo',
      'localizacao',
      'data_evento',
      'horario'
    ])
    const calendario = await Calendario.create({
      ...data,
      user_id: auth.user.id
    })
    return calendario
  }

  async show ({ params, auth }) {
    const user = await auth.getUser()
    const calendario = await Calendario.query()
      .whereRaw(` user_id = ${user.id} and id = ${params.id}`)
      .with('owner')
      .with('users')
      .fetch()
    return calendario
  }

  async update ({ params, request, auth, response }) {
    const user = await auth.getUser()
    const data = request.only([
      'titulo',
      'localizacao',
      'data_evento',
      'horario'
    ])
    const now = moment().format('YYYY-MM-DD HH:mm')
    const isUpdated = await Calendario.query()
      .where('user_id', '=', user.id)
      .where('id', '=', params.id)
      .where('data_evento', '>=', now)
      .update(data)

    if (isUpdated) {
      const calendario = await Calendario.findOrFail(params.id)
      return calendario
    }

    return response.status(400).send({
      error: {
        message: 'Não é possivel alterar esse evento'
      }
    })
  }

  async destroy ({ params, auth, response }) {
    const user = await auth.getUser()
    const now = moment().format('YYYY-MM-DD HH:mm')

    const isDeleted = await Calendario.query()
      .where('user_id', '=', user.id)
      .where('id', '=', params.id)
      .where('data_evento', '>=', now)
      .delete()

    if (isDeleted) {
      return response.status(200).send({
        error: {
          message: 'sucesso'
        }
      })
    }

    return response.status(400).send({
      error: {
        message: 'Não é possivel excluir esse evento'
      }
    })
  }
}

module.exports = CalendarioController
