// npm packages
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { auth as authConfig } from '../../../config'


export default (app, test) => {
  test('# POST /api/login # should login with existing username and password', (t) => {
    request(app)
      .post('/api/login')
      .send({ username: 'test', password: '123' })
      .expect(200)
      .end((err, res) => {
        const actualBody = res.body
        const actualBodyUser = JSON.parse(res.body.user)

        t.error(err, 'No error')
        t.ok(actualBodyUser, 'User exists')
        t.ok(actualBody.token, 'Token exists')

        const decodedUser = jwt.verify(actualBody.token, authConfig.jwtSecret)
        delete decodedUser.iat

        t.equal(actualBodyUser.local.username, 'test', 'Login matches request')
        t.notOk(actualBodyUser.local.password, 'No password included')
        t.deepEqual(actualBodyUser, decodedUser, 'User must match token')

        app.set('token', actualBody.token)
        app.set('user', actualBodyUser)

        t.end()
      })
  })

  test('# POST /api/login # should login with the second username:test2 ', (t) => {
    const secondUser = {
      username: 'test2',
      password: '123'
    }
    request(app)
      .post('/api/login')
      .send(secondUser)
      .expect(200)
      .end((err, res) => {
        const actualBody = res.body
        const actualBodyUser = JSON.parse(res.body.user)

        t.error(err, 'No error')
        t.ok(actualBodyUser, 'User exists')
        t.ok(actualBody.token, 'Token exists')

        const decodedUser = jwt.verify(actualBody.token, authConfig.jwtSecret)
        delete decodedUser.iat

        t.equal(actualBodyUser.local.username, secondUser.username, 'Login matches request')
        t.notOk(actualBodyUser.local.password, 'No password included')
        t.deepEqual(actualBodyUser, decodedUser, 'User must match token')

        app.set('second-token', res.body.token)
        app.set('second-user', res.body.token)

        t.end()
      })
  })

  test('# POST /api/login # should not login with the not existing username', (t) => {
    request(app)
      .post('/api/login')
      .send({ username: 'notExist', password: '123' })
      .expect(401)
      .end((err, res) => {

        t.error(err, 'No error')
        t.end()
      })
  })

  test('# POST /api/login # should not login with wrong password', (t) => {
    request(app)
      .post('/api/login')
      .send({ username: 'test', password: '321' })
      .expect(401)
      .end((err, res) => {
        
        t.error(err, 'No error')
        t.end()
      })
  })

}
