'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Calendario extends Model {
  owner () {
    return this.belongsTo('App/Models/User')
  }

  users () {
    return this.belongsToMany('App/Models/User')
      .pivotTable('user_calendario')
      .pivotModel('App/Models/UserCalendario')
  }
}

module.exports = Calendario
