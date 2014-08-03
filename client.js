var my_utils=require('./utils');

var config=require('./config');
var serverAddress=config.config.server_address;
var serverPort=8001;
var http=require('http');

var url=require('url');
var currentReq=0;

var number_of_open_connections=0;
var s=http.createServer(function(req,res){
    currentReq++;
    var myUrl=req.url;
    number_of_open_connections+=1;
    //console.log("Number of open connection is "+number_of_open_connections);
    console.log('current number of requests(in client): '+currentReq.toString());
    console.log('current Request:');
    console.log(myUrl);

    if(myUrl.substr(0,4)!='http')
        throw "error";

    var value={
        headers:req.headers,
        url:req.url,
        method:req.method
    };
    console.log("Request type: "+req.method);
    var str_value=JSON.stringify(value);
    str_value=my_utils.encrypt(str_value);

    var serverOptions={
        host: serverAddress,
        port:serverPort,
        path:'/?url='+encodeURIComponent(str_value),
        method:req.method
    };
    var getter = http.request(serverOptions, function(res2) {
            console.log('STATUS: ' + res2.statusCode+" For this url :"+myUrl);
            res.writeHead(res2.statusCode, res2.headers);

            res2.pipe(res);
        }
    );

    req.pipe(getter);
    getter.on('error',function()
        {
            console.log("I got an error in client accessing proxy");
            //console.log("Probably need to end the response");
            //res.end();
        }
    );
    req.on('error',function()
        {
            console.log("error in client proxy, this shouldn't happened a lot!");

        }
    );
    res.on('close',function(){
        console.log("Connection closed");
        getter.abort();
    });

           
});
s.setTimeout(30*1000);
var port=8000;
console.log("server address is "+serverAddress);
console.log('listening on port '+port.toString());
s.listen(port);
