
var http = require('http');

this.server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

this.server.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

exports.listen = function () {
  this.server.listen.apply(this.server, arguments);
};

