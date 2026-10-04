import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

function QRPreview({
  qrType,
  formData,
  settings,
  onSave,
}) {
  const canvasRef = useRef(null);

  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const getQRData = () => {
    switch (qrType) {
      case "url":
        return formData.url.trim();

      case "text":
        return formData.text.trim();

      case "email":
        return `mailto:${formData.email}?subject=${encodeURIComponent(
          formData.subject
        )}&body=${encodeURIComponent(formData.message)}`;

      case "phone":
        return `tel:${formData.phone.trim()}`;

      case "wifi":
        return `WIFI:T:${formData.wifiSecurity};S:${formData.wifiName};P:${formData.wifiPassword};;`;

      default:
        return "";
    }
  };

  const validateInput = () => {
    if (qrType === "url") {
      if (!formData.url.trim()) {
        return "Please enter a URL.";
      }

      try {
        const url = new URL(formData.url);

        if (!["http:", "https:"].includes(url.protocol)) {
          return "Please enter a valid HTTP or HTTPS URL.";
        }
      } catch {
        return "Please enter a valid URL.";
      }
    }

    if (qrType === "text") {
      if (!formData.text.trim()) {
        return "Please enter some text.";
      }
    }

    if (qrType === "email") {
      if (!formData.email.trim()) {
        return "Please enter an email address.";
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        return "Please enter a valid email address.";
      }
    }

    if (qrType === "phone") {
      if (!formData.phone.trim()) {
        return "Please enter a phone number.";
      }
    }

    if (qrType === "wifi") {
      if (!formData.wifiName.trim()) {
        return "Please enter the Wi-Fi network name.";
      }

      if (
        formData.wifiSecurity !== "nopass" &&
        !formData.wifiPassword.trim()
      ) {
        return "Please enter the Wi-Fi password.";
      }
    }

    return "";
  };

  const calculateContrastWarning = () => {
    const foreground = settings.foreground;
    const background = settings.background;

    if (foreground.toLowerCase() === background.toLowerCase()) {
      return "Very low contrast. The QR code may not scan correctly.";
    }

    return "";
  };

  useEffect(() => {
    const inputError = validateInput();

    setError(inputError);

    const contrastWarning =
      calculateContrastWarning();

    setWarning(contrastWarning);

    if (inputError) {
      const canvas = canvasRef.current;

      if (canvas) {
        const context = canvas.getContext("2d");

        context.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      return;
    }

    const qrData = getQRData();

    if (!qrData) {
      return;
    }

    QRCode.toCanvas(
      canvasRef.current,
      qrData,
      {
        width: settings.size,
        margin: settings.margin,
        errorCorrectionLevel:
          settings.errorCorrection,

        color: {
          dark: settings.foreground,
          light: settings.background,
        },
      },
      (generationError) => {
        if (generationError) {
          setError(
            "Unable to generate the QR code."
          );
        }
      }
    );
  }, [
    qrType,
    formData,
    settings,
  ]);

  const downloadQR = () => {
    if (error) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const link = document.createElement("a");

    link.download = "qr-code.png";

    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  return (
    <div className="qr-preview-card">

      <div className="preview-header">
        <h2>Live Preview</h2>

        <span className="live-badge">
          LIVE
        </span>
      </div>

      <div className="qr-container">

        {error ? (
          <div className="empty-state">
            <p>QR Preview</p>
            <span>
              Enter valid information to generate
              your QR code.
            </span>
          </div>
        ) : (
          <canvas ref={canvasRef}></canvas>
        )}

      </div>

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {warning && !error && (
        <div className="warning-message">
          ⚠️ {warning}
        </div>
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