const knex = require('../db/knex.js')
const encryption = require('../config/encryption.js')

module.exports = {
	getAll: async function(req, res) {
		console.log('PATH: ', req.route.path, 'get')
		const url_name = req.params.url_name
		try {
			const scheduleArr = await knex('schedules')
				.where('url_name', url_name)
				.limit(1)
			const schedule = scheduleArr[0]
			const workers = await knex('workers').where('schedule_id', schedule.id)
			res.status(200).json(workers)
		} catch (err) {
			console.log(err)
			res.status(400).send('Error: Could not get workers.')
		}
	},

	add: async function(req, res) {
		console.log('PATH: ', req.route.path, 'add')
		// console.log(JSON.stringify(req.body, null, 2))
		const url_name = req.params.url_name
		let newWorker = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			is_training: !!req.body.is_training,
		}
		try {
			const scheduleArr = await knex('schedules').where('url_name', url_name)
			const schedule_id = scheduleArr[0].id
			newWorker.schedule_id = schedule_id
			await knex('workers').insert(newWorker)
			res.redirect(`/schedules/${url_name}/workers`)
		} catch (err) {
			console.log(err)
			res.status(400).send('Error: Could not add worker.')
		}
	},

	edit: async function(req, res) {
		console.log('PATH: ', req.route.path, 'editWorker')
		const propWorker = req.body
		const url_name = req.params.url_name
		let worker = {
			id: req.params.worker_id,
			first_name: propWorker.first_name,
			last_name: propWorker.last_name,
			is_training: !!propWorker.is_training,
			schedule_id: propWorker.schedule_id,
			user_id: propWorker.user_id,
		}
		try {
			const result = await knex('workers')
				.where('id', worker.id)
				.update(worker)
			res.redirect(303, `/schedules/${url_name}/workers`)
		} catch (err) {
			console.log(err)
			res.status(400).send('Error: Could not update worker.')
		}
	},

	delete: async function(req, res) {
		console.log('PATH: ', req.route.path, 'deleteWorker')
		const { url_name, worker_id } = req.params
		try {
			const result = await knex('workers')
				.where('id', worker_id)
				.del()
			res.redirect(303, `/schedules/${url_name}/workers`)
		} catch (err) {
			console.log(err)
			res.status(400).send('Error: Could not delete worker.')
		}
	},
}
