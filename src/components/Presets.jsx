function Presets({ updateSettings }) {
  const presets = {
    classic: {
      size: 300,
      foreground: "#000000",
      background: "#ffffff",
      errorCorrection: "M",
      margin: 4,
    },

    dark: {
      size: 300,
      foreground: "#ffffff",
      background: "#111111",
      errorCorrection: "M",
      margin: 4,
    },

    ocean: {
      size: 300,
      foreground: "#0066cc",
      background: "#eaf6ff",
      errorCorrection: "M",
      margin: 4,
    },

    minimal: {
      size: 280,
      foreground: "#222222",
      background: "#fafafa",
      errorCorrection: "H",
      margin: 3,
    },
  };

  const applyPreset = (preset) => {
    Object.entries(preset).forEach(
      ([key, value]) => {
        updateSettings(key, value);
      }
    );
  };

  return (
    <div className="preset-grid">

      <button
        onClick={() => applyPreset(presets.classic)}
      >
        Classic
      </button>

      <button
        onClick={() => applyPreset(presets.dark)}
      >
        Dark
      </button>

      <button
        onClick={() => applyPreset(presets.ocean)}
      >
        Ocean
      </button>

      <button
        onClick={() => applyPreset(presets.minimal)}
      >
        Minimal
      </button>

    </div>
  );
}

export default Presets;