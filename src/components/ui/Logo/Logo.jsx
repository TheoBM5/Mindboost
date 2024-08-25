import React from 'react';

const Logo = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

export default Logo;