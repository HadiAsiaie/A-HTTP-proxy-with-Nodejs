var my_utils=require('./utils');

var config=require('./config');
var serverAddress=config.config.server_address;
var serverPort=8001;
var http=require('http');
var url=require('url');
var s=http.createServer(function(req,res){
    var myUrl=req.url;
    console.log('current Request:');
    console.log(myUrl);
    if(myUrl.substr(0,4)!='http')
        throw "error";
    var value={
        headers:req.headers,
        url:req.url,
        method:req.method
    };
    var str_value=JSON.stringify(value);
    str_value=my_utils.encrypt(str_value);

    var serverOptions={
        host: serverAddress,
        port:serverPort,
        path:'/?url='+encodeURIComponent(str_value),
        method:req.method
    };
    var getter = http.request(serverOptions, function(res2) {
            res.writeHead(res2.statusCode, res2.headers);
            res2.pipe(res);
        }
    );

    req.pipe(getter);
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
    res.on('close',function(){
        getter.abort();
    });

           
});
s.setTimeout(30*1000);
var port=8000;
console.log("Server address is "+serverAddress);
console.log('listening on port '+port.toString());
s.listen(port);
