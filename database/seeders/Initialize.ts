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

    let user = await User.create({
      name: 'User',
      email: 'user@local.com',
      password: 'password321',
    })

    // init roles table
    const adminRole = await Role.create({
      name: 'admin',
      createdBy: admin.id,
      setting: JSON.stringify({ permissions: 'full-permissions' }),
      description: 'full-permissions',
    })

    const userRole = await Role.create({
      name: 'user',
      createdBy: admin.id,
      setting: JSON.stringify({ permissions: 'no-permissions' }),
      description: 'full-permissions',
    })

    admin.roleId = adminRole.id
    await admin.save()

    user.roleId = userRole.id
    await user.save()
  }
}
