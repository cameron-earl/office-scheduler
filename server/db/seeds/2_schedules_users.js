exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('schedules_users')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('schedules_users').insert([
				{ is_admin: true, can_edit: true, schedule_id: 1, user_id: 1 },
			])
		})
}
