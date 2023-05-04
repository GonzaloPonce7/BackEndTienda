import chai from "chai";
import supertest from 'supertest';
import { faker } from '@faker-js/faker'


const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')


describe('Registro y Login', () => {
    let cookie;

    const mockUser = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'secret'
    }

    it('Debe registrar un usario', async () => {
        const { _body } = await requester.post('/sessions/register').send(mockUser)

        expect(_body.payload).to.be.ok
    })

    it('Debe loguear un user y DEVOLVER UNA COOKIE', async () => {
        const result = await requester.post('/sessions/login').send({
            email: mockUser.email, password: mockUser.password
        })

        //COOKIE_NAME=COOKIE_VALUE
        const cookieResult = result.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok 
        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1]
        }

        expect(cookie.name).to.be.ok.and.eql('birraCookie')
        expect(cookie.value).to.be.ok

    })

    // it('enviar cookie para ver el contenido del usuario', async () => {
    //     const {_body} = await requester.get('/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
        
    //     expect(_body.payload.email).to.be.eql(mockUser.email)
    // })
})
