A-HTTP-proxy-with-Nodejs
========================

This is useful to access blocked "HTTP" websites. For example I use
it in Iran. I'm using this for a couple of months, and didn't saw a bug.

Unfortunately, it works only for HTTP. If you know how make it work for HTTPS, please
contact me :)

How to use it
----
0) I've never test this in Windows, but I don't see why it shouldn't work there.

1) You need a linux/unix server that's not blocked by your goverment/insitutition etc. ( but you can test it without a server)

2) Install nodejs from here http://nodejs.org

3) Put ip/dns address of the server/along with the port you want to use in config file( You can set them to 127.0.0.1 just for testing)

4) In client run <code>node client.js</code> . In server run <code>node server.js</code>
You can use your own computer for server( just for testing)

5) Client.js listens on port 8000, you need to change you browser setting to listen on
this port. Find  network configuration of your browser/system and set the server address to
localhost and port to 8000.

Now you should be able to access website using proxy! check logs of node programs.
