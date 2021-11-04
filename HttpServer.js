const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

class HttpServer {
    constructor() {
        this.port = 8080;
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
              origin: "http://192.168.1.16:8080",
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
                this.sockets = this.sockets.filter(function(value, index, arr){ 
                    return value !== socket;
                });
                console.log("user disconnected", this.sockets.length);
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
