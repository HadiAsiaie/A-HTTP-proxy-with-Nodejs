my_utils=require('./../proxy/utils');

var http=require('http');
var url=require('url')
var currentReq=0;
serverAddress='66.160.179.217'
//serverAddress='127.0.0.1';
serverPort=8001;
serverMethod='GET';
var s=http.createServer(function(req,res){
    currentReq++;
    myUrl=req.url;


    console.log('current number of requests(in client): '+currentReq.toString());
    console.log('current Request:');
    console.log(myUrl);
    console.log('Method');
    console.log(req['method']);

    //encrypt
    myUrl=my_utils.encrypt(myUrl);
    myHeaders=req.headers;
    myHeaders['method']=req['method'];
    serverOptions={
        hostname: serverAddress,
        port:serverPort,
        path:myUrl,
        method:serverMethod,
        headers:myHeaders
    };

    serverOptions.headers['host']=serverAddress;
    serverOptions.headers['referer']=serverAddress;

    console.log("server options");
    console.log(serverOptions);

    isResClosed=false;
    res.on('close',function()
        {
            console.log("I was closed");
            isResClosed=true;
            console.log("So I end myself");
            res.end();
        }
    );
    res.on('end',function()
        {
            console.log("I was ended");
            isResClosed=true;
        }
    );

    var getter = http.request(serverOptions, function(res2) {
	console.log('STATUS: ' + res2.statusCode);
	//console.log('HEADERS: ' + JSON.stringify(res2.headers));
	res.writeHead( res2.statusCode,res2.headers);
	res2.on('data', function (chunk) {
        if(!isResClosed)
	        res.write(chunk);
	});
	res2.on('end',function()
		{
            if(!isResClosed)
		        res.end();
		}
	   );
    });
    req.on('data',function(chunk)
        {
            console.log("I received data");
            getter.write(chunk);
        }
    );
    getter.on('error',function()
        {
            console.log("I got an error in client accessing proxy");
        }
    );
    req.on('error',function()
        {
            console.log("error in client proxy, this shouldn't happened a lot!");
        }
    );

    getter.end();
    
           
});
port=8000;
console.log('listening on port '+port.toString());
s.listen(port);
