import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

function Scanner() {

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250,
      },
      (decodedText) => {
        // ✅ When QR scanned
        window.location.href = decodedText;
      },
      (errorMessage) => {
        // ignore scan errors
      }
    );

    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl mb-4">Scan Team QR</h2>

      <div id="reader" style={{ width: "100%" }}></div>
    </div>
  );
}

export default Scanner;