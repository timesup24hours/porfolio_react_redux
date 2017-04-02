import request from 'supertest'

export default (app, test) => {
  const reqBody = {
    productId: '',
    quantity: 1,
  }

  test('# POST /api/cart # should not pass without req.body.productId', t => {
    // request(app)
    //   .post('/api/cart')
    //   .set('x-access-token', app.get('token'))
    //   .send()

  })

}
