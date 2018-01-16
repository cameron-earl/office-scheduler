exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('shifts')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('shifts').insert([
				{
					start: '2017-12-11 07:00 -07',
					end: '2017-12-11 15:30 -07',
					worker_id: 1,
				},
				{
					start: '2017-12-12 07:00 -07',
					end: '2017-12-12 15:30 -07',
					worker_id: 1,
				},
				{
					start: '2017-12-13 07:00 -07',
					end: '2017-12-13 15:30 -07',
					worker_id: 1,
				},
				{
					start: '2017-12-14 07:00 -07',
					end: '2017-12-14 15:30 -07',
					worker_id: 1,
				},
				{
					start: '2017-12-15 07:00 -07',
					end: '2017-12-15 15:30 -07',
					worker_id: 1,
				},
				{
					start: '2017-12-11 14:30 -07',
					end: '2017-12-11 23:00 -07',
					worker_id: 2,
				},
				{
					start: '2017-12-12 14:30 -07',
					end: '2017-12-12 23:00 -07',
					worker_id: 2,
				},
				{
					start: '2017-12-13 14:30 -07',
					end: '2017-12-13 23:00 -07',
					worker_id: 2,
				},
				{
					start: '2017-12-14 14:30 -07',
					end: '2017-12-14 23:00 -07',
					worker_id: 2,
				},
				{
					start: '2017-12-15 14:30 -07',
					end: '2017-12-15 23:00 -07',
					worker_id: 2,
				},
			])
		})
}
