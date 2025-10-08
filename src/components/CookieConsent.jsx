"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true); // show modal if no choice yet
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="modal show fade"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: '#b71c2b', color: 'white' }}>
          <div className="modal-header border-0">
            <h5 className="modal-title">Cookie Consent</h5>
          </div>
          <div className="modal-body">
            <p>
              We use cookies to improve your browsing experience, analyze website traffic, and provide personalized content. Cookies help us understand how you interact with our website and enhance your experience.
            </p>
            <p>
              By clicking <strong>Accept</strong>, you consent to the use of non-essential cookies. If you choose <strong>Reject</strong>, only essential cookies necessary for the website to function will be used.
            </p>
            <p>
              You can change your preferences at any time by clearing your cookies or updating your browser settings.
            </p>
          </div>
          <div className="modal-footer border-0">
            <button
              className="btn"
              style={{ backgroundColor: 'black', color: 'white' }}
              onClick={handleReject}
            >
              Reject
            </button>
            <button
              className="btn"
              style={{ backgroundColor: 'white', color: '#b71c2b' }}
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
