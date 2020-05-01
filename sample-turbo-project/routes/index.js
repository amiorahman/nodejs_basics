// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()

const profiles = {

	arahman: {
		username: 'arahman',
		name: 'amio',
		image: '/images/amio.jpg',
		hobby: 'cycling',
		languages: ['python', 'c#']
	},

	talam: {
		username: 'talam',
		name: 'pussy',
		image: '/images/tapos.jpg',
		hobby: 'putkimara',
		languages: ['python', 'java']
	}

}

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})

/*router.get('/:path', (req, res) =>{
	const path = req.params.path

	res.json({
		data:path
	})
})*/

router.post('/addprofile', (req, res) =>{

	const body = req.body // from a form
	body['Languages'] = req.body.Languages.split(', ')

	const data = {
		name: body.Name,
		hobby: body.Hobby,
		languages: body.Languages
	}

	profiles[body.Username] = data

	res.redirect('/profile/'+body.Username)
	/*res.json({
		confirmation: 'success',
		route: 'register',
		data: body
	})*/
})


router.get('/:profile/:username', (req, res) =>{

	const profile = req.params.profile
	const username = req.params.username
	const current_profile = profiles[username]

	if(current_profile == null){
		res.json({
			comfirmation: 'Failed!',
			message: 'Profile ' + username + ' not found!'
		})
	return
	}

	current_profile['timestamp']= req.timestamp
	res.render('profile', current_profile)
})

router.get('/profiles', (req, res) =>{

	const keys = Object.keys(profiles)
	const list = []

	const timestamp = new Date()

	keys.forEach(key =>{
		list.push(profiles[key])
	})

	const data = {
		profiles: list,
		timestamp: req.timestamp
	}

	res.render('profiles', data)
})

router.get('/query', (req, res) =>{

	const name = req.query.name
	const hobby = req.query.hobby

	const data = {
		name: name,
		hobby : hobby
	}

	res.render('profile', data)
})

router.post('/post', (req, res) =>{

	const body = req.body // from a form

	res.json({
		confirmation: 'success',
		data: body
	})
})

/*  This route render json data 
router.get('/json', (req, res) => {
	res.json({
		confirmation: 'success',
		app: process.env.TURBO_APP_ID,
		data: 'this is a sample json route.'
	})
})

/*  This route sends text back as plain text. 
router.get('/send', (req, res) => {
	res.send('This is the Send Route')
})

/*  This route redirects requests to Turbo360. 
router.get('/redirect', (req, res) => {
	res.redirect('https://www.turbo360.co/landing')
})
*/

module.exports = router
