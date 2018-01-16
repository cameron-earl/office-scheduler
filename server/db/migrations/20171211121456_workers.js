exports.up = (knex, Promise) => {
	return knex.schema.createTable('workers', table => {
		table.increments()
		table.string('first_name').notNullable()
		table.string('last_name').notNullable()
		table.boolean('is_training').defaultTo(false)
		table
			.integer('schedule_id')
			.notNullable()
			.references('id')
			.inTable('schedules')
			.onDelete('CASCADE')
			.index()
		table
			.integer('user_id')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.index()
		table.timestamps(true, true)
	})
}

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('workers')
}
