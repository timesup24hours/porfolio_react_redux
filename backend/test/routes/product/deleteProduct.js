import request from 'supertest'

export default (app, test) => {

  test('# DELETE /api/product # should delete successfully', t => {
    request(app)
      .delete('/api/product')
      .set('x-access-token', app.get('token'))
      .expect('Content-Type', /json/)
      .send({ id: app.get('product1ID') })
      .expect(202)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { success: true, productId: app.get('product1ID') }

        t.error(err, 'No error')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })

  })

  test('# DELETE /api/product # should not pass without the req.body.id', t => {
    request(app)
      .delete('/api/product')
      .set('x-access-token', app.get('token'))
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { error: 'product id is required' }

        t.error(err, 'No error')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })

  })

  test('# DELETE /api/product # should not pass with not existing product', t => {
    request(app)
      .delete('/api/product')
      .set('x-access-token', app.get('token'))
      .expect('Content-Type', /json/)
      .send({ id: '58e091c22f3512c049118ead' })
      .expect(400)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { error: 'fail to delete, could not find the product' }

        t.error(err, 'No error')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })

  })

}
