import React from 'react';
import Image from 'next/image';

const Background = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden',
    }}>
      <Image
        src="/insaat.jpg"
        alt="Background"
        fill
        quality={100}
        style={{
          objectFit: 'cover',
          animation: 'zoom-in 30s ease-out infinite alternate',
        }}
      />
      <style jsx>{`
        @keyframes zoom-in {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Background;
