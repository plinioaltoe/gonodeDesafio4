'use strict'

const Calendario = use('App/Models/Calendario')

class CompartilharEventoController {
  async show ({ request, response }) {
    const id = request.input('id')
    const calendario = await Calendario.findById(id)
    return calendario
  }
}

module.exports = CompartilharEventoController
