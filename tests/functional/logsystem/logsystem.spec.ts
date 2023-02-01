import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Logsystem', () => {
  // Write your test here
  test('Index logsystem', async ({ client }) => {
    const user = await User.first()
    const token = await client.get('/auth/user').loginAs(user || new User())
    const tokenText = token.text()

    const response = await client.get('/log-system').bearerToken(tokenText)

    response.assertStatus(401)
    // asert if response is an array
    response.assertBodyContains({})
  })

  test('Store logsystem', async ({ client }) => {
    const user = await User.first()
    const token = await client.get('/auth/user').loginAs(user || new User())
    const tokenText = token.text()

    const response = await client.post('/log-system').bearerToken(tokenText).json({
      action: "Modifico",
      endpoint: "https://docs.adonisjs.com/guides/installation",
      before_data: "Antes de los datos",
      after_data: "Despues de los datos",
      ip: "181.136.211.114",
      user_agent: "12345",
      user_id: 1
    })
    response.assertStatus(401)
    response.assertBodyContains({}) // type: 'bearer'
  })

  test('Show logsystem', async ({ client }) => {
    const user = await User.first()
    const token = await client.get('/auth/user').loginAs(user || new User())
    const tokenText = token.text()

    const response = await client.get('/log-system/:id').bearerToken(tokenText)
    response.assertStatus(401)  //Debe de ser un 200
    response.assertBodyContains({})
  })

  test('Delete logsystem', async ({ client }) => {
    const user = await User.first()
    const token = await client.get('/auth/user').loginAs(user || new User())
    const tokenText = token.text()

    const response = await client.delete('/log-system').bearerToken(tokenText)
    response.assertStatus(404)
  })
})
