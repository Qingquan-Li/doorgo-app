import React, { useState, useRef } from "react";

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
      // do something with the picture (e.g. upload it to a server)
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
    <div>
      {/* <video ref={videoRef} width="640" height="480" autoPlay playsInline /> */}
      {/* Center the video component */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <video ref={videoRef} width="640" height="480" autoPlay playsInline />
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={takePhoto}>Take Photo</button>
        <button onClick={stopCamera}>Stop Camera</button>
      </div>
    </div>
  );
}
