import { useState, useRef } from "react";

export default function Camera() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Starts the camera stream when the component mounts
  const startCamera = async () => {
    try {
      // getUserMedia brwoser API used the front camera by default
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

  // Takes a photo from the video stream and saves it to a canvas element
  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const photo = canvas.toDataURL("image/png");
      console.log(photo);
      // Do something with the photo, e.g. upload it to a server
    }
  };

  // Stops the camera stream when the component unmounts
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 pb-10 shadow">
      <div className="relative w-full h-96">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay playsInline
        />
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded"
          onClick={startCamera}
        >
          Start Camera
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={takePhoto}
        >
          Take Photo
        </button>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded"
          onClick={stopCamera}
        >
          Stop Camera
        </button>
      </div>
    </div>
  );
}
