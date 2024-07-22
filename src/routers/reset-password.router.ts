import express from 'express'
import { body, matchedData, validationResult } from 'express-validator'
import ErrorFieldInvalid from '../errors/error-field-invalid'
import ErrorMessage from '../consts/messages-error.const.json'
import { resetPassword } from '../services/forgotPassword.service'

const router = express.Router()

router.post(
  '/',
  body('password')
    .isLength({
      min: 6,
      max: 8,
    })
    .withMessage(ErrorMessage.password.tamanho),
  async (req, res, next) => {
    const { password } = matchedData(req)
    const result = validationResult(req)
    const token = req.headers.authorization!.split(' ')[1]
    try {
      if (!result.isEmpty()) {
        throw new ErrorFieldInvalid(ErrorMessage.campoInvalido, result.array())
      }

      await resetPassword(token, password)

      return res.json('Password resetado com sucesso!')
    } catch (err) {
      next(err)
    }
  },
)

export default router
