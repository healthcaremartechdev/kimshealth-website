"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleSubmit = () => {
    if (checked) {
      localStorage.setItem("cookieConsent", "accepted");
      setVisible(false);
    }
  };


  if (!visible) return null;

  return (
    <div
      className="modal show fade"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content"
          style={{ backgroundColor: "#b71c2b", color: "white" }}
        >
          <div className="modal-body">

            <div className="form-check mt-3">
              <input
                type="checkbox"
                id="consentCheck"
                className="form-check-input"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label
                htmlFor="consentCheck"
                className="form-check-label"
                style={{ marginLeft: "8px" }}
              >
                I acknowledge and agree that I have read and understood this <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "white",
                  textDecoration: "underline",
                  fontWeight: "bold",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "3px",
                }}
              >
                Privacy Policy
              </a>  and hereby expressly authorize and consent to the processing of my personal information for the purposes and in the manner set out in this Privacy Policy.
              </label>
            </div>
          </div>

          <div className="modal-footer border-0 justify-content-center">
            <button
              className="btn"
              style={{
                backgroundColor: checked ? "white" : "gray",
                color: checked ? "#b71c2b" : "white",
                cursor: checked ? "pointer" : "not-allowed",
                minWidth: "120px",
              }}
              disabled={!checked}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
