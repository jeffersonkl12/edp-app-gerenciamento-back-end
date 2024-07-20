import UserDetailsRegisterDTO from '../dtos/userDetails/UserDetailsRegister.dto'
import {
  JWTBody,
  JWTConfig,
  TYPETOKEN,
  UserCredential,
} from '../interfaces/global.interfaces'
import { existByEmail, save } from '../repositorys/userDetails.repository'
import { v7 as uuidV7 } from 'uuid'
import { sendEmail } from './email.service'
import * as dotenv from 'dotenv'
import { createToken } from './token.service'

dotenv.config()

const URL_ACTIVATION =
  process.env.LINK_ACTIVATION ||
  'http://localhost:8080/api/v1/{{userId}}/verify/{{token}}'

export async function registerUser(userCredential: UserCredential) {
  const { email, password, nome } = userCredential
  const isExistEmail = await existByEmail(email)

  if (isExistEmail) {
    throw new Error('Email ja cadastrado')
  }

  const userDetailsRegisterDTO = new UserDetailsRegisterDTO(
    email,
    password,
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

    const url = URL_ACTIVATION.replace('{{userId}}', userDetails.id).replace(
      '{{token}}',
      token,
    )

    const contentHTML = String.raw`
    <p>Clique no seguinte link para ativar sua conta!</p>
    <a href="${url}">${url}</a>
  `

    const infoEmail = await sendEmail({
      destinatario: userDetails.email,
      titulo: 'Ativação da conta edp',
      conteudo: contentHTML,
    })

    return infoEmail.response
  } catch (err) {
    console.error(err)
    throw err
  }
}
