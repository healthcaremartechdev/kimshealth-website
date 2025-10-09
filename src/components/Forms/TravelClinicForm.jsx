"use client";
import getStaticText from '@/helper/getStaticText';
import getCurrentLangLocClient from '@/helper/getCurrentLangLocClient'
import langLoc from '@/helper/getLangLoc'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getBaseUrl } from '@/helper/getBaseUrl';



const TravelClinicForm = () => {
    const [basePath, setBasePath] = useState();
    const [staticText, setStaticText] = useState({});
    const [allSpeciality, setAllSpeciality] = useState();
    const [formData, setFormData] = useState({
        name: '', contactNumber: '', emailID: '', age: '', gender: '', associatedIllness: '', location: '', destination: '', travelDate: '', stayLength: '', query: ''
    });
    const [loading, setLoading] = useState(false);


    const sendMail = async () => {
        setLoading(true);
        if ([formData.name, formData.contactNumber, formData.emailID].some((field) => !field || field === "")) {
            toast("Fill the required fields", {
                theme: 'light',
                type: 'error',
                closeOnClick: true
            })
            setLoading(false);
            return;
        }



        // ✅ Validate phone number (10–13 digits, optional + at start)
        if (!/^\+?\d{10,13}$/.test(formData.contactNumber)) {
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
                    <li><strong> Name: </strong> ${formData.name}</li>
                    <li><strong> Contact Number: </strong> ${formData.contactNumber}</li>
                    <li><strong> Email: </strong> ${formData.emailID}</li>
                    <li><strong> Gender: </strong> ${formData.gender}</li>
                    <li><strong> Age: </strong> ${formData.age}</li>
                    <li><strong> Associated medical illness: </strong> ${formData.associatedIllness}</li>
                    <li><strong> Where do you live currently?: </strong> ${formData.location}</li>
                    <li><strong> Travel destination: </strong> ${formData.destination}</li>
                    <li><strong> Date of travel: </strong> ${formData.travelDate}</li>
                    <li><strong> Length of stay: </strong> ${formData.stayLength}</li>
                    <li><strong> Query: </strong> ${formData.query}</li>
                    <li><strong> Page URL: </strong> ${document.location.href}</li>
                </ul>
            `;
            const req = await fetch("/api/send-mail", {
                method: 'POST',
                'headers': {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ data: htmlMsg, formType: "Contact", subject: "Travel Clinic" }),
                // credentials: "include",
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

            setLoading(false);
            toast("Successfully sent", {
                theme: 'light',
                type: 'success',
                closeOnClick: true
            });


            // Redirect with encoded htmlMsg
            const encodedMsg = encodeURIComponent(htmlMsg);
            window.location.href = `${basePath}/thank-you?msg=${encodedMsg}`;

            setFormData({
                name: '', contactNumber: '', emailID: '', age: '', gender: '', associatedIllness: '', location: '', destination: '', travelDate: '', stayLength: '', query: ''
            });
            return


        } catch (error) {
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
            setStaticText({ ...await getStaticText() })
        };

        setBasePath(getBaseUrl(true, true));
        fetchTexts();


    }, []);










    return (
        <>

            <section className="section travel-clinic-main-page book-appointment-main-page pt-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Name']}*</label>
                                                <input type="text" placeholder="Enter Your Name" name=""
                                                    className="form-control pe-0"
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    value={formData.name} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Contact Number']}*</label>
                                                <input type="text" placeholder={staticText["Enter Your Phone Number"]} name=""
                                                    className="form-control pe-0"
                                                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                                    value={formData.contactNumber}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Email']}*</label>
                                                <input type="text" placeholder={staticText["Enter Your Email"]} name=""
                                                    className="form-control pe-0"
                                                    onChange={(e) => setFormData({ ...formData, emailID: e.target.value })}
                                                    value={formData.emailID}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Age']}</label>
                                                <input type="number" placeholder={staticText["Enter Your Age"]} name=""
                                                    className="form-control pe-0"
                                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                    value={formData.age}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Gender']}</label>
                                                <select className="form-select from-location" value={formData.gender} onChange={(e) => {
                                                    setFormData({ ...formData, gender: e.target.value });
                                                }}>
                                                    <option value={""}>{staticText['Select a Gender']}</option>
                                                    <option value={"Male"}>{staticText['Male']}</option>
                                                    <option value={"Female"}>{staticText['Female']}</option>
                                                    <option value={"Others"}>{staticText['Others']}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div className="col-md-6">

                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Associated medical illness']}</label>
                                                <input type="text" placeholder="Enter Associated medical illness" name=""
                                                    className="form-control pe-0"
                                                    onChange={(e) => setFormData({ ...formData, associatedIllness: e.target.value })}
                                                    value={formData.associatedIllness} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Where do you live currently?']}</label>
                                                <input type="text" placeholder="Enter Your Location" name=""
                                                    className="form-control pe-0"
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    value={formData.location} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Travel destination']}</label>
                                                <input type="text" placeholder="Enter your travel destination" name=""
                                                    className="form-control pe-0"
                                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                                    value={formData.destination} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Date of travel']}</label>

                                                <input
                                                    type="date"
                                                    placeholder="Select Your Date"
                                                    name="travelDate"
                                                    className="form-control pe-0"
                                                    autoComplete="off"
                                                    value={formData.travelDate}
                                                    onClick={(e) => {
                                                        // Force open date picker on click anywhere inside input
                                                        if (e.target.showPicker) {
                                                            e.target.showPicker();
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            travelDate: e.target.value, // <-- update state
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>




                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Length of stay']}*</label>
                                                <input type="text" placeholder={staticText["Enter Length of stay"]} name=""
                                                    className="form-control pe-0"
                                                    onChange={(e) => setFormData({ ...formData, stayLength: e.target.value })}
                                                    value={formData.stayLength}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <div className="custom-from bg-field mx-0">
                                        <div className="row justify-content-between">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <label htmlFor=''>{staticText['Post your queries here']}</label>
                                                <textarea
                                                    placeholder={staticText["Post your queries here"]} name=""
                                                    className="form-control pe-0"
                                                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                                                    value={formData.query}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-12 mb-5">
                                    <div className="from-btn">
                                        <p>Note: Online queries will be answered from Monday to Saturday, 9 AM till 4 PM</p>
                                        <button type="button" className="btn d-inline-block w-auto" onClick={sendMail} disabled={loading}>
                                            {staticText['Submit']}
                                            {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
                                        </button>
                                    </div>
                                </div>


                                <div className="col-md-12">
                                    <div className="from-btn">
                                        <p>Submit your queries at least 2-4 weeks prior to travel so as to plan preventive measures</p>
                                        <a href="https://consult.bestdocapp.com/home/KIMSTVM?version=new" target='_blank' className="btn d-inline-block w-auto">
                                            {staticText['Click to book an Teleconsultation']}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TravelClinicForm;
