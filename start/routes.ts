/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

/* Check Service Status */
Route.get('/ping', async () => {
  return { message: 'pong' }
})
Route.get('/health/check-db', 'HealthController.checkDb')
Route.get('/health/check-kv', 'HealthController.checkKv')
/* end Check Service Status */

/* Auth */
Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')
/* end Auth */

Route.group(() => {
  Route.get('/auth/user', 'AuthController.user')
  Route.post('/auth/logout', 'AuthController.logout')

  /*Log System*/
  Route.resource('log-system', 'LogSystemsController').only(['index', 'show', 'store', 'destroy'])
/*end Log System*/
}).middleware('auth:api')
