import 'dotenv/config'

export default{
    port: 1337,
    host: 'localhost',
    dbUri: process.env.MONGO_URI,
    saltWorkFactor: 10,
}