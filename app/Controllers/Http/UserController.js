'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
    const user = await User.query()
      .with('own')
      .fetch()

    return user
  }

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    return user
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)
    await user.load('own')
    return user
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['username', 'password', 'password_confirmation'])

    user.merge(data)

    await user.save()

    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}

module.exports = UserController
