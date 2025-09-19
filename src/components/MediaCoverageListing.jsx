"use client"
import formatDate from '@/app/lib/formatDate';
import hospitalData from '@/app/lib/getHospital';
import mediaCoverData from '@/app/lib/getMediaCoverage';
import getSpecialityData from '@/app/lib/getSpeciality';
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useRef, useState } from 'react'

const MediaCoverageListing = ({ basePath, langLoc, URLParams }) => {
    const [allEvents, setallEvents] = useState([]);
    const [count, setCount] = useState(0);
    const [staticText, setStaticTexts] = useState({});
    const limit = 8;
    const observerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [endData, setEndData] = useState(false);
    const [allMediaEvents, setAllMedaiEvents] = useState([]);
    const [noData, setNoData] = useState(false);


    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        // const getFstLoad = async () => {
        //     setAllMedaiEvents(await mediaCoverData.getAll({ all: true }))
        //     setCount(limit); // ✅ Set count so next fetch starts correctly
        // };

        // getFstLoad();
        fetchTexts();
    }, []);

    const loadDoctor = async () => {
        if (loading) return;
        setLoading(true);

        const newCount = count;
        const data = await mediaCoverData.getAll({ start: newCount, limit: limit, langLoc: langLoc });

        if (data.length < 1) {
            setEndData(true);
        } else {
            setallEvents(prev => [...prev, ...data]);
            setCount(prev => prev + limit); // 
        }

        setLoading(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !endData && !loading) {
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
    }, [count, endData, loading]); 


    return (
        <>

            {/* Desktop View */}
            <section className="section d-lg-block d-none pt-0">
                <div className="container">
                    <div className="row">
                        {
                            allEvents?.map((av, i) => (
                                <div className="col-xl-3 col-lg-3 col-md-3 col-12 mb-4" key={i}>
                                    <div className="media-card">
                                        <div className="media-img">
                                            <a href={basePath + "/media-coverage/" + av.slug}>
                                                <img
                                                    src={av.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + av.featuredImage?.url : '/img/no-image.jpg'}
                                                    className="img-fluid w-100"
                                                    alt={av.title}
                                                />
                                            </a>
                                        </div>
                                        <div className="media-content">
                                            <p>{av.shortDetails}</p>
                                            <div className="d-flex align-items-center justify-content-between mt-3">
                                                <div className="media-name">
                                                    <div>
                                                        <img src="/img/kims-small-logo.png" className="img-fluid" alt="" />
                                                    </div>
                                                    <p><a href={basePath + "/media-coverage/" + av.slug}><strong>{av.title.slice(0, 20) + "..."}</strong></a>
                                                     {/* <br /> {formatDate(av?.date)} */}
                                                     </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>


            {/* Mobile View */}
            <section className="section d-lg-none d-block pt-0">
                <div className="container">
                    <div className="row g-2">
                        {
                            allEvents?.map((e, i) => (
                                <div className="col-xl-3 col-lg-3 col-md-3 col-6 mb-2" key={i}>
                                    <div className="media-card">
                                        <div className="media-img">
                                            <a href={basePath + "/media-coverage/" + e.slug}>
                                                <img
                                                    src={e.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + e.featuredImage?.url : '/img/no-image.jpg'}
                                                    className="img-fluid w-100"
                                                    alt={e.title}
                                                />
                                            </a>
                                        </div>
                                        <div className="media-content">
                                            <p>{e.shortDetails}</p>
                                            <div className="d-block align-items-center justify-content-between mt-3">
                                                <div className="media-name">
                                                    <div>
                                                        <img src="/img/kims-small-logo.png" className="img-fluid" alt="" />
                                                    </div>
                                                    <p><a href={basePath + "/media-coverage/" + e.slug}><strong>{e.title.slice(0, 20) + "..."}</strong></a></p>

                                                </div>
                                                {/* <p className="mt-2 ms-4 ps-3">{formatDate(e?.date)}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {loading && <p className='text-center p-3'>Loading...</p>}
            <div ref={observerRef} style={{ height: "1px" }}></div>
        </>
    );
};

export default MediaCoverageListing;
