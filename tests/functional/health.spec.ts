import { test } from '@japa/runner'

test.group('Health', () => {
  // Write your test here
  test('check db status', async ({ client }) => {
    const response = await client.get('/health/check-db')

    response.assertStatus(200)
    // asert if response is an array
    response.assertBody([])
  })

  // test ping status
  test('services response to ping', async ({ client }) => {
    const response = await client.get('/ping')

    response.assertStatus(200)
    response.assertBodyContains({ message: 'pong' })
  })

  // Write your test here
  test('check keyvault status', async ({ client }) => {
    const response = await client.get('/health/check-kv')

    response.assertStatus(200)
    // asert if response is an array
    response.assertBody([])
  })
})
