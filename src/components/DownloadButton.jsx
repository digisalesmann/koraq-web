import React from 'react';

const DownloadButton = ({ children = 'Download App', url = 'https://play.google.com/store/apps/details?id=com.koraq.app' }) => (
  <button className="download-btn" onClick={() => window.open(url, '_blank')}>
    {children}
  </button>
);

export default DownloadButton;
