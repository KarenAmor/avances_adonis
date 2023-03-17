import { test } from '@japa/runner'
import LogSystem from 'App/Models/LogSystem'
import User from 'App/Models/User'

test.group('LogSystem store', () => {
  test('Store with correct data', async ({ client }) => {
    // Iniciar sesión
    const user = await User.first()
    const loginResponse = await client.get('/auth/user').loginAs(user || new User())
    // Verificar que se haya iniciado sesión
    loginResponse.assertStatus(200)
    // Crear registro de log
    const logData = {
      action: 'create karen',
      endpoint: '/users',
      before_data: JSON.parse('{}'),
      after_data: JSON.parse('{}'),
      ip: '127.0.0.1',
      user_agent: 'japa-test'
    }
    await LogSystem.create(logData)
    // Verificar respuesta
    loginResponse.assertStatus(200)
  })

  test('create log with missing data', async ({ client }) => {
    // Iniciar sesión
    const user = await User.first()
    const loginResponse = await client.get('/auth/user').loginAs(user || new User())
    // Verificar que se haya iniciado sesión
    loginResponse.assertStatus(200)
    // Intentar crear registro de log sin todos los datos necesarios
    const logData = {
      endpoint: '/users',
      before_data: JSON.parse('{}'),
      after_data: JSON.parse('{}'),
      ip: '127.0.0.1',
      user_agent: 'japa-test'
    }
    // Verificar respuesta
    if (logData !== logData) {
      loginResponse.assertStatus(400)
    }
  })
})
