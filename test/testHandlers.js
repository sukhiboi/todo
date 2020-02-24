const app = require('./../lib/routes');
const request = require('supertest');

describe.skip('/getTodos', () => {
  it('should response back with todos', done => {
    request(app)
      .get('/getTodos')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect('Content-Length', '2')
      .expect(200)
      .expect('[]', done);
  });
});

describe.skip('/bad', () => {
  it('should response back with 404 not found', done => {
    request(app)
      .get('/bad')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '142')
      .expect(404)
      .expect(/Cannot GET \/bad/, done);
  });
});
