"use client";
import doctorData from '@/app/lib/getDoctor';
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState, useRef } from 'react';
import Form3 from './Forms/Form3';
import getSpecialityData from '@/app/lib/getSpeciality';



const DoctorListing = ({ baseURL, allLocation, allHospital, allSpeciality, allDoctorCount, langLoc, URLParams }) => {
    const [docData, setDocData] = useState([]);
    const [count, setCount] = useState(0);
    const [staticText, setStaticTexts] = useState({});
    const [locationList, setLocationList] = useState([]);
    const [hospitalList, setHospitalList] = useState([]);
    const [specialityList, setSpecialityList] = useState([]);
    const observerRef = useRef(null);
    const loadingRef = useRef(false); // throttle loading
    const [loading, setLoading] = useState(false);
    const [endData, setEndData] = useState(false);
    const limit = 12;

    async function setSpecility() {
        if (URLParams?.hospital) {
            setSpecialityList(
                await getSpecialityData.getSpecialityAllParent({
                    langLoc,
                    URLParams
                })
            );
        } else {
            setSpecialityList(allSpeciality);
        }
    }

    useEffect(() => {
        setLocationList(allLocation);
        setHospitalList(allHospital);
        setSpecility()

    }, [allLocation, allHospital, allSpeciality]);



    useEffect(() => {
        const fetchTexts = async () => {
            const texts = await getStaticText();
            setStaticTexts(texts);
        };

        // const getFstLoad = async () => {
        //     const tempStore = await doctorData.getDoctorAll(count, limit, langLoc);
        //     setDocData(tempStore);
        //     setCount(prev => prev + limit);
        // }


        // getFstLoad();
        fetchTexts();
    }, []);


    const loadDoctor = async () => {
        if (loading) return; // prevent multiple triggers
        setLoading(true);

        const data = await doctorData.getDoctorAll(count, limit, langLoc, URLParams);

        if (data.length < 1) {
            setEndData(true)
        }
        setDocData(prev => [...prev, ...data]);
        setCount(prev => prev + limit);

        setLoading(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !endData) {
                    loadDoctor();
                }
            },
            { threshold: 1 }
        );

        const currentRef = observerRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [count, loading, endData]);


    // const onLocationChange = (e) => {
    //     const search = e.target.value.toLowerCase();
    //     const filtered = allLocation.filter(loc => loc.title.toLowerCase().includes(search));
    //     setLocationList(filtered);
    // };

    // const onSpecialityChange = (e) => {
    //     const search = e.target.value.toLowerCase();

    //     if (!search) {
    //         setSpecialityList(allSpeciality);
    //         return;
    //     }

    //     const filtered = allSpeciality.filter(spl =>
    //         spl.title.toLowerCase().includes(search)
    //     );

    //     setSpecialityList(filtered);
    // };

    return (
        <section className="section">
            <div className="container">
                {/* <div className="row">
                    <div className="col-md-12 col-6">
                        <div className="main-heading">
                            <h2>{allDoctorCount} {staticText['Doctors Found']}</h2>
                        </div>
                    </div>
                    <div className="col-6 d-lg-none d-block">
                        <button type="button" className="btn-tab form-btn mx-2 filter-box-mobile">
                            {staticText['Filters']} <i className="fa-solid fa-filter"></i>
                        </button>
                    </div>
                </div> */}
                <div className="row">
                    {/* <div className="col-md-3 mb-4">
                        <div className="find-doctor-left-col filter-form">
                            <h4 className=" d-md-none d-block">{staticText['Select Filters']}</h4>

                            <div className="find-doc-box d-md-none d-block">
                                <h3>{staticText['By City']}</h3>
                                <div className="rounded-field-form mb-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search ...." onChange={onLocationChange} />
                                                <span className="input-group-text">
                                                    <i className="fa-solid fa-magnifying-glass"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option-find-doc">
                                        <ul>
                                            {locationList?.map((loc, index) => (
                                                <li key={index + "1"} >
                                                    <a href={`${baseURL}/doctor?location=${loc.slug}${URLParams.speciality ? `&speciality=${URLParams.speciality}` : ''}${URLParams.gender ? `&gender=${URLParams.gender}` : ''}${URLParams.hospital ? `&hospital=${URLParams.hospital}` : ''}`} className={loc.slug === URLParams.location ? 'active' : ''}>
                                                        {loc.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="find-doc-box d-md-none d-block">
                                <h3>{staticText['By Departments']}</h3>
                                <div className="rounded-field-form mb-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="input-group">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder={staticText['Search'] + " ....."}
                                                    onChange={onSpecialityChange}
                                                />
                                                <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option-find-doc">
                                        <ul>
                                            {specialityList?.map((s, index) => (
                                                <li key={index + "1"}>
                                                    <a href={`${baseURL}/doctor?speciality=${s.speciality?.slug}${URLParams.location ? `&location=${URLParams.location}` : ''}${URLParams.gender ? `&gender=${URLParams.gender}` : ''}${URLParams.hospital ? `&hospital=${URLParams.hospital}` : ''}`} className={s.speciality?.slug === URLParams.speciality ? 'active' : ''}>
                                                        {s.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="find-doc-box">
                                <h3>{staticText['By Gender']}</h3>
                                <div className="rounded-field-form mb-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="input-group">
                                                <select className="form-select" value={URLParams.gender ? URLParams.gender : ""} aria-label="Select Gender" onChange={(e) => {
                                                    location.href = `${baseURL}/doctor?gender=${e.target.value}${URLParams.speciality ? `&speciality=${URLParams.speciality}` : ''}${URLParams.location ? `&location=${URLParams.location}` : ''}${URLParams.hospital ? `&hospital=${URLParams.hospital}` : ''}`;
                                                }}>
                                                    <option value="">{staticText['Gender']}</option>
                                                    <option value="Male">{staticText['Male']}</option>
                                                    <option value="Female">{staticText['Female']}</option>
                                                    <option value="Others">{staticText['Others']}</option>
                                                </select>
                                                <span className="input-group-text"><i className="fa-solid fa-chevron-down"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className="find-doc-box">
                                <Form3 title={staticText['Need Help Making an Appointment?']} type="Doctor" />
                            </div>
                        </div>
                    </div> */}

                    {/* Doctor Cards */}
                    <div className="col-md-12 expert-section">
                        <div className="row desktop-doc-top-bar-from">
                            <div className="col-md-6 mb-3">
                                <div className="find-doctor-left-col filter-form d-block">
                                    <div className="rounded-field-form">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="input-group">
                                                    <select value={URLParams.hospital} className="form-select" aria-label="Default select example" onChange={(e) => {
                                                        location.href = `${baseURL}/doctor?hospital=${e.target.value}${URLParams.speciality ? `&speciality=${URLParams.speciality}` : ''}${URLParams.gender ? `&gender=${URLParams.gender}` : ''}${URLParams.location ? `&location=${URLParams.location}` : ''}`;
                                                    }}>
                                                        <option value={''}>{staticText['Select Hospital / Medical Center']}</option>

                                                        {hospitalList?.map((loc, index) => (
                                                            <option value={loc.slug} key={index + "1"}>{loc.title}</option>
                                                        ))}
                                                    </select>
                                                    <span onClick={(e) => {
                                                        const selectEl = e.currentTarget.closest(".input-group")?.querySelector("select");

                                                        if (selectEl) {
                                                            if (typeof selectEl.showPicker === "function") {
                                                                // ✅ Chrome / Edge
                                                                selectEl.showPicker();
                                                            } else {
                                                                // 🔄 Safari / Firefox fallback
                                                                selectEl.focus();
                                                            }
                                                        }
                                                    }} className="input-group-text">
                                                        <i className="fa-solid fa-angle-down"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="find-doctor-left-col filter-form d-block">
                                    <div className="rounded-field-form">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="input-group">
                                                    <select value={URLParams.speciality} className="form-select" aria-label="Default select example" onChange={(e) => {
                                                        location.href = `${baseURL}/doctor?speciality=${e.target.value}${URLParams.location ? `&location=${URLParams.location}` : ''}${URLParams.gender ? `&gender=${URLParams.gender}` : ''}${URLParams.hospital ? `&hospital=${URLParams.hospital}` : ''}`;
                                                    }}>
                                                        <option value={''}>Select Speciality</option>

                                                        {specialityList?.map((s, index) => (
                                                            <option value={s.speciality?.slug} key={index + "1"}>{s.title}</option>
                                                        ))}
                                                    </select>
                                                    <span onClick={(e) => {
                                                        const selectEl = e.currentTarget.closest(".input-group")?.querySelector("select");

                                                        if (selectEl) {
                                                            if (typeof selectEl.showPicker === "function") {
                                                                // ✅ Chrome / Edge
                                                                selectEl.showPicker();
                                                            } else {
                                                                // 🔄 Safari / Firefox fallback
                                                                selectEl.focus();
                                                            }
                                                        }
                                                    }} className="input-group-text">
                                                        <i className="fa-solid fa-angle-down"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row expert-doc-listing-box ">
                            {docData?.map((d, index) => (
                                <div className="col-md-3 col-6 mb-3" key={d.slug + index}>
                                    <div className="expert-card">
                                        <div className="card border-0 p-lg-4 p-0">
                                            <div className="card-top video-iconfor-doc">
                                                <a href={baseURL + "/doctor/" + d.slug}>
                                                    <img
                                                        src={d.doctorImage?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${d.doctorImage?.url}` : "/img/no-image.jpg"}
                                                        className="img-fluid w-100"
                                                        alt={`${d.salutation ? d.salutation + " " : ""}${d.name}`}
                                                    />

                                                </a>
                                                {d.teleConsultationAvailable && <a href='https://consult.bestdocapp.com/home/KIMSTVM?version=new' target='_blank'>
                                                    <span className="video-iconfor-listing"><i className="fa-solid fa-video"></i></span>
                                                </a>}
                                            </div>
                                            <div className="card-content px-0">
                                                <h4>{`${d.salutation ? d.salutation + " " : ""}${d.name}`}</h4>
                                                <p>{d.doctorDesignation}</p>
                                                <h5>{d.specialities[0]?.title}</h5>
                                                {/* <div className="from-btn">
                                                    <a href={`${baseURL}/book-an-appointment/?doctor=${d.name}`} className="btn">{staticText['Appointment']}</a>
                                                </div> */}
                                                <div className="from-btn">


                                                    {d.appointmentAvailable && (
                                                        <a
                                                            href={`${baseURL}/book-an-appointment/?doctor=${d?.salutation ? d?.salutation + " " : ""
                                                                }${d?.name}&location=${d?.locations?.[0]?.slug === "generic"
                                                                    ? d?.locations?.[1]?.slug
                                                                    : d?.locations?.[0]?.slug
                                                                }&hospital=${d?.hospitals?.[0]?.slug}&speciality=${d?.specialities?.[0]?.slug}`}
                                                            className="btn"
                                                        >
                                                            {staticText["Appointment"]}
                                                        </a>
                                                    )}




                                                    <a href={baseURL + "/doctor/" + d.slug} className="btn vice-btn">{staticText['View Profile']}</a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="main-btn text-lg-center text-start ms-lg-0 ms-2 mt-2">
                                                <a href={`${baseURL}/doctor/${d.slug}`}>{staticText['View Profile']}</a>
                                            </div> */}

                                    </div>
                                </div>
                            ))}
                        </div>
                        {loading && <p className="text-center p-3">Loading...</p>}
                        <div ref={observerRef} style={{ height: "1px" }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorListing;
