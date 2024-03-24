import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // init users table
    let admin = await User.create({
      name: 'Administrator',
      email: 'admin@local.com',
      password: 'password123',
    })

    // init roles table
    await Role.create({
      name: 'admin',
      createdBy: admin.id,
      setting: JSON.stringify({ permissions: 'full-permissions' }),
      description: 'full-permissions',
    })
  }
}
