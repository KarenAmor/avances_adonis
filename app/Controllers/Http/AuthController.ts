import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  public async checkDb() {
    const testRecords = await Database.query().from('test_table').select('*')
    return testRecords
  }
}
