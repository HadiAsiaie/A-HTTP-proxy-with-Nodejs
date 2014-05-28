var fs = require('fs');
var https = require('https');

var options = {
    key: fs.readFileSync('my_key.pem'),
    cert: fs.readFileSync('my_cert.pem')
};

var server = https.createServer(options, function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
    console.log("hey");
});
port=8001;
console.log('listening on port '+port.toString());
server.listen(port);
