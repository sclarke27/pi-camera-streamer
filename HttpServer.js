const express = require("express");
// const app = express();
// const decode = require("image-decode");
const { StreamCamera, Codec } = require("pi-camera-connect");
const http = require("http");
// const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server);
// const port = 8080;

class HttpServer {
    constructor() {
        this.port = 8080;
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
              origin: "http://192.168.1.9:8080",
              methods: ["GET", "POST"]
            }
          });

          this.sockets = [];
    }

    start() {
        this.app.use(express.static(__dirname));

        this.io.on("connection", (socket) => {
            console.log("a user connected");
            // socket.emit("connected");
            this.sockets.push(socket);
            socket.on("disconnect", () => {
                console.log("user disconnected");
                // delete this.sockets[socket];
                this.sockets = array.filter(function(value, index, arr){ 
                    return value !== socket;
                });
            });
        });

        this.server.listen(this.port, () => {
            console.log(`listening on *:${this.port}`);
        });
    }

    sendSocketMessage(messageKey, messageData) {
        // this.io.emit(messageKey, messageData);
        for(let i=0; i<this.sockets.length; i++) {
            const socket = this.sockets[i];
            socket.volatile.emit(messageKey, messageData)
        }
    }
}

module.exports = HttpServer;
