import React from 'react';
import './index.less';

const LoadingBee = () => {
  return (
    <div className="loader">
      <div
        className="orbe"
        style={{ '--index': 0 } as React.CSSProperties}
      />
      <div
        className="orbe"
        style={{ '--index': 1 } as React.CSSProperties}
      />
      <div
        className="orbe"
        style={{ '--index': 2 } as React.CSSProperties}
      />
      <div
        className="orbe"
        style={{ '--index': 3 } as React.CSSProperties}
      />
      <div
        className="orbe"
        style={{ '--index': 4 } as React.CSSProperties}
      />
    </div>
  );
};

export default LoadingBee;
