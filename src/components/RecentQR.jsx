function RecentQR({
  recentQRs,
  loadRecentQR,
  deleteRecentQR,
}) {
  return (
    <div className="recent-container">

      <div className="recent-header">
        <div>
          <h2>Recent QR Codes</h2>

          <p>
            Your saved QR configurations
          </p>
        </div>
      </div>

      {recentQRs.length === 0 ? (
        <div className="no-recent">
          <p>No recent QR codes yet.</p>

          <span>
            Generate a QR code and click
            "Save to Recent".
          </span>
        </div>
      ) : (
        <div className="recent-grid">

          {recentQRs.map((qr) => (
            <div
              className="recent-card"
              key={qr.id}
            >
              <div className="recent-icon">
                QR
              </div>

              <div className="recent-info">
                <strong>
                  {qr.type.toUpperCase()}
                </strong>

                <span>
                  QR Configuration
                </span>
              </div>

              <div className="recent-actions">

                <button
                  onClick={() =>
                    loadRecentQR(qr)
                  }
                >
                  Reuse
                </button>

                <button
                  onClick={() =>
                    deleteRecentQR(qr.id)
                  }
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default RecentQR;