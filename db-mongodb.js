const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://localhost:27017'
const dbName = 'company-catalogue'
const client = new MongoClient(url)

async function main() {
	await client.connect
	console.log('Połączenie udane')

	const db = client.db(dbName)

	const res = await db
		.collection('companies')
		.find({ _id: ObjectId('65dcbcc7fe4aeaec9a150e45') })
		.toArray()
	console.log(res)

}

main()
	.catch(ex => console.log('Coś poszło nie tak'))
	.finally(() => client.close())
