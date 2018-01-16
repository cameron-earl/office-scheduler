const knex = require('../db/knex.js')

module.exports = {
	getBasicInfo: async function(req, res) {
		console.log('PATH: ', req.route.path, 'getBasicInfo')
		try {
			const schedule = await knex('schedules')
				.where('url_name', req.params.url_name)
				.limit(1)
			res.status(200).json(schedule)
		} catch (err) {
			console.log(err)
			res.status(400).send('Error: Could not get schedule.')
		}
	},

	buildSchedule: async function(req, res) {
		console.log('PATH: ', req.route.path, 'buildSchedule')
		const { url_name, year, month, day, duration } = req.params
		try {
			const scheduleArr = await knex('schedules')
				.where('url_name', url_name)
				.limit(1)
			if (!scheduleArr.length) return res.sendStatus(404)
			const schedule = scheduleArr[0]
			const workerPromises = await knex('workers')
				.select('id', 'first_name', 'last_name', 'is_training', 'user_id')
				.where('schedule_id', schedule.id)
			const workers = await workerPromises.map(async worker => {
				worker.shifts = await knex('shifts')
					.select('id', 'start', 'end')
					.where('worker_id', worker.id)
				//TODO only get shifts within duration!
				worker.standardShifts = await knex('standard_worker_shifts').where(
					'worker_id',
					worker.id,
				)
				return worker
			})
			schedule.workers = await Promise.all(workers)
			// console.log('schedule built', schedule)
			res.json(schedule)
		} catch (err) {
			console.log(err)
			res.status(400).send('Failed to build schedule.')
		}
	},

	add: async function(req, res) {
		console.log('PATH: ', req.route.path, 'add')
		const schedule = {
			display_name: req.body.display_name,
			url_name: req.body.url_name,
			week_start: req.body.week_start,
		}
		const user_id = req.body.user_id
		try {
			const insertResponse = await knex('schedules').insert(schedule)
			const scheduleArr = await knex('schedules').where(
				'url_name',
				schedule.url_name,
			)
			const schedule_id = scheduleArr[0].id
			const insertResponse2 = await knex('schedules_users').insert({
				user_id,
				schedule_id,
				is_admin: true,
				can_edit: true,
			})
			res.redirect(`/users/${user_id}`)
		} catch (err) {
			console.log(err)
			res
				.status(400)
				.send('Could not add schedule. Please choose a different URL name.')
		}
	},
}
