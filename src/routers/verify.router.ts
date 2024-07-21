import express from 'express'
import { query, matchedData, validationResult, param } from 'express-validator'
import { verifyActivateAccout } from '../services/verify.service'
import * as ErrorsMessages from '../consts/messages-error.const.json'
import ErrorFieldInvalid from '../errors/error-field-invalid'

const router = express.Router()

router.get(
  '/:userId/:token',
  param('userId')
    .notEmpty()
    .withMessage(ErrorsMessages.vazio)
    .isUUID()
    .withMessage(ErrorsMessages.password.invalido),
  param('token')
    .notEmpty()
    .withMessage(ErrorsMessages.vazio)
    .isJWT()
    .withMessage(ErrorsMessages.token),

  async (req, res, next) => {
    const { userId, token } = matchedData(req)

    const result = validationResult(req)

    try {
      if (result.isEmpty()) {
        const response = await verifyActivateAccout(userId, token)

        return res.json(response)
      }

      throw new ErrorFieldInvalid(ErrorsMessages.campoInvalido, result.array())
    } catch (err) {
      next(err)
    }

    return res.status(400).json(result.array)
  },
)

export default router
