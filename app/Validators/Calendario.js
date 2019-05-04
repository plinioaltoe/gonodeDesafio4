'use strict'
const Antl = use('Antl')

class Calendario {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      titulo: 'required:calendario',
      localizacao: 'required:calendario',
      data_evento: 'required:calendario',
      horario: 'required:calendario'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Calendario
