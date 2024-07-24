import express from 'express'
import { body, matchedData, param, validationResult } from 'express-validator'
import ErrorMessage from '../consts/messages-error.const.json'
import { handleChangeTokenRefresh } from '../services/refresh-token.service'
import ErrorFieldInvalid from '../errors/error-field-invalid'

const router = express.Router()

router.post(
  '/',
  body('token').isJWT().withMessage(ErrorMessage.token),
  body('tokenRefresh').isJWT().withMessage(ErrorMessage.token),
  async (req, res, next) => {
    const results = validationResult(req)
    try {
      if (results.isEmpty()) {
        const { token, tokenRefresh } = matchedData(req)
        const newTokens = await handleChangeTokenRefresh(token, tokenRefresh)
        return res.json(newTokens)
      }

      throw new ErrorFieldInvalid(ErrorMessage.campoInvalido, results.array())
    } catch (err) {
      next(err)
    }
  },
)

export default router
