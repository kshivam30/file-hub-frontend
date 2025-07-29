import React from 'react';

interface FileHubLogoProps {
  className?: string;
}

// Shared SVG content - same as filehub-favicon.svg
const logoSvgContent = (
  <>
    <rect x="8" y="12" width="32" height="28" rx="4" fill="currentColor"/>
    <rect x="14" y="18" width="20" height="16" rx="2" fill="#fff"/>
    <rect x="18" y="22" width="12" height="2" rx="1" fill="currentColor"/>
    <rect x="18" y="27" width="12" height="2" rx="1" fill="currentColor"/>
    <rect x="18" y="32" width="8" height="2" rx="1" fill="currentColor"/>
    <rect x="12" y="8" width="12" height="6" rx="2" fill="currentColor" fillOpacity="0.7"/>
    <rect x="24" y="8" width="12" height="6" rx="2" fill="currentColor" fillOpacity="0.8"/>
  </>
);

const FileHubLogo: React.FC<FileHubLogoProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {logoSvgContent}
  </svg>
);

export default FileHubLogo; 