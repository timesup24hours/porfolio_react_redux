import request from 'supertest'

export default (app, test) => {
  test('# DELETE /api/comment/:id # should return 400 without req.body.commentId', (t) => {
    request(app)
      .delete('/api/comment/')
      .set('x-access-token', app.get('token'))
      .expect(404)
      .end((err, res) => {

        t.error(err, 'No error')
        t.end()
      })
  })

  test('# DELETE /api/comment/:id # should not delete else comment', (t) => {
    request(app)
      .delete(`/api/comment/${app.get('comment2Id')}`)
      .set('x-access-token', app.get('token'))
      .expect(401)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { error: 'no right to delete' }

        t.error(err, 'No error')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })
  })

  test('# DELETE /api/comment/:id # should delete comment successfully', (t) => {
    request(app)
      .delete(`/api/comment/${app.get('comment1Id')}`)
      .set('x-access-token', app.get('token'))
      .expect(202)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { deletedResult: 1, commentId: app.get('comment1Id') }

        t.error(err, 'No error')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })
  })

  test('# DELETE /api/comment/:id # should fail if comment does not exist', (t) => {
    request(app)
      .delete(`/api/comment/58da6048014d3b9cce28ddc0`)
      .set('x-access-token', app.get('token'))
      .expect(400)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = { error: 'comment has been deleted' }

        t.error(err, 'No error')
        t.deepEqual(actualBody, expectedBody, 'Retrieved body')
        t.end()
      })
  })
}
