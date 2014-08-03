//server

my_utils = require('./utils');
var http = require('http');
var url = require('url');
var currentReq = 0;
var number_of_open_connections = 0;
var s = http.createServer(function (req, res) {
    currentReq++;
    number_of_open_connections++;
    console.log("Number of open connection is " + number_of_open_connections);
    console.log('current number of requests( In server): ' + currentReq.toString());

    var myUrl = url.parse(req.url, true).query.url;

    //decrypt
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
    console.log("Request type: "+needed_method);

    var getter = http.request(options, function (res2) {
        console.log('STATUS: ' + res2.statusCode + " For this url :" + needed_url);

        res.writeHead(res2.statusCode, res2.headers);
        res2.pipe(res);

        res2.on('data', function (chunk) {
                console.log("Still getting data for " + needed_url);
            }
        );
    });

    req.pipe(getter);
    getter.on('error', function () {
            console.log("I got an error in server( in amazon, this shouldn't happen a lot");
            //console.log("I guess I need to end the response!");
            //res.end();
        }
    );
    req.on('error', function () {
            console.log("error accessing server,( this SHOULD HAPPEN A LOT");
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
