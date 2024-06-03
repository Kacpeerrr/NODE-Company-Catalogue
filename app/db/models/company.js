const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { checkForbidenString } = require('../validators')

const companySchema = new Schema({
	slug: {
		type: String,
		required: [true, 'Pole slug jest wymagane'],
		minLength: [3, 'Minimalna liczba znaków to 3'],

		validate: value => {
			if (value === 'slug') {
				throw new Error('Nazwa "slug" jest zakazana')
			}
		},
		trim: true,
		lowercase: true,
	},
	name: {
		type: String,
		required: [true, 'Pole name jest wymagane'],
	},
	employeesCount: {
		type: Number,
		min: 1,
		default: 1,
	},
	
	user: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company
