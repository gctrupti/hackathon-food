import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

function Scanner() {

  const navigate = useNavigate();

  useEffect(() => {

    const scanner = new Html5Qrcode("reader");

    scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250
      },
      (decodedText) => {

        // decodedText = your QR URL
        const url = new URL(decodedText);
        const teamId = url.pathname.split("/").pop();

        scanner.stop();

        navigate(`/team/${teamId}`);
      },
      (error) => {
        // ignore scan errors
      }
    );

    return () => {
      scanner.stop().catch(() => {});
    };

  }, [navigate]);

  return (
    <div className="p-6 text-center">

      <h2 className="text-xl mb-4">Scan Team QR</h2>

      <div id="reader" style={{ width: "300px", margin: "auto" }} />

    </div>
  );
}

export default Scanner;