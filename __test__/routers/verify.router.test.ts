import request from 'supertest'
import * as verifyActivateAccout from '../../src/services/verify.service'
import app from '../../src'
import {
  JWTBody,
  JWTConfig,
  TYPETOKEN,
} from '../../src/interfaces/global.interfaces'
import { createToken } from '../../src/services/token.service'
import { v7 as uuidV7 } from 'uuid'

describe('Teste da rota de verificao de conta', () => {
  test('Teste verificacao de conta de usuario - valido', async () => {
    const uuidUser = uuidV7()

    const userDetails = {
      id: uuidUser,
      nome: 'jefferson',
      email: 'jeffersonkl@gmail.com',
      password: '1234',
      status: '1',
      createDate: new Date(),
      updateDate: new Date(),
    }
    const mockVerifyActivateAccout = jest
      .spyOn(verifyActivateAccout, 'verifyActivateAccout')
      .mockResolvedValue(userDetails)

    const tokenBody: JWTBody = {
      type: TYPETOKEN.ACTIVATION,
    }

    const tokenConfig: JWTConfig = {
      audience: uuidUser,
      expiresIn: '10s',
    }

    const USERID = uuidUser
    const TOKEN = createToken(tokenBody, tokenConfig)

    const response = await request(app)
      .get(`/api/verify/${USERID}/${TOKEN}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(200)
    expect(response.body.status).toBe(userDetails.status)
  })
})
