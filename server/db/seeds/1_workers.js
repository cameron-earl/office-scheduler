exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('workers')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('workers').insert([
				{ first_name: 'Bob', last_name: 'Roberts', schedule_id: 1 },
				{ first_name: 'Jimmy', last_name: 'Dean', schedule_id: 1 },
				{ first_name: 'King', last_name: 'Kong', schedule_id: 1 },
				{ first_name: 'Franz', last_name: 'Ferdinand', schedule_id: 1 },
				{ first_name: 'Barbara', last_name: 'Walters', schedule_id: 1 },
			])
		})
}
