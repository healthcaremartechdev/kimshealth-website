"use client"
import { getBaseUrl } from "@/helper/getBaseUrl";
import getCurrentLangLocClient from "@/helper/getCurrentLangLocClient";
import langLoc from "@/helper/getLangLoc";
import getStaticText from "@/helper/getStaticText";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


const SecondOpinionForm = ({ pageContent }) => {
    const [basePath, setBasePath] = useState();
    const [staticTexts, setStaticTexts] = useState({});
    const [selectedLocation, setSelectedLocation] = useState()
    const [locationList, setLocationList] = useState()
    const [selectedSpeciality, setSelectedSpeciality] = useState();
    const [allSpeciality, setAllSpeciality] = useState();
    const [formData, setFormData] = useState({
        subject: pageContent[1]?.title, name: "", number: '', speciality: '', query: '',
        attachment: "", filename: ''
    });
    const [loading, setLoading] = useState(false);


    const sendMail = async () => {
        setLoading(true);
        if ([formData.name, formData.speciality, formData.number].some((field) => !field || field === "")) {
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
                        <li><strong> Name: </strong> ${formData.name}</li>
                        <li><strong> Mobile Number: </strong> ${formData.number}</li>
                        <li><strong> Speciality: </strong> ${formData.speciality.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</li>
                        <li><strong> Query: </strong> ${formData.query}</li>
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
                    data: htmlMsg, formType: "Contact", subject: formData.subject,
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
                ...formData, name: "", number: '', speciality: '', query: '', attachment: "", filename: ""
            });
            setSelectedSpeciality("")
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


    const getSpeciality = async ({ lang, loc }) => {


        const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;
        // Get total count
        const initialReq = await fetch(`${baseUrl}/specialty-details?filters[locations][slug][$eq]=${loc}`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/specialty-details?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][slug][$eq]=${loc}&sort=title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }
        setAllSpeciality(data);
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
            let currentLangLoc = await getCurrentLangLocClient();
            console.log(currentLangLoc.loc.slug)
            setLocationList(await langLoc.getLocationsOnlyCMS())
            await getSpeciality({ loc: currentLangLoc.loc.slug });
        }
        get()

    }, [])



    return (
        <section className="section second-opinion-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="find-doctor-left-col">
                            <div className="tab-group text-center mb-3">
                                <button type="button" className="btn-tab treat-tab omega active"
                                    onClick={() => {
                                        showBox('omega')
                                        setFormData({ ...formData, subject: pageContent[1]?.title, speciality: "" })
                                    }}>
                                    {pageContent[1]?.title}
                                </button>

                                <button type="button" className="btn-tab treat-tab omega1"
                                    onClick={() => {
                                        showBox('omega1')
                                        setFormData({ ...formData, subject: pageContent[2]?.title, speciality: "Cancer" })
                                    }}>
                                    {pageContent[2]?.title}
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-8 expert-section">
                        <div className="treat-box" id="omega" style={{ display: "block" }}>

                            <div className="main-heading sub-heading main-list mb-4">
                                <h2>{pageContent[1]?.title}</h2>

                            </div>
                            <div className="custom-from bg-field mx-0">
                                <form action="">
                                    <div className="row justify-content-between">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="from-icon"><i
                                                    className="icon-user"></i></span>
                                                <input type="text" className="form-control pe-0" placeholder={staticTexts['Name'] + "*"}
                                                    aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    value={formData.name} />
                                            </div>
                                        </div>


                                        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="from-icon"><i
                                                    className="icon-phone"></i></span>
                                                <input type="text" className="form-control pe-0"
                                                    placeholder={staticTexts['Mobile Number'] + "*"}
                                                    aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                                    value={formData.number} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="from-icon"><i
                                                    className="icon-settings"></i></span>
                                                <select className="form-select from-location" value={selectedSpeciality} onChange={(e) => {
                                                    setSelectedSpeciality(e.target.value);
                                                    setFormData({ ...formData, speciality: e.target.value });
                                                }}>
                                                    <option value={""}>{staticTexts['Select a Department']}</option>
                                                    {
                                                        allSpeciality?.map((splty, i) => {
                                                            return <option value={splty.speciality?.slug} key={i}>{splty.title}</option>
                                                        })
                                                    }
                                                </select>

                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                            {/* <!-- <div className="input-group mb-3">
                                                            <span className="input-group-text" id="from-icon"><i
                                                                className="fa-solid fa-magnifying-glass"></i></span>
                                                            <input type="file" className="form-control pe-0"
                                                                placeholder="Search doctor/specialities" aria-label="Username"
                                                                aria-describedby="basic-addon1" />
                                                        </div> --> */}
                                            <div className="file-input-group">
                                                <input type="file" maxLength="100" id="file-input"
                                                    className="form-control file-input__input" name="report" onChange={ConvertBase64File} />
                                                <label htmlFor="file-input" className="file-input-label">
                                                    <i className="icon-docs"></i>
                                                    <span>{formData.filename ? formData.filename : staticTexts['Attach Report']}</span>
                                                </label>
                                            </div>
                                        </div>



                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="from-icon"><i
                                                    className="fa fa-pencil-square"></i></span>
                                                <textarea className="form-control pe-0" name='message'
                                                    placeholder={staticTexts['Type your query']} onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                                                    value={formData.query}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                            <div className="from-btn">
                                                <button type="button" className="btn d-inline-block w-auto" onClick={() => sendMail()} disabled={loading}>
                                                    {staticTexts['Submit']}
                                                    {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>



                        <div className="treat-box" id="omega1" style={{ display: "none" }}>
                            <div className="main-heading sub-heading main-list mb-4">
                                <h2>{pageContent[2]?.title}</h2>

                            </div>
                            <div className="custom-from bg-field mx-0">
                                <form action="">
                                    <div className="row justify-content-between">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="from-icon"><i
                                                    className="icon-user"></i></span>
                                                <input type="text" className="form-control pe-0" placeholder={staticTexts['Name'] + "*"}
                                                    aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    value={formData.name} />
                                            </div>
                                        </div>


                                        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="from-icon"><i
                                                    className="icon-phone"></i></span>
                                                <input type="text" className="form-control pe-0"
                                                    placeholder={staticTexts['Mobile Number'] + "*"}
                                                    aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                                    value={formData.number} />
                                            </div>
                                        </div>


                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                            {/* <!-- <div className="input-group mb-3">
                                                            <span className="input-group-text" id="from-icon"><i
                                                                className="fa-solid fa-magnifying-glass"></i></span>
                                                            <input type="file" className="form-control pe-0"
                                                                placeholder="Search doctor/specialities" aria-label="Username"
                                                                aria-describedby="basic-addon1" />
                                                        </div> --> */}
                                            <div className="file-input-group">
                                                <input type="file" maxLength="100" id="file-input"
                                                    className="form-control file-input__input" name="report" onChange={ConvertBase64File} />
                                                <label htmlFor="file-input" className="file-input-label">
                                                    <i className="icon-docs"></i>
                                                    <span>{formData.filename ? formData.filename : staticTexts['Attach Report']}</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="from-icon"><i
                                                    className="fa fa-pencil-square"></i></span>
                                                <textarea className="form-control pe-0" name='message'
                                                    placeholder={staticTexts['Type your query']} onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                                                    value={formData.query}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                            <div className="from-btn">
                                                <button type="button" className="btn d-inline-block w-auto" onClick={() => sendMail()} disabled={loading}>
                                                    {staticTexts['Submit']}
                                                    {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecondOpinionForm;