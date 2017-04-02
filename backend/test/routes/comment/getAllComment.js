import request from 'supertest'

export default (app, test) => {

  test('# GET /api/comment # should get all comments', (t) => {
    request(app)
      .get('/api/comment')
      .expect(200)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { success: true, comments: [] }

        t.error(err, 'No error')
        t.deepEqual(res.body.success, expectedBody.success, 'Retrieved body with success property')
        t.ok(actualBody.comments[0].comment, 'Retrieved comment info')
        t.ok(actualBody.comments[0].user._id, 'Retrieved user _id')
        t.end()
      })

  })

}
