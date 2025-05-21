
import React from 'react';
import sapienLogoPng from '../assets/Logo.png';

interface SapienLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const SapienLogo: React.FC<SapienLogoProps> = ({ className = '', width = 114, height = 162 }) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: width, height: height }}
    >
      <img
        src={sapienLogoPng}
        alt="Logo"
        style={{ width: width, height: height }}
      />
    </div>
  );
};

export default SapienLogo;
