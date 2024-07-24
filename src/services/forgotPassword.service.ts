import path from 'path'
import { TYPETOKEN } from '../interfaces/global.interfaces'
import {
  existByEmail,
  findByEmail,
  save,
  update,
} from '../repositorys/userDetails.repository'
import { generatePIN } from '../utils/genereate-pin.utils'
import { hash } from '../utils/has.utils'
import { sendEmail } from './email.service'
import { createToken, getFieldToToken, verifyToken } from './token.service'
import { readFileSync } from 'fs'
import ejs from 'ejs'
import redisClient from '../databases/configs/redis.config'

const LINK_RECOVERY =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''

export async function forgotPassword(email: string) {
  try {
    const userDetails = await findByEmail(email)
    if (!userDetails) {
      throw new Error('Usuario inexistente!')
    }

    const codePIN = generatePIN(4)

    await redisClient.SET(codePIN, email, { EX: 60 * 60 * 24 })

    const templatePath = path.join(
      __dirname,
      '../../public/templates/forget-password.email.ejs',
    )
    const template = readFileSync(templatePath, 'utf-8')

    const html = ejs.render(template, { codePIN })

    await sendEmail({
      destinatario: userDetails!.email,
      titulo: 'Recuperação de senha',
      conteudo: html,
    })
  } catch (err) {
    throw err
  }
}

export async function verifyCodePin(codePIN: string) {
  try {
    const emailCliente = await redisClient.get(codePIN)

    if (emailCliente) {
      const userDetails = await findByEmail(emailCliente)

      if (userDetails) {
        await redisClient.del(codePIN)

        const tokenResetPassword = createToken(
          { email: userDetails.email, type: TYPETOKEN.RESETPASSWORD },
          {
            audience: userDetails.id,
            subject: 'reset_password',
            expiresIn: '60m',
          },
        )

        return {
          tokenResetPassword: tokenResetPassword,
        }
      }
    }

    throw new Error('Codigo PIN invalido!')
  } catch (err) {
    throw err
  }
}

export async function resetPassword(
  tokenResetPassword: string,
  password: string,
) {
  try {
    verifyToken(tokenResetPassword)

    const typeToken = getFieldToToken(tokenResetPassword, 'type')

    const email = getFieldToToken(tokenResetPassword, 'email')

    if (typeof email === 'string' && typeof typeToken === 'string') {
      if (typeToken !== TYPETOKEN.RESETPASSWORD) {
        throw new Error('Token do tipo errado!')
      }

      const userDetails = await findByEmail(email)

      if (!userDetails) {
        throw new Error('Usuario inexistente!')
      }

      userDetails.password = hash(password)

      await update(userDetails.id, userDetails)
    } else {
      throw new Error('Token com campos invalidos!')
    }
  } catch (err) {
    throw err
  }
}
