import { test } from '@japa/runner'

test.group('Auth', () => {
  // Write your test here
  test('check db status', async ({ client }) => {
    const response = await client.get('/auth/check-db')

    response.assertStatus(200)
    response.assertBodyContains({ message: 'db-ready' })
  })
})
