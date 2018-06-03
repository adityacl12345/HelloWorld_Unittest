var server = require('../hello');
var assert = require('assert'),
    http = require('http');
describe('server', function () {
  before(function () {
    server.listen(3000);
  });
  describe('Http request from local-host', function () {
    it('should return 200', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('should say "Hello World"', function (done) {
        http.get('http://localhost:3000', function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                assert.equal('Hello World', data);
                done();
            });
        });
    });
  });
});


