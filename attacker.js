var http=require('http');
var url=require('url')
serverOptions={
    hostname: 'lianseed.com',
    port:80,
    method:'get'
};
var n=10000
num=0
for(var i=0;i<n;i++)
{
    var getter = http.request(serverOptions, function(res) {

        console.log('STATUS: ' + res.statusCode);
        console.log("Request number "+num.toString())
        num+=1
        res.on('data', function (chunk) {
            console.log("Data came")
        });
        res.on('end',function()
            {
                console.log("connection closed")
            }
        );
    });

    getter.on('error',function()
        {
            console.log("I got an error");
        }
    );
    getter.end()
}