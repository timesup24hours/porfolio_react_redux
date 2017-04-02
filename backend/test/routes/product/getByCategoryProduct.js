import request from 'supertest'

export default (app, test) => {

  test('# GET /api/get_products_by_category/:category # should get product with provided category', t => {
    request(app)
      .get(`/api/get_products_by_category/${app.get('product1Category')}`)
      .expect(200)
      .end((err, res) => {
        const actualBody = res.body

        t.error(err, 'No error')
        t.ok(actualBody.success, 'Retrieved body with succeess property')
        t.ok(actualBody.products, 'Retrieved body with succeess products')
        t.deepEqual(actualBody.products[0].category, app.get('product1Category'), 'Retrieved body with same category')
        t.end()
      })
  })

  test('# GET /api/get_products_by_category/:category # should not pass with not existing category', t => {
    request(app)
      .get(`/api/get_products_by_category/notExistingCategory`)
      .expect(400)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { success: false, error: 'no such category' }

        t.error(err, 'No error')
        t.deepEqual(actualBody.success, false,  'Retrieved body with succeess: false')
        t.ok(actualBody.error, 'Retrieved body with error')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })
  })

}
