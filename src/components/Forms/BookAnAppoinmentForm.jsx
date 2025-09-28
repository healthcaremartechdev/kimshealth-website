"use client";
import getStaticText from '@/helper/getStaticText';
import getCurrentLangLocClient from '@/helper/getCurrentLangLocClient'
import langLoc from '@/helper/getLangLoc'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getBaseUrl } from '@/helper/getBaseUrl';



const BookAnAppoinmentForm = ({ pageContent, URLParams }) => {
    const [basePath, setBasePath] = useState();
    const [staticText, setStaticText] = useState({});
    const [locationList, setLocationList] = useState();
    const [allHospital, setAllHospital] = useState();
    const [allSpeciality, setAllSpeciality] = useState();
    const [allDoctors, setAllDoctors] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(URLParams.location || null)
    const [selectedHospital, setSelectedHospital] = useState(URLParams.hospital || null);
    const [selectedSpeciality, setSelectedSpeciality] = useState(URLParams.speciality);
    const [selectedDoctor, setSelectedDoctor] = useState(URLParams.doctor);
    const [doctorLoading, setDoctorLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '', contactNumber: '', emailID: '', location: URLParams.location, hospital: URLParams.hospital,
        department: URLParams.speciality, doctor: URLParams.doctor, appoinmentDate: '', appoinmentTime: ''
    });
    const [loading, setLoading] = useState(false);




    const getMinDate = () => {
        const now = new Date();
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        // if time > 4PM, disable today
        if (now.getHours() >= 16) {
            return tomorrow.toISOString().split("T")[0];
        } else {
            return today.toISOString().split("T")[0];
        }
    };


    const sendMail = async () => {
        setLoading(true);
        if ([formData.name, formData.contactNumber, formData.emailID, formData.location, formData.hospital, formData.department, formData.doctor, formData.appoinmentDate].some((field) => !field || field === "")) {
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

        // ✅ Validate appointment date
        if (!formData.appoinmentDate || formData.appoinmentDate < getMinDate()) {
            toast("Please select a valid appointment date", {
                theme: "light",
                type: "error",
                closeOnClick: true,
            });
            setLoading(false);
            return;
        }

        try {
            const htmlMsg = `
                <ul>
                    <li><strong> Patient / Visitor Name: </strong> ${formData.name}</li>
                    <li><strong> Contact Number: </strong> ${formData.contactNumber}</li>
                    <li><strong> Email: </strong> ${formData.emailID}</li>
                    <li><strong> Location: </strong> ${formData.location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</li>
                    <li><strong> Hospital: </strong> ${formData.hospital.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</li>
                    <li><strong> Department: </strong> ${formData.department.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</li>
                    <li><strong> Doctor: </strong> ${formData.doctor}</li>
                    <li><strong> Appointment Date: </strong> ${formData.appoinmentDate}</li>
                    <li><strong> Page URL: </strong> ${document.location.href}</li>
                </ul>
            `;
            const req = await fetch("/api/send-mail", {
                method: 'POST',
                'headers': {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ data: htmlMsg, formType: "Book Appointment", locationData: formData.location, hospital: formData.hospital }),
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
                name: '', contactNumber: '', emailID: '', location: '', hospital: '',
                department: "", doctor: '', appoinmentDate: '', appoinmentTime: ''
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





    const getHospital = async ({ lang, loc }) => {

        const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;

        const locationFilter = loc
            ? `&filters[location][slug][$eq]=${loc}`
            : `&filters[location][slug][$eq]=${loc}`;

        // Get total count
        const initialReq = await fetch(`${baseUrl}/hospitals?${locationFilter}`);


        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/hospitals?fields=title&fields=slug${locationFilter}&populate[0]=manageAppearance&populate[1]=location&pagination[start]=${start}&pagination[limit]=${limit}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];

        }

        return data;
    }

    const getSpeciality = async ({ lang, loc, hospital }) => {

        const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;

        const locationFilter = loc
            ? `&filters[locations][slug][$eq]=${loc}`
            : ``;

        const hospitalFilter = hospital
            ? `&filters[speciality][hospitals][slug][$eq]=${hospital}`
            : ``;

        // Get total count
        const initialReq = await fetch(`${baseUrl}/specialty-details?${locationFilter}${hospitalFilter}&filters[appointmentAvailable][$eq]=true`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        const pagecount = hospital
            ? pages
            : 0;

        console.log(`${baseUrl}/specialty-details?${locationFilter}${hospitalFilter}`)

        // Actual Data
        for (let i = 0; i < pagecount; i++) {
            const start = i * limit;
            const url = `${baseUrl}/specialty-details?populate=*&pagination[start]=${start}&pagination[limit]=${limit}${locationFilter}${hospitalFilter}&filters[speciality][specialities][$null]=true&filters[appointmentAvailable][$eq]=true&sort=title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }


        return data;
    }

    const getDoctor = async ({ lang, loc, hospital, speciality }) => {
        setDoctorLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;

        const locationFilter = loc
            ? `&filters[locations][slug][$eq]=${loc}`
            : ``;

        const hospitalFilter = loc
            ? `&filters[hospitals][slug][$eq]=${hospital}`
            : ``;

        const specialityFilter = speciality
            ? `&filters[specialities][slug][$eq]=${speciality}`
            : ``;

        // Get total count
        const initialReq = await fetch(`${baseUrl}/doctor-details?${locationFilter}${specialityFilter}${hospitalFilter}`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/doctor-details?populate=*&pagination[start]=${start}&pagination[limit]=${limit}${locationFilter}${specialityFilter}${hospitalFilter}&sort=name:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        setAllDoctors(data);
        setDoctorLoading(false)
    }




    useEffect(() => {
        const get = async () => {
            let currentLangLoc = await getCurrentLangLocClient();

            // If no location is selected, set the default one
            if (!selectedLocation) {
                setSelectedLocation(currentLangLoc.loc.slug);
                setFormData(prev => ({
                    ...prev,
                    location: currentLangLoc.loc.slug
                }));
                return; // stop here, let useEffect re-run with updated selectedLocation
            }

            // Fetch data only after location is set
            setLocationList(await langLoc.getLocationsOnlyCMS());
            setAllHospital(await getHospital({ loc: selectedLocation }));
            setAllSpeciality(await getSpeciality({
                loc: selectedLocation,
                hospital: selectedHospital || ""
            }));
            await getDoctor({
                loc: selectedLocation,
                hospital: selectedHospital || "",
                speciality: selectedSpeciality || ""
            });
        };
        get();
    }, [selectedLocation, selectedHospital, selectedSpeciality]);







    useEffect(() => {
        const get = async () => {
            let currentLangLoc = await getCurrentLangLocClient();

            if (!selectedLocation)
                setSelectedLocation(currentLangLoc.loc.slug)

        }
        get()

    }, [])

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
                                                            <label htmlFor=''>{staticText['Location']}*</label>
                                                            <select className="form-select from-location" value={selectedLocation} onChange={(e) => {
                                                                setSelectedLocation(e.target.value);
                                                                setFormData({ ...formData, location: e.target.value });
                                                            }}>
                                                                <option value={""}>{staticText['Select a Location']}</option>
                                                                {
                                                                    locationList?.map((loc, i) => {
                                                                        return <option value={loc.slug} key={i}>{loc.title}</option>
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
                                                            <label htmlFor=''>{staticText['Hospital']}*</label>
                                                            <select className="form-select from-location" value={selectedHospital} onChange={(e) => {
                                                                setSelectedHospital(e.target.value);
                                                                setFormData({ ...formData, hospital: e.target.value });
                                                            }}>
                                                                <option value={""}>{staticText['Select Hospital']}</option>
                                                                {
                                                                    allHospital?.map((hos, i) => {
                                                                        return <option value={hos.slug} key={i}>{hos.title}</option>
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
                                                            <label htmlFor=''>{staticText['Select Department']}*</label>
                                                            <select className="form-select from-location" value={selectedSpeciality} onChange={(e) => {
                                                                setSelectedSpeciality(e.target.value);
                                                                setFormData({ ...formData, department: e.target.value, doctor:"" });
                                                            }}>
                                                                <option value={""}>{staticText['Select a Department']}</option>
                                                                {
                                                                    allSpeciality?.map((splty, i) => {
                                                                        return <option value={splty.speciality?.slug} key={i}>{splty.title}</option>
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
                                                            <label htmlFor=''>{staticText['Select Doctors']}*</label>
                                                            <select className="form-select from-location" value={selectedDoctor} onChange={(e) => {
                                                                setSelectedDoctor(e.target.value);
                                                                setFormData({ ...formData, doctor: e.target.value });
                                                            }}>
                                                                {!doctorLoading ? (
                                                                    <>
                                                                        <option value="">{staticText['Select a Doctor']}</option>
                                                                        {allDoctors.map((d, i) => (
                                                                            <option value={`${d?.salutation ? d?.salutation + " " : ""}${d?.name}`} key={i}>
                                                                                {`${d?.salutation ? d?.salutation + " " : ""}${d?.name}`}
                                                                            </option>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    <option value="">{staticText['Loading...'] || 'Loading...'}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-md-6 mb-3">
                                                <div className="custom-from bg-field mx-0">
                                                    <div className="row justify-content-between">

                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                            <label htmlFor=''>{staticText['Appointment Date']}*</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="date"
                                                                    placeholder="Select Your Date"
                                                                    name="appoinmentDate"
                                                                    className="form-control pe-0"
                                                                    autoComplete="off"
                                                                    min={getMinDate()} // 🔥 dynamic min date
                                                                    value={formData.appoinmentDate}
                                                                    onClick={(e) => {
                                                                        // Force open date picker on click anywhere inside input
                                                                        if (e.target.showPicker) {
                                                                            e.target.showPicker();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        setFormData({
                                                                            ...formData,
                                                                            appoinmentDate: e.target.value, // <-- update state
                                                                        });
                                                                    }}
                                                                />

                                                            </div>
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

export default BookAnAppoinmentForm;
