import express from 'express'
import { query, matchedData } from 'express-validator'
import { login } from '../services/login.service'
import { validEmailDominio } from '../utils/validations/email.validation'

const router = express.Router()

router.get(
  '/',
  query('email')
    .isEmail()
    .withMessage('Deve ser um email valido!')
    .custom((email: string) => {
      if (validEmailDominio(email)) {
        return true
      }

      throw new Error('Email com dominio invalido!')
    }),
  query('password')
    .isLength({ min: 6, max: 8 })
    .withMessage('Deve ter no minimo 6 e maximo 8 digitos!'),
  async (req, res, next) => {
    const { email, password } = matchedData(req)
    try {
      const response = await login(email, password)
      return res.json(response)
    } catch (err) {
      next(err)
    }
  },
)

export default router
