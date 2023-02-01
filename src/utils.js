import {fileURLToPath } from 'url'
import {dirname} from 'path'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'

const PRIVATE_KEY = 'asd123'

//Github auth app
// Owned by: @GonzaloPonce7
// App ID: 288491
// Client ID: Iv1.a78369e0858dcb88
// Client secret: de5a7d01ce6361079c9a3ddd5977d4f4fedc2ab4

//Google auth app
// ClientID: 27281791633-dc0bt9nqc9o2riajien1uvchgbk2clac.apps.googleusercontent.com
// Client secret: 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

//hashSync: toma el password y salt para "hashear"
//genSaltSync: Genera un salt (un string aleatorio)
//El password no se puede volver a obtener por ningun metodo. Irreversible.
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => {
    return bcrypt.compare(password, user.password)
    //compareSync
}

export const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '11h'})
    return token
}

export const authToken = (req, res, next) => {
    const authHeaders = req.headers.auth
    if(!authHeaders) {
        return res.status(401).send({error: 'Sin autorizacion'})
    }

    const token = authHeaders.split(' ')[1] //Bearer ${token}
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: 'Sin autorizacion'})
        req.user = credentials.user
        next()
    })
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname