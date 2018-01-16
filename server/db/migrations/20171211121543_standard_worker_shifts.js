exports.up = (knex, Promise) => {
	return knex.schema.createTable('standard_worker_shifts', table => {
		table.increments()
		table
			.integer('day_start')
			.notNullable()
			.comment('1 is Sunday, 7 is Saturday')
		table.time('time_start').notNullable()
		table
			.integer('day_end')
			.notNullable()
			.comment('1 is Sunday, 7 is Saturday')
		table.time('time_end').notNullable()
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
	return knex.schema.dropTable('standard_worker_shifts')
}
