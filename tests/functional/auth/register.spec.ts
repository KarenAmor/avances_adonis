import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Auth register', () => {
  // when no post body
  test('no body on register request', async ({ client }) => {
    const body = {}
    const response = await client.post('/auth/register').json(body)
    response.assertStatus(422)
  })
  // test if user can register
  test('register user', async ({ client }) => {
    await User.query().where('email', 'blabla@gmail.com').delete()
    const body = {
      name: 'John Doe',
      email: 'blabla@gmail.com',
      password: '12345678',
      password_confirmation: '12345678',
    }
    const response = await client.post('/auth/register').json(body)

    response.assertStatus(200)
    response.assertBodyContains({ email: 'blabla@gmail.com' })
  })
  // when user is already registered
  test('register duplicated user', async ({ client }) => {
    const body = {
      name: 'John Doe',
      email: 'blabla@gmail.com',
      password: '12345678',
      password_confirmation: '12345678',
    }
    const response = await client.post('/auth/register').json(body)
    response.assertStatus(422)
  })
  // test if body is to long
  test('body is too long', async ({ client }) => {
    await User.query().where('email', 'blabla@gmail.com').delete()
    const body = {
      name: '12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa678',
      email: 'blabla@gmail.com',
      password:
        '12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa678',
      password_confirmation:
        '12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa12345sdfasdfa678',
    }
    const response = await client.post('/auth/register').json(body)

    response.assertStatus(422)
  })
})
