const main = require('../controllers/main.js')
const users = require('../controllers/users.js')
const schedules = require('../controllers/schedules.js')
const workers = require('../controllers/workers.js')
const shifts = require('../controllers/shifts.js')

module.exports = function(app) {
	app.get('/', main.index)

	app.get(
		'/schedules/:url_name/build/:year/:month/:day/:duration',
		schedules.buildSchedule,
	)
	app.get('/schedules/:url_name', schedules.getBasicInfo)

	app.post('/login', main.login)
	app.post('/logout', main.logout)
	app.post('/users', users.add)
	app.get('/schedules/:url_name/workers', workers.getAll)

	app.use(userAuth)

	app.get('/users/:id', users.getOne)
	app.post('/schedules', schedules.add)

	app.post('/schedules/:url_name/workers', workers.add)
	app.patch('/schedules/:url_name/workers/:worker_id', workers.edit)
	app.delete('/schedules/:url_name/workers/:worker_id', workers.delete)

	app.get('/schedules/:url_name/workers/:worker_id/shifts', shifts.getAll)
	app.post('/schedules/:url_name/workers/:worker_id/shifts', shifts.add)
	app.patch(
		'/schedules/:url_name/workers/:worker_id/shifts/:shift_id',
		shifts.edit,
	)
	app.delete(
		'/schedules/:url_name/workers/:worker_id/shifts/:shift_id',
		shifts.delete,
	)
}

function userAuth(req, res, next) {
	if (req.session.user) {
		next()
	} else {
		res.status(404).send('Page not found.')
	}
}
