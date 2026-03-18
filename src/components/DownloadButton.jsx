import React from 'react';

const DownloadButton = ({ children = 'Download App', url = 'https://firebasestorage.googleapis.com/v0/b/koraq-9cd16.firebasestorage.app/o/Koraq.apk?alt=media&token=5eadc9ee-f8fc-4220-b754-9031aa62cbc4', className = '', style = {} }) => (
  <button
    className={`download-btn ${className}`.trim()}
    style={style}
    onClick={() => window.open(url, '_blank')}
  >
    {children}
  </button>
);

export default DownloadButton;
