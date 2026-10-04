function Customization({ settings, updateSettings }) {
  return (
    <div className="customization">

      <div className="form-group">
        <label>
          QR Size: {settings.size}px
        </label>

        <input
          type="range"
          min="150"
          max="500"
          value={settings.size}
          onChange={(event) =>
            updateSettings(
              "size",
              Number(event.target.value)
            )
          }
        />
      </div>

      <div className="color-row">

        <div className="form-group">
          <label>Foreground</label>

          <input
            type="color"
            value={settings.foreground}
            onChange={(event) =>
              updateSettings(
                "foreground",
                event.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>Background</label>

          <input
            type="color"
            value={settings.background}
            onChange={(event) =>
              updateSettings(
                "background",
                event.target.value
              )
            }
          />
        </div>

      </div>

      <div className="form-group">
        <label>Error Correction</label>

        <select
          value={settings.errorCorrection}
          onChange={(event) =>
            updateSettings(
              "errorCorrection",
              event.target.value
            )
          }
        >
          <option value="L">Low</option>
          <option value="M">Medium</option>
          <option value="Q">Quartile</option>
          <option value="H">High</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          Margin: {settings.margin}
        </label>

        <input
          type="range"
          min="0"
          max="10"
          value={settings.margin}
          onChange={(event) =>
            updateSettings(
              "margin",
              Number(event.target.value)
            )
          }
        />
      </div>

    </div>
  );
}

export default Customization;