import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('LogSystem index', () => {
  test('index with correct data', async ({ client }) => {

    // Iniciar sesión
    const user = await User.first()
    const loginResponse = await client.get('/auth/user').loginAs(user || new User())
   // Verificar que se haya iniciado sesión
    loginResponse.assertStatus(200)

    // Crear registro de log
    const logData = {
      action: 'create',
      endpoint: '/users',
      before_data: JSON.parse('{}'),
      after_data: JSON.parse('{}'),
      ip: '127.0.0.1',
      user_agent: 'japa-test'
    }
    // Verificar respuesta
    if (logData === loginResponse.body()) {
      loginResponse.assertStatus(200)
    }
  })
})
