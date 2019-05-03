'use strict'

const Calendario = use('App/Models/Calendario')

class CalendarioController {
  async index ({ request, response, view }) {
    const calendarios = await Calendario.query()
      .with('user')
      .fetch()

    return calendarios
  }

  async store ({ request, response, auth }) {
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

  async show ({ params, request, response, view }) {
    const calendario = await Calendario.findOrFail(params.id)
    await calendario.load('user')
    return calendario
  }

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = CalendarioController
