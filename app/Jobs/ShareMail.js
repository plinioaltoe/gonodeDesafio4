'use strict'

const Mail = use('Mail')

class ShareMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'ShareMail-job'
  }

  async handle ({ titulo, localizacao, dataEvento, horario, email }) {
    console.log(
      `Job: ${ShareMail.key},
      ${titulo}, ${localizacao}, ${dataEvento}, ${horario}, ${email}`
    )
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
          .from('faleconosco@desafio4.com.br', 'Calendário')
          .subject('Evento compartihado')
      }
    )
  }
}

module.exports = ShareMail
