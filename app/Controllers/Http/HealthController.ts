// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
const keyVaultClient = require('capitallab-habilitadores-key-vault').getClient();

export default class HealthController {
  public async checkDb() {
    const testRecords = await Database.query().from('test_table').select('*')
    return testRecords
  }
  public async checkKv() {
    const databaseVis = await keyVaultClient.getSecretCustom('DATABASE')
    return databaseVis
  }
}
