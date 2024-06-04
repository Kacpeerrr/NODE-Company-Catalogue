//Pobieramy model użytkownika
const User = require('../../db/models/user')

class UserController {
	async login(req, res) {
		try {
			const user = await User.findOne({ email: req.body.email })
			if (!user) {
				throw new Error('User not found')
			}

			const isValidPassword = user.comparePassword(req.body.password)
			if (!isValidPassword) {
				throw new Error('Password not valid')
			}
			res.status(200).json({ apiToken: user.apiToken })
		} catch (e) {
			res.sendStatus(401)
		}
	}
}

//Eksportujemy
module.exports = new UserController()
