"use client"
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState } from 'react'
import langLoc from '@/helper/getLangLoc';
import getCurrentLangLocClient from '@/helper/getCurrentLangLocClient';
import { toast } from 'react-toastify';
import { getBaseUrl } from '@/helper/getBaseUrl';



const Form1 = ({ title, type, subject }) => {
  const [basePath, setBasePath] = useState();
  const [staticTexts, setStaticTexts] = useState({});
  const [allLocation, setAllLocation] = useState();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: "", number: "", hospital: '', query: ''
  });
  const [loading, setLoading] = useState(false);

  const sendMail = async () => {
    setLoading(true);
    if ([formData.name, formData.number, formData.hospital].some((field) => !field || field === "")) {
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
          <li><strong> Subject: </strong> ${type}${subject ? ` : ${subject}` : ""}</li>
          <li><strong> Name: </strong> ${formData.name}</li>
          <li><strong> Mobile Number: </strong> ${formData.number}</li>
          <li><strong> Hospital: </strong> ${formData.hospital.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</li>
          <li><strong> Message: </strong> ${formData.query}</li>
          <li><strong> Page URL: </strong> ${document.location.href}</li>
        </ul>`;
      const req = await fetch("/api/send-mail", {
        method: 'POST',
        'headers': {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: htmlMsg, formType: type ? type : "Contact", locationData: formData.hospital }),
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
      setFormData({ name: "", number: "", hospital: '', query: '' });
      setSelectedLocation("");
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


  useEffect(() => {
    const fetchTexts = async () => {
      setStaticTexts({ ...await getStaticText() })
    };


    setBasePath(getBaseUrl(true, true));
    fetchTexts();
  }, []);

  useEffect(() => {
    const get = async () => {
      setAllLocation(await langLoc.getLocations())

      const loc = (await getCurrentLangLocClient()).loc;
      setSelectedLocation(loc.slug);

      setFormData({
        ...formData, hospital: loc.slug
      })
    }

    get()

  }, [])


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
          <select className="form-control" value={selectedLocation} onChange={(e) => {
            setSelectedLocation(e.target.value);
            setFormData({ ...formData, hospital: e.target.value });
          }}>
            <option value={""}>{staticTexts['All Hospital']}</option>
            {
              allLocation?.map((loc, i) => {
                return <option value={loc.slug} key={i}>{loc.title}</option>
              })
            }
          </select>
        </div>
        <div className="col-md-12 mb-3">
          <input type="text" className="form-control"
            placeholder={staticTexts['Enter 10 Digit Mobile Number']}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            value={formData.number}
          />
        </div>
        <div className="col-md-12 mb-3">
          <textarea className="form-control" placeholder={staticTexts['Message']}
            id="floatingTextarea" onChange={(e) => setFormData({ ...formData, query: e.target.value })}
            value={formData.query}></textarea>
        </div>
        <div className="col-md-12 mb-3 text-center">
          <button className="btn mb-lg-0 mb-2 hospital-primarybtn px-5 py-2" disabled={loading} onClick={sendMail}>
            {staticTexts['Submit']}
            {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
          </button>
        </div>
      </div>
    </>
  )
}

export default Form1