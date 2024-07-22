import express from 'express'
import { matchedData, param, query } from 'express-validator'
import ErrorMessage from '../consts/messages-error.const.json'
import { logout } from '../services/logut.service'

const router = express.Router()

router.get(
  '/:tokenRefresh',
  param('token').isJWT().withMessage(ErrorMessage.token),
  async (req, res, next) => {
    const { tokenRefresh } = matchedData(req)

    try {
      await logout(tokenRefresh)
      res.json('Logout realizado com sucesso!')
    } catch (err) {
      next(err)
    }
  },
)

export default router
