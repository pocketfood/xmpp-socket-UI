const express = require('express')
const app = express()
const port = 3000

const { createServer } = require('http');
const { Server } = require("socket.io");

const httpServer = createServer(app)
const io = new Server(httpServer, { 
    cors: { origin: "*", methods: ["GET", "POST"] }
});

io.on('connection', (socket) => {
    
   
    io.of("/").on("connection", (socket) => {    
    });
    
    socket.on("message", (data) =>{
    
    //console.log("User:", socket.id + " Sent " + data)
    socket.broadcast.emit("message", data)    

    socket.on('disconnect', function () {
        console.log("User disconnected: " + socket.id);
        
      });

    
    });

const XMPP = require('stanza');  

const client = XMPP.createClient({
    jid: 'user',
    password: 'password',
    resource: socket.id,
    softwareVersion: {
        name: 'Magic'
    },
    transports: {
        websocket: 'wss://localhost:5443',
    }
});

// session
client.on('session:started', async (from, jid) => {
    console.log('\x1b[33m%s\x1b[0m', '--- New XMPP Connection ---');
    console.log('\x1b[1m\x1b[36m','signed in as:',from,'\x1b[0m','\n');
    client.sendPresence();        
});


// Sending messages from UI
client.on('chat', (msg) => {
        
    socket.on("message", (data) => {
        
    socket.broadcast.emit("message", data)    

    console.log('\x1b[1m\x1b[32m','---',msg.from,'---','[','Message Linked with:',socket.id,']');
    //console.log('\n','\x1b[1m\x1b[36m','Message:',msg.body,'\x1b[0m','\n')
    
        client.sendMessage({
            to: msg.from,
            body: data   
        });

    console.log('\x1b[33m%s\x1b[0m',socket.id,':', data);
    
  
});


// below is a commands. Just testing.
client.on ('chat', msg  => {
    client.sendMessage ({
        to: msg.to,
        body: msg.body             
    });
    
});

console.log('\n','\x1b[1m\x1b[36m','Message:',msg.body,'\x1b[0m','\n')
console.log('\x1b[1m\x1b[32m','---',msg.from,'---','[','Message was linked To user: ',socket.id,']');

});

client.connect();
});


// This is to see if my socket is working
const socket = require("socket.io-client")("http://localhost:3000")
socket.on("connect_error", (err) => {
    console.log(`Connect_error due to ${err.message}`)
})

// put the render thing back here
// wont load page if you dont have this
app.get('/', (req, res) => {

    console.log(req.headers)
    res.render("index", {
    
});
});


app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs')

httpServer.listen(port, () => {
    console.log(`running server on ${port}`)
    
})

  
