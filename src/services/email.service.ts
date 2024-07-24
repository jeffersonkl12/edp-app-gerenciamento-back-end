import nodemailer from 'nodemailer'
import fs from 'fs'
import * as dotenv from 'dotenv'
import path from 'path'
import ejs from 'ejs'
import { readToParsherFile } from '../utils/fs.utils'

dotenv.config()

const HOST = process.env.SMTP_HOST || ''
const PORT = process.env.SMTP_PORT || ''
const USERNAME = process.env.SMTP_USERNAME || ''
const PASSWORD = process.env.SMTP_PASSWORD || ''

interface PropsSendEmail {
  destinatario: string
  titulo?: string
  conteudo?: string
}

export async function sendEmail({
  destinatario,
  titulo,
  conteudo,
}: PropsSendEmail) {
  const transport = createTtransport()

  try {
    const templatePath = path.join(
      __dirname,
      '../../public/index.email.template.ejs',
    )

    const template = fs.readFileSync(templatePath, 'utf-8')

    const html = ejs.render(template, { conteudo })

    const info = await transport.sendMail({
      from: HOST,
      to: destinatario,
      subject: titulo,
      html: html,
      attachments: [
        {
          filename: 'EDP-Logo-white.png',
          path: path.join(__dirname, '../../public/imgs/EDP-Logo-white.png'),
          cid: 'logo',
        },
      ],
    })
    return info
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    throw new Error('Problema com envio do email por SMTP!')
  }
}

function createTtransport() {
  return nodemailer.createTransport({
    host: HOST,
    port: parseInt(PORT),
    secure: false,
    auth: {
      type: 'login',
      user: USERNAME,
      pass: PASSWORD,
    },
  })
}
