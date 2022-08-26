const assert = require('assert');
const request = require('supertest');

describe('address book API should have endpoints to', () => {
  it('get contact database', function(done) {
    // arrange
    const api = require('./api.js');
  
    // act and assert
    request(api.app) // is where we let supertest know about the exported app
    .get('/api/addressbook') // to issue an HTTP GET
    .set('Accept', 'application/json') //  to set headers etc
    .expect('Content-Type', /json/) // check returned content type is json.
    .expect((res) => {
      assert.strictEqual(res.status, 200);
    })
    .expect(200, done); // checks the status code.
  });
    it('get contact', function(done) {
        // arrange
        const api = require('./api.js');
      
        // act and assert
        request(api.app) // is where we let supertest know about the exported app
        .get('/api/addressbook/Robert Bish') // to issue an HTTP GET
        .set('Accept', 'application/json') //  to set headers etc
        .expect('Content-Type', /json/) // check returned content type is json.
        .expect((res) => {
          assert.strictEqual(res.body.name, "Robert Bish");
        })
        .expect(200, done); // checks the status code.
      });
});