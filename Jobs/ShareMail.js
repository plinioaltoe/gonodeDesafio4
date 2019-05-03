'use strict'

const Mail = use('Mail')

class ShareMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'SignupMail-job'
  }

  async handle ({ titulo, localizacao, dataEvento, horario, email }) {
    console.log(`Job: ${ShareMail.key}`)
    await Mail.send(
      ['emails.share'],
      {
        titulo,
        localizacao,
        data_evento: dataEvento,
        horario
      },
      message => {
        message
          .to(email)
          .from('faleconosco@meetapp.com.br', 'Sistema de Meetups | Meetapp')
          .subject('Inscrição realizada com sucesso')
      }
    )
  }
}

module.exports = ShareMail
