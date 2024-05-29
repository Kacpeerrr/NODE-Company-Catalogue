const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/node-kurs')

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
})

companySchema.path('slug').set(value => value.toLowerCase())

const Company = mongoose.model('Company', companySchema)

async function main() {
	const company = new Company({
		name: 'Probox',
		slug: '   ProBox',
		employeesCount: 1,
	})

	try {
		await company.save()
	} catch (e) {
		console.log('Coś poszło nie tak...')
		for (const key in e.errors) console.log(e.errors[key].message)
	}
}

main()
