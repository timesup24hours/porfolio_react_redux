import request from 'supertest'

export default (app, test) => {

  test('# PUT /api/comment # request body.id is required', (t) => {
    request(app)
      .put('/api/comment')
      .set('x-access-token', app.get('token'))
      .send({ comment: 'test' })
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { errors: { id: 'Id is required!' } }

        t.error(err, 'No error')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })
  })

  test('# PUT /api/comment # request body.comment is required', (t) => {
    request(app)
      .put('/api/comment')
      .set('x-access-token', app.get('token'))
      .send({ id: '123' })
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { errors: { comment: 'Comment is required!' } }

        t.error(err, 'No error')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })
  })

  test('# PUT /api/comment # should edit self comment', (t) => {
    const comment = 'edited comment'
    request(app)
      .put('/api/comment')
      .set('x-access-token', app.get('token'))
      .send({ id: app.get('comment1Id'), comment })
      .expect(201)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { success: true, comment: {} }

        t.error(err, 'No error')
        t.ok(actualBody.success, 'Retrieved body with success property')
        t.deepEqual(actualBody.comment.comment, comment, 'Retrieved body')
        t.end()
      })
  })

  test('# PUT /api/comment # should not edit else comment', (t) => {
    const comment = 'edited comment'
    request(app)
      .put('/api/comment')
      .set('x-access-token', app.get('second-token'))
      .send({ id: app.get('comment1Id'), comment })
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { errors: { auth: 'You have no right to change this comment!' } }

        t.error(err, 'No error')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })
  })

}
