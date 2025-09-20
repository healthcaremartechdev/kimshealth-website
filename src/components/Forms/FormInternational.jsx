"use client";
import { getBaseUrl } from "@/helper/getBaseUrl";
import getStaticText from "@/helper/getStaticText";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const FormInternational = () => {
  const [basePath, setBasePath] = useState();
  const [staticTexts, setStaticTexts] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    number: "+1",
  });
  const [loading, setLoading] = useState(false);
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  // Init intlTelInput once
  useEffect(() => {
    if (typeof window !== "undefined" && phoneInputRef.current) {
      // eslint-disable-next-line no-undef
      itiRef.current = intlTelInput(phoneInputRef.current, {
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.5/build/js/utils.js",
        initialCountry: "us",
      });

      phoneInputRef.current.addEventListener("countrychange", (e) => {
        setFormData((prev) => ({
          ...prev,
          number: e.target.value,
        }));
      });

      phoneInputRef.current.addEventListener("input", (e) => {

        setFormData((prev) => ({
          ...prev,
          number: e.target.value,
        }));
      });
    }
  }, []);

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData)

    if ([formData.name, formData.number].some((f) => !f)) {
      toast("Fill the required fields", {

        theme: "light",
        type: "error",
        closeOnClick: true,
      });
      setLoading(false);
      return;
    }



    // ✅ Validate phone number (10–13 digits, optional + at start)
    if (!/^\+?\d{10,13}$/.test(formData.number)) {
      toast("Enter a valid mobile number", {
        theme: 'light',
        type: 'error',
        closeOnClick: true
      })
      setLoading(false);
      return;
    }

    try {
      const htmlMsg = `
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Mobile Number:</strong> ${formData.number}</li>
          <li><strong> Page URL: </strong> ${document.location.href}</li>
        </ul>`;

      const req = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: htmlMsg, formType: "International" }),
      });

      const res = await req.json();

      if (req.status !== 200) {
        setLoading(false);
        return toast(res.err, {

          theme: "light",
          type: "error",
          closeOnClick: true,
        });
      }

      toast("Successfully sent", {

        theme: "light",
        type: "success",
        closeOnClick: true,
      });


      // Redirect with encoded htmlMsg
      const encodedMsg = encodeURIComponent(htmlMsg);
      window.location.href = `${basePath}/thank-you?msg=${encodedMsg}`;

      setFormData({ name: "", number: "+1" });
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {

        theme: "light",
        type: "error",
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTexts = async () => {
      setStaticTexts({ ...(await getStaticText()) });
    };

    setBasePath(getBaseUrl(true, true));
    fetchTexts();
  }, []);

  return (
    <form onSubmit={sendMail}>
      <div className="row">
        <div className="col-md-6 col-12 mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={staticTexts["Enter Your Name"]}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </div>
        </div>

        <div className="col-md-6 col-12 mb-3">
          <div className="input-group">
            <input
              type="tel"
              ref={phoneInputRef}
              className="form-control"
              placeholder={staticTexts["Enter Mobile Number"]}
              defaultValue={formData.number} // let intlTelInput handle formatting
            />
          </div>
        </div>

        <div className="col-md-6 col-12 mb-3">
          <button
            type="submit"
            className="form-btn w-auto px-5"
            disabled={loading}
          >
            {staticTexts["Submit"]}
            {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInternational;
