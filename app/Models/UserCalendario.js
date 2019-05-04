'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserCalendario extends Model {
  static boot () {
    super.boot()
    this.addHook('afterSave', 'UserCalendarioHook.sendNewTaskMail')
  }
}

module.exports = UserCalendario
