const knex = require('../db/knex.js')
const encryption = require('../config/encryption.js')

module.exports = {
	getOne: async function(req, res) {
		console.log('PATH: ', req.route.path, 'getOne')
		const userId = req.params.id
		try {
			const promises = await Promise.all([
				knex('schedules_users')
					.select(
						'schedules_users.is_admin',
						'schedules_users.can_edit',
						'schedules.id',
						'schedules.url_name',
						'schedules.display_name',
						'schedules.week_start',
						'schedules.is_private',
						'schedules.timezone',
					)
					.where('user_id', userId)
					.andWhere('is_admin', true)
					.innerJoin(
						'schedules',
						'schedules_users.schedule_id',
						'schedules.id',
					),

				knex('users').where('id', userId),
			])
			const schedules = promises[0]
			const user = promises[1][0]
			const userData = {
				id: userId,
				email: user.email,
				firstName: user.first_name,
				lastName: user.last_name,
				schedules,
			}
			res.status(200).json(userData)
		} catch (err) {
			console.log(err)
			res.status(404).send(err)
		}
	},

	add: async function(req, res) {
		console.log('PATH: ', req.route.path, 'add')
		const encryptedUser = await encryption.hash(req.body)
		try {
			const unknown = await knex('users').insert({
				first_name: encryptedUser.first_name,
				last_name: encryptedUser.last_name,
				email: encryptedUser.email,
				password: encryptedUser.password,
			})
			res.status(201).send(`User ${req.body.email} successfully registered.`)
		} catch (err) {
			console.log(err)
			res.status(400)
			if (err.code === '23505')
				res.send(`User ${req.body.email} already exists.`)
			else res.send(err.detail)
		}
	},
}
