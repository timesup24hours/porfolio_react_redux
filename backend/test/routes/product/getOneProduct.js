import request from 'supertest'

export default (app, test) => {

  test('# GET /api/products/:id # should get one product', t => {
    request(app)
      .get(`/api/products/${app.get('product1ID')}`)
      .expect(200)
      .end((err, res) => {
        const actualBody = res.body

        t.error(err, 'No error')
        t.ok(actualBody.success, 'Retrieved body')
        t.ok(actualBody.product, 'Retrieved product')
        t.ok(actualBody.product._id, 'Retrieved product id')
        t.deepEqual(actualBody.product._id, app.get('product1ID'), 'Retrieved same prodcut')
        t.end()
      })
  })

  test('# GET /api/products/:id # should not pass with not existing product', t => {
    request(app)
      .get(`/api/products/58e069585051ccbc9ec1a3d1`)
      .expect(400)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { success: false }

        t.error(err, 'No error')
        t.notOk(actualBody.success, 'Retrieved body without success')
        t.notOk(actualBody.product, 'Retrieved body without product')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })
  })

}
