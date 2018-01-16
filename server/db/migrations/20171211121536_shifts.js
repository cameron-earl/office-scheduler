exports.up = (knex, Promise) => {
	return knex.schema.createTable('shifts', table => {
		table.increments()
		table.timestamp('start').notNullable()
		table.timestamp('end').notNullable()
		table
			.integer('worker_id')
			.notNullable()
			.references('id')
			.inTable('workers')
			.onDelete('CASCADE')
			.index()
		table.timestamps(true, true)
	})
}

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('shifts')
}
