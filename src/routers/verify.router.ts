import express from 'express'
import { query, matchedData, validationResult, param } from 'express-validator'
import { verifyActivateAccout } from '../services/verify.service'

const router = express.Router()

router.get(
  '/:userId/:token',
  param('userId')
    .notEmpty()
    .isUUID()
    .withMessage('Nao podoe ser vazio ou id invalido!'),
  param('token')
    .notEmpty()
    .isJWT()
    .withMessage('Nao pode ser vazio e deve ser token valido'),

  async (req, res, next) => {
    const { userId, token } = matchedData(req)

    const result = validationResult(req)

    if (result.isEmpty()) {
      try {
        const response = await verifyActivateAccout(userId, token)

        return res.json(response)
      } catch (err) {
        next(err)
      }
    }

    return res.status(400).json(result.array)
  },
)

export default router
