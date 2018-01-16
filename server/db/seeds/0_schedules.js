exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('schedules')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('schedules').insert([
				{ url_name: 'test', display_name: 'Test' },
			])
		})
}
