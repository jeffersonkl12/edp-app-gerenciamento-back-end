import prisma from '../databases/configs/prisma.config'
import userDetailsBaseDTO from '../dtos/userDetails/userDetailsBase.dto'
import UserDetailsRegisterDTO from '../dtos/userDetails/UserDetailsRegister.dto'
import { v7 as uuidv7 } from 'uuid'

export async function save(newUserDetails: userDetailsBaseDTO) {
  const uuid = uuidv7()
  return await prisma.userDetails.create({
    data: { id: uuid, ...newUserDetails },
  })
}

export async function existByEmail(email: string) {
  const userDetails = await prisma.userDetails.findUnique({
    where: {
      email: email,
    },
  })

  return userDetails !== null && userDetails !== undefined
}

export async function findUserDetailsById(id: string) {
  return await prisma.userDetails.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
}
