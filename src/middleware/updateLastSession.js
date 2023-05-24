import { UsersRepository } from "../repository/usersRepository.js"
import { addLogger } from "../logger/index.js"

export const sessionsUpdater = async (req, res, next) => {
    const usersRepository = new UsersRepository()
    const userName = req.session.user?.email
    if(userName){
        let date = new Date()
        addLogger.info("Date: " + date)
        await usersRepository.sessionUpdater(userName, date)
    }
    next()
}