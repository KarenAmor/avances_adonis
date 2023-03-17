import { test } from '@japa/runner'
import User from 'App/Models/User'
import LogSystem from 'App/Models/LogSystem'
import { expect } from 'chai'


test.group('LogSystem show', () => {
  test('show with correct data', async ({ client }) => {

    // Iniciar sesión
    const user = await User.first()
    const loginResponse = await client.get('/auth/user').loginAs(user || new User())
   // Verificar que se haya iniciado sesión
    loginResponse.assertStatus(200)

    // Crear registro de log
    const logData = {
      id: 73,
      user_id: 1,
      action: 'create',
      endpoint: '/users',
      before_data: JSON.parse('{}'),
      after_data: JSON.parse('{}'),
      ip: "127.0.0.1",
      user_agent: "japa-test",
      created_at: "2023-02-08T18:22:10.703-05:00",
      updated_at: "2023-02-08T18:22:10.703-05:00"
    }

    // Verificar respuesta
    const showResponse = await client.get(`/log-system/${logData.id}`).send()
  showResponse.assertStatus(200)
  // Verificar que el registro de log devuelto sea el esperado
    const log = await LogSystem.find(logData.id)
expect(showResponse.body).to.have.all.keys(logData)
expect(showResponse.body).to.include(logData)
 } )
})
