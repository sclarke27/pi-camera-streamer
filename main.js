const HttpServer = require('./HttpServer');
const CameraStream = require('./CameraStream');
const temp = require("pi-temperature");

class Main {
    constructor() {
        this.httpServer = null;
        this.loopIntervalTimeout = 16;
        this.loopInterval = null;
        this.cameraStream = null;
        this.imageData = null;
        this.intervalCount = 0;
    }

    start() {
        this.httpServer = new HttpServer();
        this.httpServer.start();

        this.cameraStream = new CameraStream();
        this.cameraStream.start(this);

        this.main();
    }
    
    pushImage(data) {
        if(data) {
            this.imageData = data;
        } 
    }

    main() {
        this.loopInterval = setTimeout(() => {
            if(this.intervalCount >= 100) {
                temp.measure((err, temp) => {
                    if (err) console.error(err);
                    else this.httpServer.sendSocketMessage('cpuTemp', temp)
                });            
                this.intervalCount = 0;
            } else {
                this.intervalCount++;                
            }
            // this.cameraStream.capture().then((data) => {
                this.httpServer.sendSocketMessage('frame', this.imageData)
            // })
            this.main();
            
        }, this.loopIntervalTimeout);
    }
}

const main = new Main();
main.start();
