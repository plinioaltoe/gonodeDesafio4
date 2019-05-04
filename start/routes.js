'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User/Create')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.post('calendarios', 'CalendarioController.store').validator(
    'Calendario'
  )

  Route.resource('calendarios', 'CalendarioController')
    .except('store')
    .apiOnly()

  Route.resource('users', 'UserController')
    .except(['store'])
    .validator(new Map([[['update'], ['User/Update']]]))

  Route.post('share', 'CompartilharEventoController.share')

  Route.get('search', 'SearchByDatumController.index')
}).middleware(['auth'])
