var assert = require('assert'),
    https = require('https'),
    cf_url = 'https://hellocf.cfapps.us10.hana.ondemand.com/';
describe('Https request to SAP HANA cloud platform', function () {
  describe('/', function () {
    it('Status-Code = 200 OK', function (done) {
        https.get(cf_url, function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('Page says "Hello World"', function (done) {
        https.get(cf_url, function (res) {
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