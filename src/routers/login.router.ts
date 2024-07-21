import express from 'express'
import { query, matchedData, validationResult } from 'express-validator'
import { login } from '../services/login.service'
import { validEmailDominio } from '../utils/validations/email.validation'
import * as ErrorsMessages from '../consts/messages-error.const.json'
import ErrorFieldInvalid from '../errors/error-field-invalid'

const router = express.Router()

router.get(
  '/',
  query('email')
    .isEmail()
    .withMessage(ErrorsMessages.email.invalido)
    .custom((email: string) => {
      if (validEmailDominio(email)) {
        return true
      }

      throw new Error(ErrorsMessages.email.dominio)
    }),
  query('password')
    .isLength({ min: 6, max: 8 })
    .withMessage(ErrorsMessages.password.tamanho),
  async (req, res, next) => {
    const { email, password } = matchedData(req)
    try {
      const results = validationResult(req)
      if (results.isEmpty()) {
        const response = await login(email, password)
        return res.json(response)
      }

      throw new ErrorFieldInvalid(ErrorsMessages.campoInvalido, results.array())
    } catch (err) {
      next(err)
    }
  },
)

export default router
