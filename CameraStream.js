const { StreamCamera, Codec, ExposureMode } = require("pi-camera-connect");

class CameraStream {
    constructor() {
        this.streamCamera = null;
        this.main = null;
        this.latestImg = null;
    }

    start(main = null) {
        this.main = main;
        this.streamCamera = new StreamCamera({
            codec: Codec.MJPEG,
            exposureMode: ExposureMode.AntiShake,
            width: 1280,
            height: 1024,
            rotation: 90    
        });
        this.streamCamera.startCapture()
        this.loop();
    }

    async capture() {
        return await this.streamCamera.takeImage();
    }

    loop() {
        if(this.main !== null) {
            this.capture().then((imgData) => {
                this.latestImg = imgData;
                if(this.latestImg) {
                    this.main.pushImage(this.latestImg);
                }
    
            })
        }


        setTimeout(() => {
            this.loop();
        },17)
    }
}

module.exports = CameraStream;
