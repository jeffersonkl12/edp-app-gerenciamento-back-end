import express from 'express'
import {
  body,
  matchedData,
  param,
  query,
  validationResult,
} from 'express-validator'
import ErrorMessage from '../consts/messages-error.const.json'
import { validEmailDominio } from '../utils/validations/email.validation'
import ErrorFieldInvalid from '../errors/error-field-invalid'
import {
  forgotPassword,
  verifyCodePin,
} from '../services/forgotPassword.service'

const router = express.Router()

router.get(
  '/',
  query('email')
    .isEmail()
    .withMessage(ErrorMessage.email.invalido)
    .custom(email => {
      if (validEmailDominio(email)) {
        return true
      }

      throw new Error(ErrorMessage.email.dominio)
    }),
  async (req, res, next) => {
    const result = validationResult(req)
    try {
      if (!result.isEmpty()) {
        throw new ErrorFieldInvalid(ErrorMessage.campoInvalido, result.array())
      }
      const email = req.query?.email as string
      await forgotPassword(email)

      return res.json('Link de recuperacao envinhado!')
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/verify-pin',
  body('codePIN')
    .isLength({
      min: 4,
      max: 4,
    })
    .withMessage(ErrorMessage.pin.tamanho),
  async (req, res, next) => {
    const result = validationResult(req)

    try {
      if (!result.isEmpty()) {
        throw new ErrorFieldInvalid(ErrorMessage.campoInvalido, result.array())
      }
      const { codePIN } = matchedData(req)
      const response = await verifyCodePin(codePIN)

      return res.json(response)
    } catch (err) {
      next(err)
    }
  },
)

export default router
