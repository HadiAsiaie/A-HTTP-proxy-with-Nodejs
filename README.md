A-HTTP-proxy-with-Nodejs
========================


This is useful to access blocked "HTTP" websites. For example I use
it in Iran. I'm using this for a couple of months, and didn't saw a bug. I think this program doesn't reduce speed at all.

Unfortunately, it works only for HTTP. If you know how make it work for HTTPS, please
contact me :)

How to use it
----
0) I've never tested this in Windows, but I don't see why it shouldn't work there.

1) You need a server that's not blocked by your government/institution etc. ( But you can test it without a server,using your own computer)

2) Install nodejs in server/client from here http://nodejs.org

3) Put IP/DNS address of the server in config file( You can set it to 127.0.0.1 just for testing)
Note: Port 8001 of server should be open.

4) In client run <code>node client.js</code> . In server run <code>node server.js</code>
You can use your own computer for server( just for testing)

5) Client.js listens on port 8000, you need to change you browser/system setting to listen on
this port. Find  network configuration of your browser/system, in http proxy configuration set the server address to
localhost and port to 8000.

In Version 30 of firefox, you can access http configuration like this:
Firefox->Preferences->Network->Setting->Manual proxy configuration->HTTP proxy

Now you should be able to access website using proxy! check logs of node programs to make sure.
