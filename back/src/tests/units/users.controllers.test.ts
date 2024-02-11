import { test, expect } from 'bun:test'
import { getUsers, getUser } from '@/controllers/users.controller'

test('should get all users', async () => {
  const users = await getUsers()

  expect(users).toBeInstanceOf(User[])
})

test('should get a user by id', async () => {
  const user = await getUser(1)

  expect(user).toBeInstanceOf(Object)
})

