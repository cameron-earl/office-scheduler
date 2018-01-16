const encryption = require('../../config/encryption.js')

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
			const user = {
				email: 'bob@bob.com',
				password: 'bobbobbob',
				first_name: 'Bob',
				last_name: 'Bobberson',
			}
			encryption.hash(user).then(encryptedUser => {
				// console.log(JSON.stringify(encryptedUser, null, 2))
				return knex('users').insert([encryptedUser])
			})
		})
}
