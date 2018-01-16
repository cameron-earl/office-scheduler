exports.up = (knex, Promise) => {
	return knex.schema.createTable('users', table => {
		table.increments()
		table.string('first_name').notNullable()
		table.string('last_name').notNullable()
		table
			.string('email')
			.notNullable()
			.unique()
		table.string('password').notNullable()
		table.timestamps(true, true)
	})
}

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('users')
}
