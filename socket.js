net=require('net');
var port=8001;
var s=net.Server(function(socket){
    socket.write('Hello world');
    socket.on('data',function(d){
	socket.write(d);
    });
}).listen(port);

console.log("Listening on port "+port);

