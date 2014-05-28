//server

function encrypt(s)
{    
    var res='';
    for(var i=0;i<s.length;i++)
    {
	if(s[i]>='a' && s[i]<='z')
	{
	    var d=s.charCodeAt(i)-97;
	    d=(d+13);
	    if(d>=26)
		d-=26;
	    var convert=String.fromCharCode(d+97);
	    res+=convert;
	}
	else if(s[i]>='A' && s[i]<='Z')
	{
	    var d=s.charCodeAt(i)-65;
	    d=(d+13);
	    if(d>=26)
		d-=26;
	    var convert=String.fromCharCode(d+65);
	    res+=convert;
	}
	else
	{
	    res+=s[i];
	}

    }
    return res;
}
function decrypt(s)
{
    return encrypt(s);
}


var http=require('http');
var url=require('url');
var currentReq=0;

var s=http.createServer(function(req,res){
    //res.writeHead(200);

    myUrl=req.url;
    //decrypt
    myUrl=decrypt(myUrl);
    currentReq++;
    console.log('current number of requests( In server): '+currentReq.toString());
    params=url.parse(myUrl);          

    console.log('current Request:\n');
    serverOptions={};console.log(params);

    options={
        host:params['host'],
        hostname:params['hostname'],
        port:params['port'],
        path:params['path'],
        method:req.headers['method'],
        headers:req.headers
    };
    options.headers['host']=params['host'];
    console.log(options);

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
    
    var getter = http.request(options, function(res2) {
	console.log('STATUS: ' + res2.statusCode);
	//console.log('HEADERS: ' + JSON.stringify(res2.headers));
	res.writeHead(res2.statusCode,res2.headers);
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
            console.log("I recieved data");
            getter.write(chunk);
        }
    );
    getter.on('error',function()
        {
            console.log("I got an error in server( in amazon, this shouldn't happen a lot");
        }
    );
    req.on('error',function()
        {
            console.log("error accessing server,( this SHOULD HAPPEN A LOT");
        }
    );
    getter.end();
        
           
});
port=8001;
console.log('Server listening on port '+port.toString());
s.listen(port);
