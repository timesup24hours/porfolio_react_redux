import request from 'supertest'

const data = {
  nickname: 'test',
  email: 'test@test.com',
  street: '123 test st',
  city: 'Test',
  state: 'TE',
  zipcode: '12345',
  cellphone: '123 123 1234',
  homephone: '123 123 1234',
  workphone: '123 123 1234'
}

export default (app, test) => {
  test('# PUT /api/userInfoChange # should change user info with giving info', (t) => {
    request(app)
      .put('/api/userInfoChange')
      .set('x-access-token', app.get('token'))
      .send(data)
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = data

        t.error(err, 'No error')
        t.ok(actualBody.user.address, 'address property included')
        t.ok(actualBody.token, 'token included');
        t.notOk(actualBody.password, 'No password included');
        t.end()
      })
  })

  test('# PUT /api/userInfoChange # should return 401 with no login', (t) => {
    request(app)
      .put('/api/userInfoChange')
      .send(data)
      .expect(401)
      .end((err, res) => {

        t.error(err, 'No error')
        t.end()
      })
  })
}
