'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  own () {
    return this.hasMany('App/Models/Calendario')
  }

  calendarios () {
    return this.belongsToMany('App/Models/Calendario')
      .pivotTable('user_calendario')
      .pivotModel('App/Models/UserCalendario')
  }
}

module.exports = User
