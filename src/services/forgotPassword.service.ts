import { TYPETOKEN } from '../interfaces/global.interfaces'
import {
  existByEmail,
  findByEmail,
  save,
} from '../repositorys/userDetails.repository'
import { sendEmail } from './email.service'
import { createToken, getFieldToToken, verifyToken } from './token.service'

const LINK_RECOVERY =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''

export async function forgotPassword(email: string) {
  try {
    const userDetails = await findByEmail(email)
    if (!userDetails) {
      throw new Error('Usuario inexistente!')
    }
    const tokenRecoveryPassword = createToken(
      {
        email: email,
        type: TYPETOKEN.RECOVERY,
      },
      {
        subject: 'recovery_password',
        audience: userDetails!.id,
        expiresIn: '1d',
      },
    )

    const conteudo = String.raw`
            <p>Clique no link abaixo para recuperar sua conta!</p>
            <p>${LINK_RECOVERY}/api/forget-password/${tokenRecoveryPassword}</p>
        `

    await sendEmail({
      destinatario: userDetails!.email,
      titulo: 'Recuperação de senha',
      conteudo: conteudo,
    })
  } catch (err) {
    throw err
  }
}

export async function resetPassword(
  tokenRecoveryPassword: string,
  password: string,
) {
  try {
    const typeToken = getFieldToToken(tokenRecoveryPassword, 'type')

    const email = getFieldToToken(tokenRecoveryPassword, 'email')

    if (typeof email === 'string' && typeof typeToken === 'string') {
      if (typeToken !== TYPETOKEN.RECOVERY) {
        throw new Error('Token do tipo errado!')
      }

      const userDetails = await findByEmail(email)

      if (!userDetails) {
        throw new Error('Usario inexistente!')
      }

      userDetails.password = password

      await save(userDetails)
    } else {
      throw new Error('Token com campos invalidos!')
    }
  } catch (err) {
    throw err
  }
}
