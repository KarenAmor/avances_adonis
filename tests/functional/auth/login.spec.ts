import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Auth login', () => {
  test('login user', async ({ client }) => {
    await User.query().where('email', 'blabla@gmail.com').delete()
    await User.create({
      name: 'Test User',
      email: 'blabla@gmail.com',
      password: '12345678',
    })
    const response = await client.post('/auth/login').json({
      email: 'blabla@gmail.com',
      password: '12345678',
    })
    response.assertStatus(200)
    response.assertBodyContains({ type: 'bearer' })
  })
  test('login with no credentials', async ({ client }) => {
    const response = await client.post('/auth/login').json({})
    response.assertStatus(422)
  })
  test('login with wrong credentials', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'blablasdfsdf@gmail.com',
      password: '12345sdfsdf678',
    })
    response.assertStatus(400)
  })
  test('when wrong email', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'dsfsdfsdfsdfsdf',
      password: '12345678',
    })
    response.assertStatus(422)
    await User.query().where('email', 'blabla@gmail.com').delete()
  })
})
