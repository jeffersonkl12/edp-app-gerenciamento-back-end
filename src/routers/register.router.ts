import express from 'express'
import { body, matchedData, validationResult } from 'express-validator'
import { UserCredential } from '../interfaces/global.interfaces'
import { registerUser } from '../services/register.service'

const router = express.Router()

router.post(
  '/',
  body().notEmpty().withMessage('Nao pode ser vazio'),
  body('email').isEmail().withMessage('Nao e um email valido'),
  body('password')
    .isLength({ max: 8, min: 6 })
    .withMessage('Deve ter no minimo 6 e maximo 8 digitos'),
  async (req, res, next) => {
    const userCredential: UserCredential = matchedData(req)

    const result = validationResult(req)

    if (result.isEmpty()) {
      try {
        const response = await registerUser(userCredential)

        return res.status(201).json('Cadastro realizado com sucesso!')
      } catch (err) {
        next(err)
      }
    }

    return res.status(400).json(result.array())
  },
)

export default router
