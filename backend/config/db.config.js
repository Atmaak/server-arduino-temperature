require('dotenv').config()

module.exports = {
    db_name: process.env.db_name,
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    dialect: 'mysql',
    dialectOptions: {
		charset: 'utf8mb4', // Set the appropriate character encoding here
		collate: 'utf8mb4_unicode_ci', // Set the appropriate collation here
	},
}