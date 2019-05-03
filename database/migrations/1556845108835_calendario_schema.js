'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CalendarioSchema extends Schema {
  up () {
    this.create('calendarios', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('titulo').notNullable()
      table.string('localizacao').notNullable()
      table.date('data_evento').notNullable()
      table.time('horario').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('calendarios')
  }
}

module.exports = CalendarioSchema
