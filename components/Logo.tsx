
import React from 'react';
import { LOGO_SVG } from '../constants';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      {LOGO_SVG}
    </div>
  );
};

export default Logo;
