

var http=require('http');
var url=require('url');
//needThisFile='http://54.227.244.186:8080/files/hero_mba_11.jpg';
needThisFile='http://54.227.244.186:8080';
needThisFile='/';
//getit='http://localhost:8000/'+needThisFile;


myHost='http://localhost/';
myPort=8000;
myPath=needThisFile;
var options = {
	hostname:myHost,
	port: myPort,
//	path: myPath,
	method: 'GET'
    };

strReq='http://localhost:8000/http://www.google.com';
var req = http.request(strReq, function(res) {
  
  console.log('STATUS: ' + res.statusCode);
  
  console.log('HEADERS: ' + JSON.stringify(res.headers));
    
  res.setEncoding('utf8');
  
  res.on('data', function (chunk) {
    console.log('BODYX: ' + chunk);
  });

  
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();