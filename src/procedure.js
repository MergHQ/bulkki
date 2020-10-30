import fs from 'fs'
import parse from 'csv-parse/lib/sync.js'
import mailer from 'nodemailer'

export default class {
  emailParams = null
  template = null
  transport = null

  withTemplate(template) {
    this.template = template
    return this
  }

  withEmailParams(fileName) {
    const file = fs.readFileSync(fileName, 'utf8')
    this.emailParams = parse(file, { columns: true, skip_empty_lines: true })
    return this
  }

  withTransport(transportParams) {
    this.transport = mailer.createTransport(transportParams)
    return this
  }

  mapEmailParams(functor) {
    this.emailParams = functor(this.emailParams)
    return this
  }

  send() {
    if (this.emailParams === null) throw new Error('Missing email params')
    if (this.template === null) throw new Error('Missing template')
    if (this.transport === null) throw new Error('Missing transport')

    return Promise.all(
      this.emailParams.map(p => this.transport.sendMail(this.template(p)))
    )
  }
}
