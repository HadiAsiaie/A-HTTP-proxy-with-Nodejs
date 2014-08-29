//server

my_utils = require('./utils');
var http = require('http');
var url = require('url');
var s = http.createServer(function (req, res) {
    var myUrl = url.parse(req.url, true).query.url;
    myUrl = my_utils.decrypt(myUrl);
    var values = JSON.parse(myUrl);
    var needed_url = values.url;
    var needed_method = values.method;
    var needed_headers = values.headers;
    var params = url.parse(needed_url);

    var options = {
        host: params.host,
        hostname: params.hostname,
        port: params.port,
        path: params.path,
        method: needed_method,
        headers: needed_headers
    };
    console.log('current Request:');
    console.log(needed_url);
    var getter = http.request(options, function (res2) {
        res.writeHead(res2.statusCode, res2.headers);
        res2.pipe(res);
    });

    req.pipe(getter);
    getter.on('error', function () {
            console.log("I got an error in server");
        }
    );
    req.on('error', function () {
            console.log("error accessing server");
        }
    );
    res.on('close',function(){
        console.log("Connection closed");
        getter.abort();
    });



});
port = 8001;
console.log('Server listening on port ' + port.toString());
s.listen(port);
