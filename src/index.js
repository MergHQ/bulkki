import { config } from 'dotenv'
import Procedure from './procedure.js'
import template from '../template/template.js'

config()

const [_1, _2, inputFile] = process.argv

const app = async () => {
  const setup = new Procedure()
    .withTransport({
      pool: true,
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    })
    .withEmailParams(inputFile)
    .withTemplate(template)

  await setup.send()
}

app()

export default ''
