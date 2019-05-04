'use strict'

const Calendario = use('App/Models/Calendario')

class SearchByDatumController {
  async index ({ request }) {
    const data = request.get()

    const calendario = await Calendario.query()
      .whereRaw(`  data_evento >= '${data.data_evento}'`)
      .with('users')
      .orderBy('data_evento', 'asc')
      .fetch()

    return calendario
  }
}

module.exports = SearchByDatumController
