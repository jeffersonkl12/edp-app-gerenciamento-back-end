import nodemailer from 'nodemailer'
import fs from 'fs'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const HOST = process.env.SMTP_HOST || ''
const PORT = process.env.SMTP_PORT || ''
const USERNAME = process.env.SMTP_USERNAME || ''
const PASSWORD = process.env.SMTP_PASSWORD || ''

interface PropsSendEmail {
  remetente: string
  destinatario: string
  titulo?: string
  conteudo?: string
}

export async function sendEmail({
  remetente,
  destinatario,
  titulo,
  conteudo,
}: PropsSendEmail) {
  const transport = createTtransport()

  try {
    const html = fs.readFileSync(
      path.resolve(__dirname, '../../public/index.email.html'),
    )

    const info = await transport.sendMail({
      from: remetente,
      to: destinatario,
      subject: titulo,
      text: conteudo,
      html: html,
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
