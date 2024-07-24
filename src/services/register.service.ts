import UserDetailsRegisterDTO from '../dtos/userDetails/UserDetailsRegister.dto'
import {
  JWTBody,
  JWTConfig,
  TYPETOKEN,
  UserCredential,
} from '../interfaces/global.interfaces'
import { existByEmail, save } from '../repositorys/userDetails.repository'
import { sendEmail } from './email.service'
import * as dotenv from 'dotenv'
import { createToken } from './token.service'
import { hash } from '../utils/has.utils'
import { randomUUID } from 'crypto'
import { URL, URLSearchParams } from 'url'
import path from 'path'
import { readFileSync } from 'fs'
import ejs from 'ejs'

dotenv.config()

const URL_ACTIVATION = 'http://localhost:8080/api/verify'

export async function registerUser(userCredential: UserCredential) {
  const { email, password, nome } = userCredential
  const isExistEmail = await existByEmail(email)

  if (isExistEmail) {
    throw new Error('Email ja cadastrado')
  }

  const userDetailsRegisterDTO = new UserDetailsRegisterDTO(
    email,
    hash(password),
    nome,
  )

  try {
    const userDetails = await save(userDetailsRegisterDTO)

    const tokenBody: JWTBody = {
      email: userDetails.email,
      type: TYPETOKEN.ACTIVATION,
    }

    const tokenConfig: JWTConfig = {
      audience: userDetails.id,
      subject: 'activation account',
      expiresIn: '1d',
    }

    const token = createToken(tokenBody, tokenConfig)

    const url = new URL(URL_ACTIVATION)

    url.searchParams.append('userId', userDetails.id)
    url.searchParams.append('token', token)

    const templatePath = path.join(
      __dirname,
      '../../public/templates/activate-account.email.ejs',
    )

    const template = readFileSync(templatePath, 'utf-8')

    const html = ejs.render(template, { linkAtivacao: url })

    const infoEmail = await sendEmail({
      destinatario: userDetails.email,
      titulo: 'Ativação da conta edp',
      conteudo: html,
    })

    return infoEmail.response
  } catch (err) {
    console.error(err)
    throw err
  }
}
