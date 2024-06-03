const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { validateEmail } = require('../validators')

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email jest wymagany'],
		lowercase: true,
		trim: true,
		unique: true,
		validate: [validateEmail, 'Email nieprawidłowy'],
	},
	password: {
		type: String,
		required: true,
		minLength: [4, 'Hasło powinno posiadać min. 4 znaki'],
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	}
})

userSchema.pre('save', function (next) {
	const user = this
	if (!user.isModified('password')) {
		return next()
	} else {
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(user.password, salt)
		user.password = hash
		next()
	}
})

userSchema.post('save', function (error, doc, next) {
	if (error.code === 11000) {
		error.errors = { email: { message: 'Taki email jest już zajęty' } }
	}
	next(error)
})


userSchema.methods = {
	comparePassword(password) {
		return bcrypt.compareSync(password, this.password)
	},
}

userSchema.virtual('fullName').get(function(){
	if(this.firstName && this.lastName){
	return `${this.firstName} ${this.lastName[0]}.`;
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User
