"use client"
import langLoc from '@/helper/getLangLoc';
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState } from 'react';
import getCurrentLangLocClient from '@/helper/getCurrentLangLocClient';
import { toast } from 'react-toastify';


const Form3 = ({ title }) => {
    const [allLocation, setAllLocation] = useState();
    const [staticTexts, setStaticTexts] = useState({});
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [formData, setFormData] = useState({
        name: "", number: "", hospital: ''
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
                            <li><strong> Name: </strong> ${formData.name}</li>
                            <li><strong> Mobile Number: </strong> ${formData.number}</li>
                            <li><strong> Hospital: </strong> ${formData.hospital.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</li>
                            <li><strong> Page URL: </strong> ${document.location.href}</li>
                        </ul>
                    `;
            const req = await fetch("/api/send-mail", {
                method: 'POST',
                'headers': {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ data: htmlMsg, formType: "Contact", locationData: formData.hospital }),
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

            // Remove data
            setFormData({ name: "", number: "", hospital: '' })
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

        fetchTexts();
    }, []);

    useEffect(() => {
        const get = async () => {
            setAllLocation(await langLoc.getLocations());

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

            <h3>{title}</h3>
            <div className="rounded-field-form mb-3">
                <div className="row">
                    <div className="col-12 mb-3">
                        <label className="form-label">{staticTexts['Select Hospital']} <span>*</span></label>
                        <select className="form-select" value={selectedLocation} onChange={(e) => {
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
                    <div className="col-12 mb-3">
                        <label className="form-label">{staticTexts['Name']} <span>*</span></label>
                        <input type="text" className="form-control"
                            placeholder={staticTexts['Enter Your Name']}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            value={formData.name}
                        />
                    </div>

                    <div className="col-12 mb-3">
                        <label className="form-label">{staticTexts['Mobile Number']}<span>*</span></label>
                        <input type="text" className="form-control"
                            placeholder={staticTexts['Enter Mobile No.']} name="name"
                            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                            value={formData.number}
                        />
                    </div>

                    <div className="col-12 mb-3">
                        <button className="form-btn" onClick={sendMail} disabled={loading}>
                            {staticTexts['Submit']}
                            {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form3;
