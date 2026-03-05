import React from 'react';
import SurfaceCard from '../../components/ui/SurfaceCard';

export default function SGCard({ children, className = '', style, ...rest }) {
  return (
    <SurfaceCard className={className} style={style} {...rest}>
      {children}
    </SurfaceCard>
  );
}
