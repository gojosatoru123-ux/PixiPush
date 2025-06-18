import React from 'react';
import { QRCodeSVG } from 'qrcode.react'; // For SVG rendering
// import { QRCodeCanvas } from 'qrcode.react'; // If you prefer Canvas rendering

const QrCodeGenerator = ({ url, size = 256, level = 'H'}) => {
  if (!url) {
    return <p>Please provide a URL to generate a QR code.</p>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ marginTop: '20px', display: 'inline-block', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        <QRCodeSVG
          value={url}        // The URL to encode
          size={size}        // Size of the QR code in pixels
          level={level}      // Error correction level (L, M, Q, H) - H is highest
          bgColor="#FFFFFF"  // Background color
          fgColor="#000000"  // Foreground color
          // imageSettings={{  // Optional: Add a logo in the center
          //   src: 'https://thumbs.dreamstime.com/b/hand-care-logo-design-template-vector-icon-illustrati-illustration-130551000.jpg',
          //   x: undefined,
          //   y: undefined,
          //   height: 50,
          //   width: 50,
          //   excavate: true,
          // }}
        />
      </div>
    </div>
  );
};

export default QrCodeGenerator;