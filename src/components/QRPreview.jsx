import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

function QRPreview({ qrType, formData, settings, onSave }) {
  const canvasRef = useRef(null);

  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;

    if (!canvas) return;

    const clearCanvas = () => {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const validateInput = () => {
      if (qrType === "url") {
        if (!formData.url?.trim()) return "Please enter a URL.";

        try {
          const url = new URL(formData.url.trim());
          if (!["http:", "https:"].includes(url.protocol)) {
            return "Please enter a valid HTTP or HTTPS URL.";
          }
        } catch {
          return "Please enter a valid URL.";
        }
      }

      if (qrType === "text" && !formData.text?.trim()) {
        return "Please enter some text.";
      }

      if (qrType === "email") {
        if (!formData.email?.trim()) {
          return "Please enter an email address.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
          return "Please enter a valid email address.";
        }
      }

      if (qrType === "phone" && !formData.phone?.trim()) {
        return "Please enter a phone number.";
      }

      if (qrType === "wifi") {
        if (!formData.wifiName?.trim()) {
          return "Please enter the Wi-Fi network name.";
        }

        if (
          formData.wifiSecurity !== "nopass" &&
          !formData.wifiPassword?.trim()
        ) {
          return "Please enter the Wi-Fi password.";
        }
      }

      return "";
    };

    const getQRData = () => {
      switch (qrType) {
        case "url":
          return formData.url.trim();

        case "text":
          return formData.text.trim();

        case "email":
          return `mailto:${formData.email.trim()}?subject=${encodeURIComponent(
            formData.subject || ""
          )}&body=${encodeURIComponent(formData.message || "")}`;

        case "phone":
          return `tel:${formData.phone.trim()}`;

        case "wifi":
          return `WIFI:T:${formData.wifiSecurity};S:${formData.wifiName};P:${formData.wifiSecurity === "nopass" ? "" : formData.wifiPassword};;`;

        default:
          return "";
      }
    };

    const inputError = validateInput();
    setError(inputError);

    const foreground = settings.foreground || "#000000";
    const background = settings.background || "#FFFFFF";

    setWarning(
      foreground.toLowerCase() === background.toLowerCase()
        ? "Very low contrast. The QR code may not scan correctly."
        : ""
    );

    if (inputError) {
      clearCanvas();
      return () => {
        cancelled = true;
      };
    }

    QRCode.toCanvas(
      canvas,
      getQRData(),
      {
        width: Number(settings.size) || 250,
        margin: Number(settings.margin) || 0,
        errorCorrectionLevel: settings.errorCorrection || "M",
        color: {
          dark: foreground,
          light: background,
        },
      },
      (generationError) => {
        if (cancelled) return;

        if (generationError) {
          clearCanvas();
          setError("Unable to generate the QR code. Please check your settings.");
        }
      }
    );

    return () => {
      cancelled = true;
    };
  }, [qrType, formData, settings]);

  const downloadQR = () => {
    if (error || !canvasRef.current) return;

    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="qr-preview-card">
      <div className="preview-header">
        <h2>Live Preview</h2>
        <span className="live-badge">LIVE</span>
      </div>

      <div className="qr-container">
        {/* Keep the canvas mounted so it is ready whenever the input becomes valid. */}
        <canvas
          ref={canvasRef}
          style={{ display: error ? "none" : "block" }}
        />

        {error && (
          <div className="empty-state">
            <p>QR Preview</p>
            <span>Enter valid information to generate your QR code.</span>
          </div>
        )}
      </div>

      {error && <div className="error-message">❌ {error}</div>}

      {warning && !error && (
        <div className="warning-message">⚠️ {warning}</div>
      )}

      {!error && !warning && (
        <div className="success-message">
          ✓ QR code has good basic contrast.
        </div>
      )}

      <div className="preview-actions">
        <button
          className="primary-button"
          onClick={downloadQR}
          disabled={Boolean(error)}
        >
          Download PNG
        </button>

        <button
          className="secondary-button"
          onClick={onSave}
          disabled={Boolean(error)}
        >
          Save to Recent
        </button>
      </div>
    </div>
  );
}

export default QRPreview;