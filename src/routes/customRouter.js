import { Router } from "express";

export default class customRouter {

    constructor() {
        this.router = Router()
        this.init()
    }

    getROuter() {
        return this.router
    }

    init(){}

    get(path, ...callbacks) {
        this.router.get(path, this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callbacks) => async(...params) => {
            try {
                //params (req, res, next)
                //aplly aounta directamente a la funcon callback
                //this es para que se utilize en el contexto de la clase Router
                await callbacks.applu(this, params)
            } catch(error) {
                console.error(error)
                //params[1] es el parametro res
                params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = payload => res.send({status: 'success', payload})
        res.sendServerError = error => res.status(500).send({status: 'error', error})
        res.sendUserError = error => res.status(400).send({status: 'error', error})

        next()
    }
}