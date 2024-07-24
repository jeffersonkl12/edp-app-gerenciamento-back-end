import express from 'express'
import { authentication } from '../services/Authentication.service'

const router = express.Router()

router.use(async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
      await authentication(token)

      next()
    } else {
      throw new Error('Token invalido!')
    }
  } catch (err) {
    next(err)
  }
})

export default router
