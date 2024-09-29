import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

function FacialExpressionDetector() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [expression, setExpression] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      startVideo();
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error(err));
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
        if (detections) {
          const dominantExpression = Object.keys(detections.expressions).reduce((a, b) => detections.expressions[a] > detections.expressions[b] ? a : b);
          setExpression(dominantExpression);
        }
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <video ref={videoRef} autoPlay muted onPlay={handleVideoPlay} className="w-full max-w-sm mb-4 rounded-lg shadow-lg" />
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
      <p className="text-xl font-semibold mt-4">Detected Expression: {expression}</p>
    </div>
  );
}

export default FacialExpressionDetector;