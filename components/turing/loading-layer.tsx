'use client';

import { PacmanLoader } from 'react-spinners';

const LoadingLayer: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute bottom-1/2 right-1/2 items-center justify-center">
          <PacmanLoader color="#FBBF24"/>
        </div>
      </div>
    </>
  );
}

export default LoadingLayer;
