const HttpServer = require('./HttpServer');
const CameraStream = require('./CameraStream');

class Main {
    constructor() {
        this.httpServer = null;
        this.loopIntervalTimeout = 34;
        this.loopInterval = null;
        this.leftEyeStream = null;
    }

    start() {
        this.httpServer = new HttpServer();
        this.httpServer.start();

        this.leftEyeStream = new CameraStream();
        this.leftEyeStream.start();

        this.main();
    }

    main() {
        this.loopInterval = setTimeout(() => {
            this.leftEyeStream.capture().then((data) => {
                // console.info(data);
                this.httpServer.sendSocketMessage('frame', data)
            })
            this.main();
        }, this.loopIntervalTimeout);
    }
}

const main = new Main();
main.start();