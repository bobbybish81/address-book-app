const assert = require('assert');
const request = require('supertest');

describe('address book API should have endpoints to', () => {
    it('get all contacts', function(done) {
        // arrange
        const api = require('./api.js');
      
        // act and assert
        request(api.app) // is where we let supertest know about the exported app
          .post('/api/developers') // to issue an HTTP GET
          .set('Accept', 'application/json') //  to set headers etc
          .send({name: 'Henry Dev', email: 'henry@salt.dev'}) // the data you want to post
          .expect('Content-Type', /json/) // check returned content type is json.
          .expect('location', /\/api\/addressbook\//) // location header is set to something starting with /api/developers
          .expect((res) => {
            assert.strictEqual(res.body.name, "Robert Bish");
          })
          .expect(201, done); // checks the status code.
      });
});