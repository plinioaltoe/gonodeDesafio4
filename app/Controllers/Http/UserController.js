'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ request, response, view }) {}

  async create ({ request, response, view }) {}

  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    return user
  }

  async show ({ params, request, response, view }) {}

  async edit ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = UserController
