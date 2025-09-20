"use client"
import getStaticText from "@/helper/getStaticText";
import langLoc from '@/helper/getLangLoc';
import { useEffect, useState } from "react";
import getCurrentLangLocClient from "@/helper/getCurrentLangLocClient";
import { toast } from "react-toastify";
import { getBaseUrl } from "@/helper/getBaseUrl";



const ContactUsForm = () => {
    const [basePath, setBasePath] = useState();
    const [staticTexts, setStaticTexts] = useState({});
    const [allLocation, setAllLocation] = useState();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [formData, setFormData] = useState({
        subject: 'Appointment Queries', fname: "", lname: '', number: '', email: '', hospital: '', query: ''
    });
    const [loading, setLoading] = useState(false);



    const sendMail = async () => {
        setLoading(true);
        if ([formData.fname, formData.lname, formData.number, formData.email, formData.hospital, formData.query].some((field) => !field || field === "")) {
            toast("Fill the required fields", {
                theme: 'light',
                type: 'error',
                closeOnClick: true
            })
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
                        <li><strong> Subject: </strong> ${formData.subject}</li>
                        <li><strong> First Name: </strong> ${formData.fname}</li>
                        <li><strong> Last Name: </strong> ${formData.lname}</li>
                        <li><strong> Mobile Number: </strong> ${formData.number}</li>
                        <li><strong> Email: </strong> ${formData.email}</li>
                        <li><strong> Hospital: </strong> ${formData.hospital.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</li>
                        <li><strong> Query: </strong> ${formData.query}</li>
                        <li><strong> Page URL: </strong> ${document.location.href}</li>
                    </ul>
                `;
            const req = await fetch("/api/send-mail", {
                method: 'POST',
                'headers': {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ data: htmlMsg, formType: "Contact", subject: formData.subject, locationData: formData.hospital }),
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
                ...formData, fname: "", lname: '', number: '', email: '', hospital: '', query: ''
            })
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
        <div className="col-md-6 contact-right-col order-lg-2 order-1 ">
            <div className="association-form-card mb-5 sticky-from custom-tab-button-wrapper">
                <div className="tab-group text-start mb-3">
                    <button type="button" className="btn-tab treat-tab form-btn w-auto w-md-100 mb-lg-auto mb-1 active mx-2 omega d-inline-block"
                        onClick={() => {
                            showBox('omega')
                            setFormData({ ...formData, subject: 'Appointment Queries' })
                        }}>
                        {staticTexts['Appointment Queries']}
                    </button>

                    <button type="button" className="btn-tab form-btn w-auto w-md-100 treat-tab mx-2 omega1" onClick={() => {
                        showBox('omega1')
                        setFormData({ ...formData, subject: 'Feedback/Complaints' })
                    }}>
                        {staticTexts['Feedback/Complaints']}
                    </button>
                </div>
                <div className="treat-box" id="omega" style={{ 'display': 'block' }}>
                    <div className="custom-from bg-field mx-0">
                        <div className="row justify-content-between">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['First Name']}*</label>
                                <input type="text" className="form-control pe-0"
                                    onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                                    value={formData.fname}
                                />

                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['Last Name']}*</label>
                                <input type="text" className="form-control pe-0"
                                    onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                                    value={formData.lname}
                                />
                            </div>


                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['Mobile Number']}*</label>
                                <input type="text" id="phone" defaultValue="+91" className="form-control pe-0"
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                    value={formData.number}
                                />
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['Email']}*</label>
                                <input type="text" className="form-control pe-0"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    value={formData.email}
                                />
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['Hospitals']}*</label>
                                <select className="form-select from-location" value={selectedLocation} onChange={(e) => {
                                    setSelectedLocation(e.target.value)
                                    setFormData({ ...formData, hospital: e.target.value })
                                }}>
                                    <option value={""}>{staticTexts['All Hospital']}</option>
                                    {
                                        allLocation?.map((loc, i) => {
                                            return <option value={loc.slug} key={i}>{loc.title}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['Query']}*</label>
                                <textarea className="form-control" placeholder="Leave a comment here"
                                    id="floatingTextarea" onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                                    value={formData.query}></textarea>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                <div className="from-btn">
                                    <button type="button" className="btn d-inline-block w-auto"
                                        onClick={() => sendMail()} disabled={loading}>
                                        {staticTexts['Submit']}
                                        {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="treat-box" id="omega1" style={{ display: 'none' }}>
                    <div className="custom-from bg-field mx-0">
                        <div className="row justify-content-between">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['First Name']}*</label>
                                <input type="text" className="form-control pe-0"
                                    onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                                    value={formData.fname}
                                />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['Last Name']}*</label>
                                <input type="text" className="form-control pe-0"
                                    onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                                    value={formData.lname}
                                />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['Mobile Number']}*</label>
                                <input type="text" id="tel" defaultValue="+91" className="form-control pe-0"
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                    value={formData.number}
                                />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['Email']}*</label>
                                <input type="email" className="form-control pe-0"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    value={formData.email}
                                />
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['Hospitals']}*</label>
                                <select className="form-select from-location" value={selectedLocation} onChange={(e) => {
                                    setSelectedLocation(e.target.value)
                                    setFormData({ ...formData, hospital: e.target.value })
                                }}>
                                    <option value={""}>{staticTexts['Select Hospital']}</option>
                                    {
                                        allLocation?.map((loc, i) => {
                                            return <option value={loc.slug} key={i}>{loc.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                <label htmlFor=''>{staticTexts['Query']}*</label>
                                <textarea className="form-control" placeholder={staticTexts["Leave a comment here"]}
                                    id="floatingTextarea" onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                                    value={formData.query}></textarea>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                <div className="from-btn">
                                    <button type="button" className="btn d-inline-block w-auto"
                                        onClick={() => sendMail()} disabled={loading}>
                                        {staticTexts['Submit']}
                                        {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUsForm