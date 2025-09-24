"use client"
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useRef, useState } from 'react';
import testimonialData from '@/app/lib/getTestimonial';
import getSpecialityData from '@/app/lib/getSpeciality';


const TestimonialListing = ({ basePath, langLoc, URLParams }) => {
    const [allTestimonial, setallTestimonial] = useState([]) //Doctors
    const [count, setCount] = useState(0)
    const [staticText, setStaticTexts] = useState({});
    const limit = 12;
    const observerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [endData, setEndData] = useState(false);
    const [allSpeciality, setAllSpeciality] = useState([]);


    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };
        const getFstLoad = async () => {
            // const data = await testimonialData.getAll(count, limit);
            // setallTestimonial(data);
            const tempStoreSpeciality = await getSpecialityData.getSpecialityAllParent({ langLoc });
            setAllSpeciality(tempStoreSpeciality);
        }

        getFstLoad();
        fetchTexts();
    }, []);


    const loadMore = async () => {
        if (loading) return; // prevent multiple triggers
        setLoading(true);

        const data = await testimonialData.getAll({ start: count, limit: limit, langLoc: langLoc, URLParams:URLParams });
        if (data.length < 1) {
            setEndData(true)
        }
        setallTestimonial(prev => [...prev, ...data]);
        setCount(prev => prev + limit);

        setLoading(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !endData) {
                    loadMore();
                }
            },
            { threshold: 1 }
        );

        const currentRef = observerRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [count, endData, loading]);


    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6 mb-3">
                            <div className="main-heading">
                                <h2 className="mb-0">{staticText['Patient Testimonials']}</h2>
                            </div>
                        </div>
                        <div className="col-md-4 details-key-row">
                            <select className="form-control form-select" onChange={(e) => {
                                location.href = basePath + "/testimonial?speciality=" + e.target.value;
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

            <div className="section section pt-0">
                <div className="container">
                    <div className="row">
                        {
                            allTestimonial?.map((t, index) => {
                                return <div className="col-xl-6 col-lg-6 col-md-6 col-12"
                                    data-aos={index % 2 == 0 ? "fade-right" : "fade-left"} key={index}>
                                    <div className="row testi-card">
                                        <div className="col-md-3">
                                            <div className="overflow-hidden position-relative">
                                                <a href={basePath + "/testimonial/" + t.slug}>
                                                    <img src={t.thumbnailImage?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${t.thumbnailImage?.url}` : "/img/no-image.jpg"} alt={t.title} className="img-fluid w-100" />
                                                    <div className="play-icon"> <img src="/img/play-icon-small.png" alt="" /> </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-9 my-auto">
                                            <div className="testi-rightbox">
                                                <h3>{t.title}</h3>
                                                <p>{`${t.shortDetails?.slice(0, 80)}...`}
                                                    <a href={basePath + "/testimonial/" + t.slug}>{staticText['Watch Video']}</a>
                                                </p>

                                                <div className="d-flex align-items-center justify-content-between mt-3">
                                                    <div className="doctor-name">
                                                        {t.doctor?.name && <p><span><img src="/img/doctor.png" className="img-fluid" alt="" /></span>{`${t.doctor?.salutation?t.doctor?.salutation+" ":""}${t.doctor?.name}`} </p>}
                                                    </div>
                                                    <div className="doctor-catagory">
                                                        <p>{t.specialities[0]?.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    {loading && <p className='text-center p-3'>Loading...</p>}
                    <div ref={observerRef} style={{ height: "1px" }}></div>
                </div>
            </div>
        </>
    )
}

export default TestimonialListing