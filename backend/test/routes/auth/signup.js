// npm packages
import request from 'supertest';


export default (app, test) => {
  test('# POST /api/signup # should signup with given username and password', (t) => {
    request(app)
      .post('/api/signup')
      .send({ username: 'test', password: '123', passwordConfirm: '123' })
      .expect(201)
      .end((err) => {
        t.error(err, 'No error');
        t.end();
      });
  });

  test('# POST /api/signup # should register second user with given username and password', (t) => {
    request(app)
      .post('/api/signup')
      .send({ username: 'test2', password: '123', passwordConfirm: '123' })
      .expect(201)
      .end((err) => {
        t.error(err, 'No error');
        t.end();
      });
  });

  test('# POST /api/signup # should fail to register with same username', (t) => {
    request(app)
      .post('/api/signup')
      .send({ username: 'test', password: 'aaa', passwordConfirm: 'aaa' })
      .expect(409)
      .end((err, res) => {
        const expectedBody = 'This username is already taken!'
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve body');
        t.end();
      });
  });

  test('# POST /api/signup # should fail to register with mismatching passwords', (t) => {
    request(app)
      .post('/api/signup')
      .send({ username: 'test3', password: '123', passwordConfirm: '321' })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = { error: 'validation fail' };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve body');
        t.end();
      });
  });
};
