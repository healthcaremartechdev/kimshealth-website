"use client";
import getStaticText from '@/helper/getStaticText';
import getCurrentLangLocClient from '@/helper/getCurrentLangLocClient'
import langLoc from '@/helper/getLangLoc'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';



const GetAnEstimateForm = ({ pageContent, URLParams }) => {
    const [staticText, setStaticText] = useState({});
    const [allSpeciality, setAllSpeciality] = useState();
    const [formData, setFormData] = useState({
        name: '', contactNumber: '', emailID: '', gender: '', age: '', country: '', speciality: '', docmentFilename: '', docmentAttachment: '', prescriptionFilename: '', prescriptionAttachment: '', query: ''
    });
    const [loading, setLoading] = useState(false);


    const sendMail = async () => {
        setLoading(true);
        if ([formData.name, formData.contactNumber, formData.emailID, formData.gender, formData.country, formData.speciality, formData.age].some((field) => !field || field === "")) {
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
                    <li><strong> Patient / Visitor Name: </strong> ${formData.name}</li>
                    <li><strong> Contact Number: </strong> ${formData.contactNumber}</li>
                    <li><strong> Email: </strong> ${formData.emailID}</li>
                    <li><strong> Gender: </strong> ${formData.gender}</li>
                    <li><strong> Age: </strong> ${formData.age}</li>
                    <li><strong> Country: </strong> ${formData.country}</li>
                    <li><strong> Speciality: </strong> ${formData.speciality}</li>
                    <li><strong> Query: </strong> ${formData.query}</li>
                    <li><strong> Page URL: </strong> ${document.location.href}</li>
                </ul>
            `;
            const req = await fetch("/api/send-mail", {
                method: 'POST',
                'headers': {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ data: htmlMsg, formType: "International" , subject: "Get An Estimate", locationData: "ip", ...formData}),
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

            setFormData({
                name: '', contactNumber: '', emailID: '', gender: '', age: '', country: '', speciality: '', docmentFilename: '', docmentAttachment: '', prescriptionFilename: '', prescriptionAttachment: '', query: ''
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
            setAllSpeciality(await getSpeciality({ loc: "ip" }));
        };

        fetchTexts();


    }, []);




    const ConvertBase64FileDocument = (e) => {
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
                docmentAttachment: reader.result,
                docmentFilename: file.name
            });
        };
        reader.readAsDataURL(file);
    };


    const ConvertBase64FilePrescription = (e) => {
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
                prescriptionAttachment: reader.result,
                prescriptionFilename: file.name
            });
        };
        reader.readAsDataURL(file);

    };




    const getSpeciality = async ({ lang, loc }) => {

        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;
        // Get total count
        const initialReq = await fetch(`${baseUrl}/specialities`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;


        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/specialities?populate=*&filters[specialities][$null]=true&pagination[start]=${start}&pagination[limit]=${limit}&sort=title:asc`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }


        return data;
    }






    return (
        <>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">

                        <div className="col-md-12 mb-3">
                            <div className="book-appointment-card">
                                <div className="main-heading text-center mb-4">
                                    <h2>{pageContent[1]?.title}</h2>

                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-10">
                                        <div className="row justify-content-center">
                                            <div className="col-md-6">
                                                <div className="custom-from bg-field mx-0">
                                                    <div className="row justify-content-between">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                            <label htmlFor=''>{staticText['Patient / Visitor Name']}*</label>
                                                            <input type="text" placeholder="Enter Your Name" name=""
                                                                className="form-control pe-0"
                                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                value={formData.name} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
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
                                            </div>
                                            <div className="col-md-6">
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
                                            </div>
                                            <div className="col-md-6">
                                                <div className="custom-from bg-field mx-0">
                                                    <div className="row justify-content-between">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                            <label htmlFor=''>{staticText['Gender']}*</label>
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
                                                            <label htmlFor=''>{staticText['Age']}*</label>
                                                            <input type="number" placeholder={staticText["Enter Your Age"]} name=""
                                                                className="form-control pe-0"
                                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                                value={formData.age}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="custom-from bg-field mx-0">
                                                    <div className="row justify-content-between">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                            <label htmlFor=''>{staticText['Country']}*</label>
                                                            <select className="form-select from-location" value={formData.country} onChange={(e) => {
                                                                setFormData({ ...formData, country: e.target.value });
                                                            }}>
                                                                <option value={""}>{staticText['Choose a Country']}</option>
                                                                <option value={"India"}>{"India"}</option>
                                                                <option value={"Bahrain"}>{"Bahrain"}</option>
                                                                <option value={"Oman"}>{"Oman"}</option>
                                                                <option value={"Qatar"}>{"Qatar"}</option>
                                                                <option value={"Saudi Arabia"}>{"Saudi Arabia"}</option>
                                                                <option value={"UAE"}>{"UAE"}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="custom-from bg-field mx-0">
                                                    <div className="row justify-content-between">

                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                            <label htmlFor=''>{staticText['Select Speciality']}*</label>
                                                            <select className="form-select from-location" value={formData.speciality} onChange={(e) => {
                                                                setFormData({ ...formData, speciality: e.target.value });
                                                            }}>
                                                                <option value={""}>{staticText['Select a Speciality']}</option>
                                                                {
                                                                    allSpeciality?.map((splty, i) => {
                                                                        return <option value={splty.title} key={i}>{splty.title}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="custom-from bg-field mx-0">
                                                    <div className="row justify-content-between">

                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                            <label htmlFor=''>{staticText['Upload Your Documents/Scans']}</label>
                                                            <div className="file-input-group">
                                                                <input type="file" maxLength="100" id="file-input"
                                                                    className="form-control file-input__input" onChange={ConvertBase64FileDocument} />
                                                                <label htmlFor="file-input" className="file-input-label estimate-upload">
                                                                    <i className="icon-docs"></i>
                                                                    <span>{formData.docmentFilename ? formData.docmentFilename : staticText['Upload Your Documents/Scans']}</span>
                                                                </label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="custom-from bg-field mx-0">
                                                    <div className="row justify-content-between">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                            <label htmlFor=''>{staticText['Upload Medical Prescription']}</label>
                                                            <div className="file-input-group">
                                                                <input type="file" maxLength="100" id="file-input2"
                                                                    className="form-control file-input__input" onChange={ConvertBase64FilePrescription} />
                                                                <label htmlFor="file-input2" className="file-input-label estimate-upload">
                                                                    <i className="icon-docs"></i>
                                                                    <span>{formData.prescriptionFilename ? formData.prescriptionFilename : staticText['Upload Medical Prescription']}</span>
                                                                </label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="custom-from bg-field mx-0">
                                                    <div className="row justify-content-between">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                            <label htmlFor=''>{staticText['Query']}</label>
                                                            <input type="text" placeholder={staticText["Type your query"]} name=""
                                                                className="form-control pe-0"
                                                                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                                                                value={formData.query}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-md-12">
                                                <div className="from-btn text-center">
                                                    <button type="button" className="btn d-inline-block w-auto" onClick={sendMail} disabled={loading}>
                                                        {staticText['Submit']}
                                                        {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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

export default GetAnEstimateForm;
