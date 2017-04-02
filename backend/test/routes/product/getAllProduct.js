import request from 'supertest'

export default (app, test) => {

  test('# GET /api/products # should get all products', t => {
    request(app)
      .get('/api/products')
      .expect(200)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = {}

        t.error(err, 'No error')
        t.ok(actualBody.success, 'Retrieved body')
        t.ok(actualBody.products, "Retrieved products")
        t.end()
      })
  })

}
