const HttpServer = require('./HttpServer');
const CameraStream = require('./CameraStream');

class Main {
    constructor() {
        this.httpServer = null;
        this.loopIntervalTimeout = 17;
        this.loopInterval = null;
        this.cameraStream = null;
    }

    start() {
        this.httpServer = new HttpServer();
        this.httpServer.start();

        this.cameraStream = new CameraStream();
        this.cameraStream.start();

        this.main();
    }

    main() {
        this.loopInterval = setTimeout(() => {
            this.cameraStream.capture().then((data) => {
                this.httpServer.sendSocketMessage('frame', data)
            })
            this.main();
        }, this.loopIntervalTimeout);
    }
}

const main = new Main();
main.start();