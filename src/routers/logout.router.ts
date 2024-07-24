import express from 'express'
import { matchedData, param, query, validationResult } from 'express-validator'
import ErrorMessage from '../consts/messages-error.const.json'
import { logout } from '../services/logut.service'
import ErrorFieldInvalid from '../errors/error-field-invalid'
import * as ErrorsMessages from '../consts/messages-error.const.json'

const router = express.Router()

router.get(
  '/',
  query('token').isJWT().withMessage(ErrorMessage.token),
  async (req, res, next) => {
    try {
      const results = validationResult(req)
      if (results.isEmpty()) {
        const token = req.query?.token as string
        await logout(token)
        return res.json('Logout realizado com sucesso!')
      }
      throw new ErrorFieldInvalid(ErrorsMessages.campoInvalido, results.array())
    } catch (err) {
      next(err)
    }
  },
)

export default router
