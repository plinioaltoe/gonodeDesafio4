'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCalendarioSchema extends Schema {
  up () {
    this.create('user_calendarios', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('calendario_id')
        .unsigned()
        .references('id')
        .inTable('calendarios')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_calendarios')
  }
}

module.exports = UserCalendarioSchema
