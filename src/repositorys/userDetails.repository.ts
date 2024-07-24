import prisma from '../databases/configs/prisma.config'
import UserDetailsBaseDTO from '../dtos/userDetails/userDetailsBase.dto'
import { v7 as uuidv7 } from 'uuid'
import { hash } from '../utils/has.utils'
import UserDetailsRegisterDTO from '../dtos/userDetails/UserDetailsRegister.dto'
import UserDetailsUpdateDTO from '../dtos/userDetails/userDetailsUpdateDTO'

export async function save(newUserDetails: UserDetailsRegisterDTO) {
  const uuid = uuidv7()

  return await prisma.userDetails.create({
    data: { id: uuid, ...newUserDetails },
  })
}

export async function update(id: string, userDetails: UserDetailsUpdateDTO) {
  return await prisma.userDetails.update({
    where: {
      id: id,
    },
    data: userDetails,
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

export async function findByEmail(email: string) {
  return await prisma.userDetails.findUnique({
    where: {
      email: email,
    },
  })
}

export async function findByEmailAndPassword(email: string, password: string) {
  return await prisma.userDetails.findUniqueOrThrow({
    where: {
      email: email,
      password: password,
    },
  })
}
