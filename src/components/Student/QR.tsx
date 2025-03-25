import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import QRImage from "../../assets/QR_image.png";
import "./qr-scanner.css";

interface QRScannerProps {
  onScan: (scannedText: string) => void;
}

const QRScannerComponent: React.FC<QRScannerProps> = ({ onScan }) => {
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false); // 👈 Controls camera activation

  useEffect(() => {
    if (isScanning && !scanner) {
      const newScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      newScanner.render(
        (decodedText: string) => {
          onScan(decodedText);
          setIsScanning(false); // Stop scanning after success
        },
        (errorMessage: string) => {
          console.warn("QR Scan Error:", errorMessage);
        }
      );

      setScanner(newScanner);
    }

    return () => {
      if (scanner) {
        scanner
          .clear()
          .catch((err) => console.warn("Scanner Cleanup Error:", err));
        setScanner(null);
      }
    };
  }, [onScan, isScanning, scanner]);

  return (
    <div className="flex flex-col items-center">
      {/* Conditional Scanner Display */}
      {isScanning ? (
        <div
          id="qr-reader"
          className="border-2 border-gray-300 rounded-lg"
        ></div>
      ) : (
        <img
          src={QRImage} // 👈 Replace this with your QR code image
          alt="Tap to Scan"
          className="w-32 h-32 cursor-pointer hover:opacity-80 transition"
          onClick={() => setIsScanning(true)}
        />
      )}
    </div>
  );
};

export default QRScannerComponent;
