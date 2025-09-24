"use client"
import doctorTalkData from '@/app/lib/getDoctorTalk';
import getStaticText from '@/helper/getStaticText';
import formatDate from '@/app/lib/formatDate';
import React, { useEffect, useRef, useState } from 'react';
import getSpecialityData from '@/app/lib/getSpeciality';


// infinite scroll;
const DoctorTalkListing = ({ baseURL, langLoc, URLParams, speciality }) => {
    const [staticText, setStaticTexts] = useState({});
    const [data, setData] = useState([]);
    const limit = 12;
    const observerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [endData, setEndData] = useState(false);
    const [allSpeciality, setAllSpeciality] = useState([]);


    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };
        const getFstLoad = async () => {
            // const data = await doctorTalkData.allData(0, count)
            // setData(data);

            const tempStoreSpeciality = await getSpecialityData.getSpecialityAllParent({ langLoc });
            setAllSpeciality(tempStoreSpeciality);
        }

        getFstLoad();
        fetchTexts();
    }, []);

    const loadDoctor = async () => {
        if (loading) return; // prevent multiple triggers
        setLoading(true);

        const data = await doctorTalkData.allData({ start: count, limit, langLoc: langLoc, URLParams: URLParams });
        if (data.length < 1) {
            setEndData(true)
        }
        setData(prev => [...prev, ...data]);
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


    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6 mb-3">
                            <div className="main-heading">
                                <h2 className="mb-0">{staticText["Hear From The Doctor"]}</h2>
                            </div>
                        </div>
                        <div className="col-md-4 details-key-row">
                            {/* <form action="">
                                <div className="input-group p-0 position-relative justify-content-center">
                                    <select className="form-select diseases-page-search">
                                        <option value={''}>Search for Speciality </option>
                                        {
                                            allSpeciality?.map((spl, i) => {
                                                return <option value={spl.speciality?.slug} key={i}>
                                                    {spl.title}
                                                </option>
                                            })
                                        }
                                    </select>
                                    <button className="input-group-text border-0 search-btn-page"><i className="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </form> */}
                            <select className="form-control form-select" onChange={(e) => {
                                location.href = baseURL + "/doctor-talk?speciality=" + e.target.value;
                            }} value={URLParams.speciality ? URLParams.speciality : ''}>

                                <option value={''}>{staticText['Search for Speciality']}</option>
                                {
                                    allSpeciality?.map((spl, i) => {
                                        return <option value={spl.speciality?.slug} key={i}>
                                            {spl.title}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section section">
                <div className="container">
                    <div className="row">
                        {
                            data?.map((dt, index) => {
                                return <div className="col-md-4 blog-right-col overflow-hidden mb-3" key={index}>
                                    <a href={baseURL + "/doctor-talk/" + dt.slug}>
                                        <div className="position-relative overflow-hidden hear-doc-overlay" data-aos={index % 2 == 0 ? "fade-right" : "fade-left"}>
                                            <img src={dt?.thumbnailImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + dt?.thumbnailImage?.url : "/img/no-image.jpg"} className="img-fluid w-100 hear-doc-image" alt="" />
                                            <div className="hear-doctor-content">
                                                <div className="d-block align-items-center justify-content-between">
                                                    <div>
                                                        <h5 className="">{formatDate(dt.date)}</h5>
                                                        <p>{dt.title}</p>
                                                    </div>
                                                    <div className="main-btn ">
                                                        <span><img src="/img/play-button.png" className="img-fluid" alt="" /> </span>
                                                        <a href={baseURL + "/doctor-talk/" + dt.slug}>{staticText['Watch Video']} <span>
                                                            <i className="fa-solid fa-arrow-right"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            })
                        }
                        {loading && <p className='text-center p-3'>Loading...</p>}
                        <div ref={observerRef} style={{ height: "1px" }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorTalkListing;