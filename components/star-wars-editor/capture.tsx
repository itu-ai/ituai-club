'use client';

import { useState, useRef, useEffect } from 'react';

interface CaptureProps {
  confirmCaptureCallback: (image64: string) => Promise<void>;
}

const Capture: React.FC<CaptureProps> = ({ confirmCaptureCallback }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);


  useEffect(() => {
    setLoaded(true);
    setTimeout(() => {
      handleOnPageLoad();
    }, 100);
  }, []);

  const handleOnPageLoad = async () => {
    setImage(undefined);
    startCamera();
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      else {

      }
    } 
    catch (err) {
      setError(err instanceof Error ? err.message : 'Could not access the camera');
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }

  const takeSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const encodedImage = canvas.toDataURL('image/png');
        setImage(encodedImage);
      }
    }
    stopCamera();
  }

  const retakePhoto = () => {
    setImage(undefined);
    startCamera();
  }

  const confirmImage = () => {
    if (image) {
      confirmCaptureCallback(image);
    }
  }


  return (
    <div>
      { image
        ? 
        <>
          <img className="sw-frame" src={image} alt="Snapshot"/>
          <div className="flex flex-col-reverse mt-4 lg:flex-row items-center justify-center gap-4 lg:gap-6">
            <button className="sw-button px-6 py-2" 
              onClick={retakePhoto}>
              Try Again
            </button>
            <button className="sw-button px-6 py-2" 
              onClick={confirmImage}>
              Continue
            </button>
          </div>
        </>
        : 
        <>
          {loaded &&
            <>
              <video className="sw-frame"
                autoPlay
                ref={videoRef}
                playsInline
                controls={false}
              />
              <div className="flex flex-col mt-4 lg:flex-row items-center justify-center gap-4 lg:gap-6">
                <button className="sw-button px-6 py-2" 
                onClick={takeSnapshot}>
                  Capture
                </button>
              </div>
            </>
          }
        </>
      }
  </div>
  );
}

export default Capture;