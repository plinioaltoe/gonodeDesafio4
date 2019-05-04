'use strict'
const Database = use('Database')
const Calendario = use('App/Models/Calendario')
const User = use('App/Models/User')

class CompartilharEventoController {
  async share ({ request }) {
    const data = request.only(['id_share', 'id_calendario'])
    const calendario = await Calendario.findOrFail(data.id_calendario)
    const user = await User.findOrFail(data.id_share)

    const trx = await Database.beginTransaction()

    await calendario.users().attach(user.id, trx)
    await calendario.save(trx)
    await calendario.load('users', trx)

    trx.commit()
    return calendario
  }
}

module.exports = CompartilharEventoController
