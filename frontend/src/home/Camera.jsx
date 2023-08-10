import { useState, useRef } from "react";

export default function Camera({ onCapture }) {
  // const [isCameraStarted, setCameraStarted] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Starts the camera stream when the component mounts
  const startCamera = async () => {
    try {
      // getUserMedia browser API used the front camera by default
      // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Add the facingMode constraint to the getUserMedia() call with
      // a value of environment. This tells the API to use the
      // environment-facing camera, which is typically the rear-facing
      // camera on a mobile device.
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Create a helper function to decode the URI:
  function decodeDataURL(dataURL) {
    const splitData = dataURL.split(",");
    const b64 = splitData[1];
    const binStr = atob(b64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    return arr;
  }
  // Converts a base64 string to a Blob object
  const dataURLtoBlob = (dataURL) => {
    const arr = decodeDataURL(dataURL);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    return new Blob([arr], {type: mimeString});
  };



  // Take a photo from the video stream and saves it to a canvas element
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      // `canvas.toDataURL("image/png")`: get the photo in base64 format
      // Firebase's  `uploadBytesResumable()` function requires a Blob, File, or Uint8Array.
      // We need to convert the base64 image data to a Blob (Uint8Array).
      // const photo = canvas.toDataURL("image/png");
      const photoBlob = dataURLtoBlob(canvas.toDataURL("image/png"));
      // console.log(photo);
      // Pause the video to freeze the current frame
      video.pause();
      onCapture(photoBlob); // This will send the image to parent
    }
  };

  // Simply pause the video to freeze the screen.
  // const takePhoto = () => {
  //   const video = videoRef.current;
  //
  //   if (video) {
  //     // Pause the video to freeze the screen
  //     video.pause();
  //
  //     // If you want to resume the video, you can use the following line:
  //     // video.play();
  //   }
  // };

  // Stops the camera stream when the component unmounts
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 pb-6 shadow">
      <div className="relative w-full h-64">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay playsInline
        />
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <div className="flex space-x-4">
        <button
          type="button"
          className="px-4 py-2 text-white bg-green-500 rounded"
          onClick={startCamera}
        >
          Start Camera
        </button>
        <button
          type="button"
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={takePhoto}
        >
          Take Photo
        </button>
        <button
          type="button"
          className="px-4 py-2 text-white bg-red-500 rounded"
          onClick={stopCamera}
        >
          Stop Camera
        </button>
      </div>
    </div>
  );
}
