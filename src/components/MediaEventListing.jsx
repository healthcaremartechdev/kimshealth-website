"use client"
import formatDate from '@/app/lib/formatDate';
import hospitalData from '@/app/lib/getHospital';
import mediaData from '@/app/lib/getMediaEvent';
import getSpecialityData from '@/app/lib/getSpeciality';
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useRef, useState } from 'react'

const MediaEventListing = ({ basePath, langLoc, URLParams }) => {
    const [allEvents, setallEvents] = useState([]);
    const [count, setCount] = useState(0);
    const [staticText, setStaticTexts] = useState({});
    const limit = 8;
    const observerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [endData, setEndData] = useState(false);
    const [allSpeciality, setAllSpeciality] = useState([]);
    const [allMediaEvents, setAllMedaiEvents] = useState([]);
    const [allHospital, setAllHospital] = useState([]);
    const [filterSplty, setFilterSplty] = useState([]);
    const [noData, setNoData] = useState(false);


    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        const getFstLoad = async () => {
            // setallEvents(await mediaData.getAll({ start: 0, limit: count }));
            setAllSpeciality(await getSpecialityData.getAllSpeciality(langLoc));
            setAllMedaiEvents(await mediaData.getAll({ all: true }))
            setAllHospital(await hospitalData.getAll(false, true))
            setCount(limit); // ✅ Set count so next fetch starts correctly
        };

        getFstLoad();
        fetchTexts();
    }, []);

    const loadDoctor = async () => {
        if (loading) return;
        setLoading(true);

        const newCount = count;
        const data = await mediaData.getAll({ start: newCount, limit: limit, langLoc: langLoc });

        if (data.length < 1) {
            setEndData(true);
        } else {
            setallEvents(prev => [...prev, ...data]);
            setCount(prev => prev + limit); // ✅ Count updated only after new data fetched
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
    }, [count, endData, loading]); // ✅ Added all dependencies.


    const onMediaSearch = async (e) => {
        const searchText = e.target.value.trim().toLowerCase();

        if (!searchText) {
            setallEvents(await mediaData.getAll({ start: 0, limit: 6 }));
            return;
        }

        const filterData = allEvents.filter(event => {
            return event.title?.toLowerCase().includes(searchText);
        });

        if (filterData.length > 0) {
            setallEvents(filterData);
            setNoData(false);
        } else {
            setallEvents([]);
        }
    };

    const onHospitalChange = async (e) => {
        const hospitalId = e.target.value;;

        if (!hospitalId) {
            // Show all loaded events (or reload from API if needed)
            const all = await mediaData.getAll({ start: 0, limit: 6 });
            setallEvents(all);
            setNoData(false);
            return;
        }

        const all = await mediaData.getAll({ start: 0, limit: 6 }); // Or fetch fresh data if needed
        const filtered = all.filter(event => event.hospital[0]?.id === hospitalId);
        if (filtered.length > 0) {
            setallEvents(filtered);
            setNoData(false);
        } else {
            setallEvents([]);
            setNoData(true);
        }
    };


    return (
        <>
            {/* <section className="section">
                <div className="container">
                    <div className="row justify-content-between">

                        <div className="col-md-4  mb-3">
                            <input type="text" name="" id="" className='form-control' onChange={onMediaSearch} />
                        </div>

                        <div className="col-md-4 mb-3">
                            <select className="form-select" onChange={onHospitalChange}>
                                <option value={''}>Select by Hospital </option>
                                {
                                    allHospital.map((h, i) => {
                                        return <option value={h.id} key={i}>
                                            {h.title}
                                        </option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <select className="form-select ">
                                <option value={''}>Select by Speciality </option>
                                {
                                    allSpeciality.map((h, i) => {
                                        return <option value={h.speciality?.id} key={i}>
                                            {h.title}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Desktop View */}
            <section className="section d-lg-block d-none pt-0">
                <div className="container">
                    <div className="row">
                        {
                            allEvents?.map((av, i) => (
                                <div className="col-xl-3 col-lg-3 col-md-3 col-12 mb-4" key={i}>
                                    <div className="media-card" data-aos="fade-right" data-aos-duration="1800" data-aos-delay="100">
                                        <div className="media-img">
                                            <img
                                                src={av.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + av.featuredImage?.url : '/img/no-image.jpg'}
                                                className="img-fluid w-100"
                                                alt={av.title}
                                            />
                                        </div>
                                        <div className="media-content">
                                            <p>{av.shortDetails}</p>
                                            <div className="d-flex align-items-center justify-content-between mt-3">
                                                <div className="media-name">
                                                    <div>
                                                        <img src="/img/kims-small-logo.png" className="img-fluid" alt="" />
                                                    </div>
                                                    <p>{formatDate(av?.date)}</p>
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
            <section className="section d-lg-none d-block pt-0" data-aos="fade-up">
                <div className="container">
                    <div className="row g-2">
                        {
                            allEvents?.map((e, i) => (
                                <div className="col-xl-3 col-lg-3 col-md-3 col-6 mb-2" key={i}>
                                    <div className="media-card">
                                        <div className="media-img">
                                            <img
                                                src={e.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + e.featuredImage?.url : '/img/no-image.jpg'}
                                                className="img-fluid w-100"
                                                alt={e.title}
                                            />
                                        </div>
                                        <div className="media-content">
                                            <p>{e.shortDetails}</p>
                                            <div className="d-block align-items-center justify-content-between mt-3">
                                                <div className="media-name">
                                                    <div>
                                                        <img src="/img/kims-small-logo.png" className="img-fluid" alt="" />
                                                    </div>

                                                </div>
                                                <p className="mt-2 ms-4 ps-3">{formatDate(e?.date)}</p>
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

export default MediaEventListing;
