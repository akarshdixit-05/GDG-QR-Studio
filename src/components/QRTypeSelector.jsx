function QRTypeSelector({ qrType, setQrType }) {
  return (
    <div className="form-group">
      <label htmlFor="qr-type">
        Choose QR Type
      </label>

      <select
        id="qr-type"
        value={qrType}
        onChange={(event) => setQrType(event.target.value)}
      >
        <option value="url">URL</option>
        <option value="text">Plain Text</option>
        <option value="email">Email</option>
        <option value="phone">Phone Number</option>
        <option value="wifi">Wi-Fi</option>
      </select>
    </div>
  );
}

export default QRTypeSelector;