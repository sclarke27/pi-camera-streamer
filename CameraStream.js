const { StreamCamera, Codec, ExposureMode } = require("pi-camera-connect");
// let decode = require('image-decode')
// const runApp = async () => {
    
//     const image = await streamCamera.takeImage();
//     let {data, width, height} = decode(image) 

//     console.info('write image', data);

//     frameNumber++;
//     setTimeout(() => {
//         runApp();
//     },1)
    
// };



// streamCamera.startCapture().then(() => {
//     runApp();
// });

class CameraStream {
    constructor() {
        this.streamCamera = null;
    }

    start() {
        this.streamCamera = new StreamCamera({
            codec: Codec.MJPEG,
            exposureMode: ExposureMode.Night,
            width: 1280,
            height: 720,
            rotation: 270    
        });
        this.streamCamera.startCapture()
    }

    async capture() {
        return await this.streamCamera.takeImage();
    }
}

module.exports = CameraStream;
