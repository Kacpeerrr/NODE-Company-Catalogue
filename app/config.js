require('dotenv').config()

module.exports = {
	port: process.env.PORT || 3000,
	database: process.env.DATABASE || 'mongodb://localhost:27017/company-catalogue',
	sessionKeySecret: process.env.SESSION_KEY_SECRET
}
