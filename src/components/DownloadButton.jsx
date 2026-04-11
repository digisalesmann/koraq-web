import React from 'react';

const DownloadButton = ({ children = 'Download App', url = 'https://firebasestorage.googleapis.com/v0/b/koraq-9cd16.firebasestorage.app/o/Koraq.apk?alt=media&token=437a6e23-59e6-44ce-86b2-9be60db78e29', className = '', style = {} }) => (
  <button
    className={`download-btn ${className}`.trim()}
    style={style}
    onClick={() => window.open(url, '_blank')}
  >
    {children}
  </button>
);

export default DownloadButton;
