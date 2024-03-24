import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up () {
    this.schema.dropTableIfExists(this.tableName)
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name')
      table.json('setting').nullable()
      table.text('description').nullable()

      // FK
      table.string('created_by')    // reference on users table

      // ts
      table.timestamp('deleted_at', { useTz: true }).nullable()
      table.timestamps(true, true)

      // indices
      table.index(['created_by'],      `index_${this.tableName}_on_created_by`)
      table.index(['created_at'],      `index_${this.tableName}_created_at`)
      table.index(['updated_at'],      `index_${this.tableName}_updated_at`)
      table.index(['deleted_at'],      `index_${this.tableName}_deleted_at`)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
