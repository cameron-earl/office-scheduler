exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('standard_schedule_shifts')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('standard_schedule_shifts').insert([])
		})
}
