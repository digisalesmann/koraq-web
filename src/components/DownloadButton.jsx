import React from 'react';

const DownloadButton = ({ children = 'Download App', url = 'hhttps://firebasestorage.googleapis.com/v0/b/koraq-9cd16.firebasestorage.app/o/app-debug.apk?alt=media&token=57f0a2ee-6ac8-420c-bcbf-4596df38e285', className = '', style = {} }) => (
  <button
    className={`download-btn ${className}`.trim()}
    style={style}
    onClick={() => window.open(url, '_blank')}
  >
    {children}
  </button>
);

export default DownloadButton;
