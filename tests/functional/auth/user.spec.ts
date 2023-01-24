import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Auth user', () => {
  test('user when no token', async ({ client }) => {
    const user = {
      name: 'Test User',
      email: 'blabla@gmail.com',
      password: '12345678',
    }
    await User.query().where('email', 'blabla@gmail.com').delete()
    User.create(user)
    const response = await client.get('/auth/user')
    response.assertStatus(401)
  })
  test('user when not logged', async ({ client }) => {
    const response = await client.get('/auth/user').bearerToken('asdasddn')
    response.assertStatus(401)
  })
  test('user is logged', async ({ client }) => {
    const user = await User.first()
    const response = await client.get('/auth/user').loginAs(user || new User())
    response.assertStatus(200)
  })
})
test.group('Auth logout', () => {
  test('logout when no token', async ({ client }) => {
    const user = {
      name: 'Test User',
      email: 'blabla@gmail.com',
      password: '12345678',
    }
    await User.query().where('email', 'blabla@gmail.com').delete()
    User.create(user)
    const response = await client.post('/auth/logout')
    response.assertStatus(401)
  })
  test('logout when not logged', async ({ client }) => {
    const response = await client.post('/auth/logout').bearerToken('asdasddn')
    response.assertStatus(401)
  })
  test('logout when is logged', async ({ client }) => {
    const user = await User.first()
    const response = await client.post('/auth/logout').loginAs(user || new User())
    response.assertStatus(200)
  })
})
