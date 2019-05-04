'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/ShareMail')

const User = use('App/Models/User')
const Calendario = use('App/Models/Calendario')

const UserCalendarioHook = (exports = module.exports = {})

UserCalendarioHook.sendNewTaskMail = async calendarioInstance => {
  const user = await User.findOrFail(calendarioInstance.user_id)
  const calendario = await Calendario.findOrFail(
    calendarioInstance.calendario_id
  )

  const { email } = user
  const { titulo, localizacao, data_evento: dataEvento, horario } = calendario

  Kue.dispatch(
    Job.key,
    { titulo, localizacao, dataEvento, horario, email },
    { attempts: 3 }
  )
}
