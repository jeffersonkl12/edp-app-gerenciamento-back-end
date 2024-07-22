import express from 'express'
import { matchedData, param, validationResult } from 'express-validator'
import ErrorMessage from '../consts/messages-error.const.json'
import { validEmailDominio } from '../utils/validations/email.validation'
import ErrorFieldInvalid from '../errors/error-field-invalid'
import { forgotPassword } from '../services/forgotPassword.service'

const router = express.Router()

router.get(
  '/:email',
  param('email')
    .isEmail()
    .withMessage(ErrorMessage.email.invalido)
    .custom(email => {
      if (validEmailDominio(email)) {
        return true
      }

      throw new Error(ErrorMessage.email.dominio)
    }),
  async (req, res, next) => {
    const { email } = matchedData(req)
    const result = validationResult(req)
    try {
      if (!result.isEmpty()) {
        throw new ErrorFieldInvalid(ErrorMessage.campoInvalido, result.array())
      }

      await forgotPassword(email)

      return res.json('Link de recuperacao envinhado!')
    } catch (err) {
      next(err)
    }
  },
)

export default router
