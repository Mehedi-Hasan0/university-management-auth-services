import { User } from './users.model'

export const findLastUserId = async () => {
  // findOne({}, { id: 1, _id: 0 }) this is filtering data
  //  .sort({createdAt: -1,}) sorting data in descending format
  // lean() operator makes quering faster by making the output a javascript object
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')

  // increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  return incrementedId
}
