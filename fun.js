
function encrypt(s)
{
    var res='';
    for(var i=s.length-1;i>=0;i--)
    {
	res+=s[i];
    }
    return res;
}
function decrypt(s)
{
    return encrypt(s);
}


var http=require('http');
var url=require('url')
var currentReq=0;
var s=http.createServer(function(req,res){
    res.writeHead(200);
    myUrl=req.url;
    //myUrl=myUrl.substr(1);
    //myUrl=decrypt(myUrl);
    currentReq++;
    console.log('current number of requests: '+currentReq.toString());
    params=url.parse(myUrl);

        
    var options = {
	hostname: params['hostname'],
	port: params['port'],
	path: params['path'],
	method: 'GET'
    };
    console.log('current Request:\n');
    console.log(options);    

    
    var getter = http.request(options, function(res2) {
	console.log('STATUS: ' + res2.statusCode);
	console.log('HEADERS: ' + JSON.stringify(res2.headers));
	//res2.setEncoding('utf8');
	res2.on('data', function (chunk) {
	    console.log('len of chunk is '+(chunk.length).toString());
	   // res.end();
	    res.write(chunk);
	});
	res2.on('end',function()
		{
		    res.end();
		}
	       );
    });
    getter.end();
           
});
port=8000;
console.log('listening on port '+port.toString());
s.listen(8000);

/*

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();
*/