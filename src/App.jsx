import { useEffect, useState } from "react";

import QRTypeSelector from "./components/QRTypeSelector";
import QRInput from "./components/QRInput";
import QRPreview from "./components/QRPreview";
import Customization from "./components/Customization";
import Presets from "./components/Presets";
import RecentQR from "./components/RecentQR";

const STORAGE_KEY = "qrStudioRecent";

function App() {
  // ================================
  // QR TYPE
  // ================================
  const [qrType, setQrType] = useState("url");

  // ================================
  // FORM DATA
  // ================================
  const [formData, setFormData] = useState({
    url: "",
    text: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    wifiName: "",
    wifiPassword: "",
    wifiSecurity: "WPA",
  });

  // ================================
  // QR SETTINGS
  // ================================
  const [settings, setSettings] = useState({
    size: 300,
    foreground: "#000000",
    background: "#ffffff",
    errorCorrection: "M",
    margin: 4,
  });

  // ================================
  // LOAD SAVED QR CODES
  // This runs BEFORE the first render.
  // ================================
  const [recentQRs, setRecentQRs] = useState(() => {
    try {
      const savedData = window.localStorage.getItem(STORAGE_KEY);

      if (!savedData) {
        return [];
      }

      const parsedData = JSON.parse(savedData);

      if (!Array.isArray(parsedData)) {
        return [];
      }

      return parsedData;
    } catch (error) {
      console.error("Failed to load saved QR codes:", error);
      return [];
    }
  });

  // ================================
  // SAVE QR CODES TO LOCAL STORAGE
  // ================================
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(recentQRs)
      );
    } catch (error) {
      console.error("Failed to save QR codes:", error);
    }
  }, [recentQRs]);

  // ================================
  // UPDATE FORM DATA
  // ================================
  const updateFormData = (key, value) => {
    setFormData((previousData) => ({
      ...previousData,
      [key]: value,
    }));
  };

  // ================================
  // UPDATE QR SETTINGS
  // ================================
  const updateSettings = (key, value) => {
    setSettings((previousSettings) => ({
      ...previousSettings,
      [key]: value,
    }));
  };

  // ================================
  // SAVE CURRENT QR
  // ================================
  const saveCurrentQR = () => {
    const newQR = {
      id: Date.now(),

      type: qrType,

      formData: {
        ...formData,
      },

      settings: {
        ...settings,
      },

      createdAt: new Date().toISOString(),
    };

    setRecentQRs((previousQRs) => {
      // Put newest QR first
      const updatedQRs = [
        newQR,
        ...previousQRs.filter(
          (qr) => qr.id !== newQR.id
        ),
      ];

      // Keep maximum 10 recent QR codes
      return updatedQRs.slice(0, 10);
    });
  };

  // ================================
  // REUSE SAVED QR
  // ================================
  const loadRecentQR = (qr) => {
    if (!qr) return;

    setQrType(qr.type || "url");

    setFormData({
      url: qr.formData?.url || "",
      text: qr.formData?.text || "",
      email: qr.formData?.email || "",
      subject: qr.formData?.subject || "",
      message: qr.formData?.message || "",
      phone: qr.formData?.phone || "",
      wifiName: qr.formData?.wifiName || "",
      wifiPassword: qr.formData?.wifiPassword || "",
      wifiSecurity: qr.formData?.wifiSecurity || "WPA",
    });

    setSettings({
      size: qr.settings?.size || 300,
      foreground: qr.settings?.foreground || "#000000",
      background: qr.settings?.background || "#ffffff",
      errorCorrection:
        qr.settings?.errorCorrection || "M",
      margin:
        qr.settings?.margin ?? 4,
    });
  };

  // ================================
  // DELETE SAVED QR
  // ================================
  const deleteRecentQR = (id) => {
    setRecentQRs((previousQRs) =>
      previousQRs.filter(
        (qr) => qr.id !== id
      )
    );
  };

  // ================================
  // APP UI
  // ================================
  return (
    <div className="app">

      {/* HEADER */}
      <header className="app-header">
        <div>
          <h1>GDG QR Studio</h1>

          <p>
            Create, customize and download QR codes
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-container">

        {/* LEFT SIDE */}
        <section className="editor-section">

          {/* QR GENERATOR */}
          <div className="card">

            <h2>QR Code Generator</h2>

            <QRTypeSelector
              qrType={qrType}
              setQrType={setQrType}
            />

            <QRInput
              qrType={qrType}
              formData={formData}
              updateFormData={updateFormData}
            />

          </div>

          {/* CUSTOMIZATION */}
          <div className="card">

            <h2>Customization</h2>

            <Customization
              settings={settings}
              updateSettings={updateSettings}
            />

          </div>

          {/* PRESETS */}
          <div className="card">

            <h2>Presets</h2>

            <Presets
              updateSettings={updateSettings}
            />

          </div>

        </section>

        {/* RIGHT SIDE */}
        <section className="preview-section">

          <QRPreview
            qrType={qrType}
            formData={formData}
            settings={settings}
            onSave={saveCurrentQR}
          />

        </section>

      </main>

      {/* RECENT QR CODES */}
      <section className="recent-section">

        <RecentQR
          recentQRs={recentQRs}
          loadRecentQR={loadRecentQR}
          deleteRecentQR={deleteRecentQR}
        />

      </section>

    </div>
  );
}

export default App;