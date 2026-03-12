import React from 'react';

const DownloadButton = ({ children = 'Download App', url = 'https://firebasestorage.googleapis.com/v0/b/koraq-9cd16.firebasestorage.app/o/app-debug.apk?alt=media&token=cdbe63ad-f89f-4e2c-8a69-b45067913764', className = '', style = {} }) => (
  <button
    className={`download-btn ${className}`.trim()}
    style={style}
    onClick={() => window.open(url, '_blank')}
  >
    {children}
  </button>
);

export default DownloadButton;
