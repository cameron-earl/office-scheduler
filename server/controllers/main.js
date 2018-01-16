const knex = require('../db/knex.js')
const encryption = require('../config/encryption.js')

module.exports = {
	index: function(req, res) {
		console.log('PATH: ', req.route.path, 'index')
		let message = { message: req.session.message }
		req.session.message = null
		req.session.save(err => {
			res.render('pages/index', message)
		})
	},

	login: async function(req, res) {
		console.log('PATH: ', req.route.path, 'login')
		try {
			const resultArr = await knex('users')
				.where('email', req.body.email)
				.limit(1)
			const user = resultArr[0]
			if (user) {
				//existing user
				const isValid = await encryption.check(user, req.body)
				if (isValid) {
					//correct password
					req.session.user = user.id
					res.redirect(`/users/${user.id}`)
				} else {
					// incorrect password
					res.status(401).send('You entered an incorrect email or password.')
				}
			} else {
				// user not registered
				res.status(401).send('You entered an incorrect email or password.')
			}
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	},

	logout: function(req, res) {
		console.log('PATH: ', req.route.path, 'logout')
		req.session.user = null
		res.status(200).send(`Logged out.`)
	},

	//full example: galvanize/q2/projects/travelDash
}
