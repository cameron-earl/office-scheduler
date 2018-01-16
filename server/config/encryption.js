const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

module.exports = {
	hash: async function(user) {
		try {
			const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
			const hash = await bcrypt.hash(user.password, salt)
			const encryptedUser = { ...user, password: hash }
			return encryptedUser
		} catch (err) {
			console.log(err)
			return err
		}
	},

	check: function(encryptedUser, user) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(user.password, encryptedUser.password, function(
				err,
				isMatch,
			) {
				if (err) reject(err)
				resolve(isMatch)
			})
		})
	},
}
