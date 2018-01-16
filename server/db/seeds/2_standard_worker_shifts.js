exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('standard_worker_shifts')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('standard_worker_shifts').insert([])
		})
}
