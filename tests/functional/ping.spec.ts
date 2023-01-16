import { test } from '@japa/runner'

test.group('Ping', () => {
  test('services response to ping', async ({ client }) => {
    const response = await client.get('/ping')

    response.assertStatus(200)
    response.assertBodyContains({ message: 'pong' })
  })
})
