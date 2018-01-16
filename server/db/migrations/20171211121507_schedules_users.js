exports.up = (knex, Promise) => {
	return knex.schema.createTable('schedules_users', table => {
		table.increments()
		table.boolean('is_admin').defaultTo(false)
		table.boolean('can_edit').defaultTo(false)
		table
			.integer('schedule_id')
			.notNullable()
			.references('id')
			.inTable('schedules')
			.onDelete('CASCADE')
			.index()
		table
			.integer('user_id')
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.index()
		table.timestamps(true, true)
	})
}

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('schedules_users')
}
