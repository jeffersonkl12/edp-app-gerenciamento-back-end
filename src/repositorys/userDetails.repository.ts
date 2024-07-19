import prisma from '../databases/configs/prisma.config'
import UserDetailsRegisterDTO from '../dtos/userDetails/userDetails.dto'
import { v7 as uuidv7 } from 'uuid'

export async function save(newUserDetails: UserDetailsRegisterDTO) {
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
