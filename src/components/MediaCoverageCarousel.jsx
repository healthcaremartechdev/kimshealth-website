`use client`

import formatDate from '@/app/lib/formatDate';
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState } from 'react'

function MediaCoverageCarousel({ dataSet, extraClass }) {
    const [staticTexts, setStaticTexts] = useState({});

    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();
    }, []);
    return (
        <>
            <section className={`section d-lg-block d-none pb-1  ${extraClass}`}>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6 col-8">
                            <div className="main-heading">
                                <h2>{dataSet?.sectionTitle}</h2>
                            </div>
                        </div>
                        <div className="col-md-2 col-4">
                            <div className="over-all-btn text-end">
                                <a href={dataSet.buttonURL}>
                                    {staticTexts[dataSet.buttonText]}
                                    <span>
                                        <img src="/img/slider-right-arrow.svg" className="img-fluid" alt="" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="owl-carousel owl-theme blog">

                        {
                            dataSet.data?.map((rm, i) => {
                                return <div className="media-card" key={i}>
                                    <div className="media-img">
                                        <a href={dataSet.baseUrl + "/media-coverage/" + rm.slug}>
                                            <img
                                                src={rm.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + rm.featuredImage?.url : '/img/no-image.jpg'}
                                                className="img-fluid w-100"
                                                alt={rm.title}
                                            />
                                        </a>
                                    </div>
                                    <div className="media-content">
                                        <p>{rm.shortDetails}</p>
                                        <div>
                                            <div className="d-flex align-items-center justify-content-between mt-3">
                                                <div className="media-name">
                                                    <div>
                                                        <img src="/img/kims-small-logo.png" className="img-fluid h-auto" alt="" />
                                                    </div>
                                                    <p><a href={dataSet.baseUrl + "/media-coverage/" + rm.slug}><strong>{rm.title}</strong></a> 
                                                    {/* <br /> {formatDate(rm?.date)} */}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            })
                        }
                    </div>

                </div>
            </section>

            {/* Mobiel view */}
            <section className="section d-lg-none d-block">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-4 col-8">
                            <div className="main-heading">
                                <h2>{dataSet?.sectionTitle}</h2>
                            </div>
                        </div>
                        <div className="col-md-2 col-4">
                            <div className="over-all-btn text-end">
                                <a href={dataSet.buttonURL}>
                                    {staticTexts[dataSet.buttonText]}
                                    <span>
                                        <img src="/img/slider-right-arrow.svg" className="img-fluid" alt="" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="row g-2">

                        {
                            dataSet.data?.map((e, i) => (
                                <div className="col-xl-3 col-lg-3 col-md-3 col-6 mb-2" key={i}>
                                    <div className="media-card">
                                        <div className="media-img">
                                            <a href={dataSet.baseUrl + "/media-coverage/" + e.slug}>
                                                <img
                                                    src={e.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + e.featuredImage?.url : '/img/no-image.jpg'}
                                                    className="img-fluid w-100"
                                                    alt=""
                                                />
                                            </a>
                                        </div>
                                        <div className="media-content">
                                            <p>{e.shortDetails}</p>
                                            <div className="d-block align-items-center justify-content-between mt-3">
                                                <div className="media-name">
                                                    <div>
                                                        <img src="/img/kims-small-logo.png" className="img-fluid h-auto" alt="" />
                                                    </div>
                                                    <p>
                                                        <a href={dataSet.baseUrl + "/media-coverage/" + e.slug}><strong>{e.title}
                                                        </strong></a>
                                                    </p>
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
        </>
    )
}

export default MediaCoverageCarousel