exports.up = (knex, Promise) => {
	return knex.schema.createTable('schedules', table => {
		table.increments()
		table
			.string('url_name', 20)
			.notNullable()
			.unique()
		table.string('display_name').notNullable()
		table
			.integer('week_start')
			.defaultTo(1)
			.comment('1 is Sunday, 7 is Saturday')
		table.boolean('is_private').defaultTo(false)
		table.string('timezone').comment('Not yet implemented')
		table.timestamps(true, true)
	})
}

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('schedules')
}
