// npm packages
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { auth as authConfig } from '../../../config'


const comment = {
  comment: 'test'
}

const comment2 = {
  comment: 'test2'
}

export default (app, test) => {
  test('# POST /api/comment # should comment and respond the same body', (t) => {
    request(app)
      .post('/api/comment')
      .set('x-access-token', app.get('token'))
      .send(comment)
      .expect(201)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = comment
        app.set('comment1Id', actualBody.comment._id)

        t.equal(actualBody.comment.comment, expectedBody.comment, 'Retrieved body')
        t.end()
      })
  })

  test('# POST /api/comment # should comment with second user and respond the same body', (t) => {
    request(app)
      .post('/api/comment')
      .set('x-access-token', app.get('second-token'))
      .send(comment2)
      .expect(201)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = comment2
        app.set('comment2Id', actualBody.comment._id)

        t.deepEqual(actualBody.comment.comment, expectedBody.comment, 'Retrieved body')
        t.end()
      })
  })

  test('# POST /api/comment # should not comment with the wrong token', (t) => {
    request(app)
      .post('/api/comment')
      .set('x-access-token', 'wrong token')
      .send(comment)
      .expect(401)
      .end((err, res) => {
        const actualBody = res.body
        const expectedBody = {}

        t.error(err, 'No error');
        t.deepEqual(res.body, expectedBody, 'Retrieved empty object')
        t.end()
      })
  })

}
