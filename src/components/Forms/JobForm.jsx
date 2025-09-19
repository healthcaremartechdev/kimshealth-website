"use client"
import { getBaseUrl } from "@/helper/getBaseUrl";
import getCurrentLangLocClient from "@/helper/getCurrentLangLocClient";
import langLoc from "@/helper/getLangLoc";
import getStaticText from "@/helper/getStaticText";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


const JobForm = ({ title, jobTitle }) => {
  const [basePath, setBasePath] = useState();
  const [staticTexts, setStaticTexts] = useState({});
  const [formData, setFormData] = useState({
    subject: jobTitle, name: "", number: '',
    attachment: "", filename: ''
  });
  const [loading, setLoading] = useState(false);


  const sendMail = async () => {
    setLoading(true);
    if ([formData.name, formData.number].some((field) => !field || field === "")) {
      toast("Fill the required fields", {

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
                        <li><strong> Subject: </strong> ${formData.subject}</li>
                        <li><strong> Name: </strong> ${formData.name}</li>
                        <li><strong> Mobile Number: </strong> ${formData.number}</li>
                        <li><strong> Page URL: </strong> ${document.location.href}</li>
                    </ul>
                `;
      console.log(formData)
      const req = await fetch("/api/send-mail", {
        method: 'POST',
        'headers': {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data: htmlMsg, formType: "Career", subject: formData.subject,
          attachment: formData.attachment, filename: formData.filename
        }),
      });

      const res = await req.json();

      if (req.status !== 200) {
        setLoading(false);
        return toast(res.err, {

          theme: 'light',
          type: 'error',
          closeOnClick: true
        })
      }

      toast("Successfully sent", {

        theme: 'light',
        type: 'success',
        closeOnClick: true
      })


      // Redirect with encoded htmlMsg
      const encodedMsg = encodeURIComponent(htmlMsg);
      window.location.href = `${basePath}/thank-you?msg=${encodedMsg}`;

      // Remove data
      setFormData({
        ...formData, name: "", number: '', attachment: "", filename: ""
      });
      setLoading(false);
      return;


    } catch (error) {
      console.log(error)
      setLoading(false);
      return toast("Something went wrong", {

        theme: 'light',
        type: 'error',
        closeOnClick: true
      })
    }

  }

  const ConvertBase64File = (e) => {
    const acceptedType = [".jpg", ".png", ".jpeg", ".pdf", ".gif", ".doc", ".docx"];
    const file = e.target.files[0];
    if (!file) return;

    // Extract file extension
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();

    // Validate file type
    if (!acceptedType.includes(fileExtension)) {
      return toast("Invalid file type. Allowed: " + acceptedType.join(", "), {

        theme: 'light',
        type: 'error',
        closeOnClick: true
      })
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({
        ...formData,
        attachment: reader.result,
        filename: file.name
      });
    };
    reader.readAsDataURL(file);
  };


  useEffect(() => {

    const fetchTexts = async () => {
      setStaticTexts({ ...await getStaticText() })
    };

    setBasePath(getBaseUrl(true, true));
    fetchTexts();
  }, []);


  return (
    <>
      <h3>{staticTexts[title]}</h3>
      <div className="row">
        <div className="col-md-12 mb-3">
          <input type="text" className="form-control" placeholder={staticTexts['Name']}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
        </div>
        <div className="col-md-12 mb-3">
          <input type="text" className="form-control"
            placeholder={staticTexts['Enter 10 Digit Mobile Number']}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            value={formData.number}
          />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
          <div className="file-input-group">
            <input type="file" maxLength="100" id="file-input"
              className="form-control file-input__input" onChange={ConvertBase64File} />
            <label htmlFor="file-input" className="file-input-label">
              <i className="icon-docs"></i>
              <span>{formData.filename ? formData.filename : staticTexts['Attach CV']}</span>
            </label>
          </div>
        </div>
        <div className="col-md-12 mb-3 text-center">
          <button
            className="btn mb-lg-0 mb-2 hospital-primarybtn px-5 py-2" onClick={() => sendMail()} disabled={loading}>
            {staticTexts['Submit']}
            {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
          </button>
        </div>
      </div>
    </>
  )
}

export default JobForm