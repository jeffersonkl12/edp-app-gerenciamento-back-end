import express from 'express'
import { authentication } from '../services/Authentication.service'

const router = express.Router()

router.use(async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
      authentication(token)

      next()
    } else {
      return res.status(400).json('Falta credenciais!')
    }
  } catch (err) {
    next(err)
  }
})

export default router
