const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000
app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		credentials: true, // enable set cookie
	}),
)
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

require('./config/session.js')(app)

app.set('view engine', 'ejs')

const routes_setter = require('./config/routes.js')
routes_setter(app)

app.listen(port, () => console.log(`It's port ${port} and ALLLLL'S WELLLLL!`))
