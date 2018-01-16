const knex = require('../db/knex.js')
const encryption = require('../config/encryption.js')

module.exports = {
	getAll: async function(req, res) {
		console.log('PATH: ', req.route.path, 'get')
		const { url_name, worker_id } = req.params
		try {
			const shifts = await knex('shifts').where('worker_id', worker_id)
			res.status(200).json(shifts)
		} catch (err) {
			console.log(err)
			res.status(400).send('Error: Could not get shifts.')
		}
	},

	add: async function(req, res) {
		console.log('PATH: ', req.route.path, 'add')
		const { url_name, worker_id } = req.params
		let newShift = {
			start: req.body.start,
			end: req.body.end,
			worker_id,
		}
		try {
			await knex('shifts').insert(newShift)
			res.redirect(`/schedules/${url_name}/workers/${worker_id}/shifts`)
		} catch (err) {
			console.log(err)
			res.status(400).send('Error: Could not add shift.')
		}
	},

	edit: async function(req, res) {
		console.log('PATH: ', req.route.path, 'edit')
		const propShift = req.body
		const { url_name, worker_id, shift_id } = req.params
		let shift = {
			id: shift_id,
			start: propShift.start,
			end: propShift.end,
		}
		try {
			const result = await knex('shifts')
				.where('id', shift_id)
				.update(shift)
			res.redirect(303, `/schedules/${url_name}/workers/${worker_id}/shifts`)
		} catch (err) {
			console.log(err)
			res.status(400).send('Error: Could not update shift.')
		}
	},

	delete: async function(req, res) {
		console.log('PATH: ', req.route.path, 'delete')
		const { url_name, worker_id, shift_id } = req.params
		try {
			const result = await knex('shifts')
				.where('id', shift_id)
				.del()
			res.redirect(303, `/schedules/${url_name}/workers/${worker_id}/shifts`)
		} catch (err) {
			console.log(err)
			res.status(400).send('Error: Could not delete shift.')
		}
	},
}
