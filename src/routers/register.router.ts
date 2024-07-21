import express from 'express'
import { body, matchedData, validationResult } from 'express-validator'
import { UserCredential } from '../interfaces/global.interfaces'
import { registerUser } from '../services/register.service'
import { validEmailDominio } from '../utils/validations/email.validation'
import * as ErrorsMessages from '../consts/messages-error.const.json'
import ErrorFieldInvalid from '../errors/error-field-invalid'

const router = express.Router()

router.post(
  '/',
  body().notEmpty().withMessage(ErrorsMessages.vazio),
  body('email')
    .isEmail()
    .withMessage(ErrorsMessages.email.invalido)
    .custom((email: string) => {
      if (validEmailDominio(email)) {
        return true
      }

      throw new Error(ErrorsMessages.email.dominio)
    }),
  body('password')
    .isLength({ max: 8, min: 6 })
    .withMessage(ErrorsMessages.password.tamanho),
  async (req, res, next) => {
    const userCredential: UserCredential = matchedData(req)

    const result = validationResult(req)

    try {
      if (result.isEmpty()) {
        const response = await registerUser(userCredential)

        return res.status(201).json('Cadastro realizado com sucesso!')
      }
      throw new ErrorFieldInvalid(ErrorsMessages.campoInvalido, result.array())
    } catch (err) {
      next(err)
    }
  },
)

export default router
