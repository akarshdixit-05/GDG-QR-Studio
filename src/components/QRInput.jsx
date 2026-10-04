function QRInput({ qrType, formData, updateFormData }) {
  const renderInput = () => {
    switch (qrType) {
      case "url":
        return (
          <div className="form-group">
            <label>URL</label>

            <input
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(event) =>
                updateFormData("url", event.target.value)
              }
            />
          </div>
        );

      case "text":
        return (
          <div className="form-group">
            <label>Text</label>

            <textarea
              placeholder="Enter your text"
              value={formData.text}
              onChange={(event) =>
                updateFormData("text", event.target.value)
              }
            />
          </div>
        );

      case "email":
        return (
          <>
            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(event) =>
                  updateFormData("email", event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Subject</label>

              <input
                type="text"
                placeholder="Email subject"
                value={formData.subject}
                onChange={(event) =>
                  updateFormData("subject", event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Message</label>

              <textarea
                placeholder="Email message"
                value={formData.message}
                onChange={(event) =>
                  updateFormData("message", event.target.value)
                }
              />
            </div>
          </>
        );

      case "phone":
        return (
          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={(event) =>
                updateFormData("phone", event.target.value)
              }
            />
          </div>
        );

      case "wifi":
        return (
          <>
            <div className="form-group">
              <label>Wi-Fi Network Name</label>

              <input
                type="text"
                placeholder="Wi-Fi name"
                value={formData.wifiName}
                onChange={(event) =>
                  updateFormData("wifiName", event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="text"
                placeholder="Wi-Fi password"
                value={formData.wifiPassword}
                onChange={(event) =>
                  updateFormData(
                    "wifiPassword",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Security</label>

              <select
                value={formData.wifiSecurity}
                onChange={(event) =>
                  updateFormData(
                    "wifiSecurity",
                    event.target.value
                  )
                }
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return <div>{renderInput()}</div>;
}

export default QRInput;