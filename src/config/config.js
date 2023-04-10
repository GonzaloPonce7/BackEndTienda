import dotenv from 'dotenv'

dotenv.config()

export default{
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DB_NAME,
    clientIDGoogle: process.env.CLIENT_ID_GOOGLE,
    clientSecretGoggle: process.env.CLIENT_SECRET_GOOGLE,
    clientIDGithub: process.env.CLIENT_ID_GITHUB,
    clientSecretGithub: process.env.CLIENT_SECRET_GITHUB,
    env: process.env.NODE_ENV
}