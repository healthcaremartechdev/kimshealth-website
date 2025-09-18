"use client"
import formatDate from "@/app/lib/formatDate";
import getStaticText from "@/helper/getStaticText";
import { useEffect, useState } from "react";



const FromDoctor = ({ dataSet }) => {
    const [staticTexts, setStaticTexts] = useState({});

    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();


    }, []);

    if (!dataSet.data || dataSet.data.length < 1 || dataSet.sectionTitle==null) {
        return;
    }

    return (
        <>
            <section className="section hear-from-doc-section">
                <div className="container">
                    <div className="row justify-content-between" data-aos="fade-up">
                        <div className="col-md-4 col-8">
                            <div className="main-heading">
                                <h2>{staticTexts['Expert Talks']} </h2>
                            </div>
                        </div>
                        <div className="col-md-2 col-4">
                            <div className="over-all-btn text-end">
                                <a href={dataSet.buttonURL}>{staticTexts[dataSet?.buttonText]} <span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                    alt="" /></span></a>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        {dataSet.data[0] && <div className="col-xl-8 col-lg-8 col-md-8 col-12 hear-doctor-img mb-lg-0 mb-3">
                            <a href={dataSet.baseUrl + "/doctor-talk/" + dataSet.data[0]?.slug}>
                                <div className="position-relative overflow-hidden hear-doc-overlay" data-aos="fade-up">
                                    <img src={dataSet.data[0]?.thumbnailImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + dataSet.data[0]?.thumbnailImage?.url : "/img/no-image.jpg"} className="img-fluid d-lg-block d-none doc-image-hover w-100" alt={dataSet.data[0]?.title} />
                                    <img src={dataSet.data[0]?.thumbnailImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + dataSet.data[0]?.thumbnailImage?.url : "/img/no-image.jpg"} className="img-fluid w-100 d-lg-none d-block doc-image-hover" alt={dataSet.data[0]?.title} />
                                    <div className="play-icon"> <img src="/img/play-icon-small.png" alt="" /> </div>
                                    <div className="hear-doctor-content hear-doc-left-btn">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <p>{dataSet.data[0]?.title}</p>
                                            </div>
                                            <div className="main-btn d-lg-block d-none">
                                                <span>
                                                    <img src="/img/play-button.png" className="img-fluid" alt="" />
                                                </span>
                                                <a href={dataSet.baseUrl + "/doctor-talk/" + dataSet.data[0]?.slug}>
                                                    {staticTexts['Watch Video']}
                                                    <span><i className="fa-solid fa-arrow-right"></i></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>}


                        <div className="col-xl-4 col-lg-4 col-md-4 col-12 blog-right-col">
                            <div className="row g-2">
                                {dataSet.data[1] && <div className="col-md-12 col-6 mb-lg-3">
                                    <a href="">
                                        <div className="position-relative overflow-hidden hear-doc-overlay" data-aos="fade-up">
                                            <img src={dataSet.data[1]?.thumbnailImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + dataSet.data[1]?.thumbnailImage?.url : "/img/no-image.jpg"}
                                                className="img-fluid w-100 hear-doc-image d-lg-block d-none" alt="" />
                                            <img src={dataSet.data[1]?.thumbnailImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + dataSet.data[1]?.thumbnailImage?.url : "/img/no-image.jpg"} className="img-fluid w-100 d-lg-none d-block mobile-hear-doc-bottom-image" alt="" />
                                            <div className="play-icon d-md-none d-block"> <img src="/img/play-icon-small.png" alt="" /> </div>


                                            <div className="hear-doctor-content">
                                                <div className="d-block align-items-center justify-content-between">
                                                    <div>
                                                        <h5 className="d-lg-block d-none">{formatDate(dataSet.data[1]?.date)}</h5>
                                                        <p>{dataSet.data[1]?.title}</p>
                                                    </div>
                                                    <div className="main-btn d-lg-block d-none">
                                                        <span><img src="/img/play-button.png" className="img-fluid" alt="" /> </span>
                                                        <a href={dataSet.baseUrl + "/doctor-talk/" + dataSet.data[1]?.slug}>{staticTexts['Watch Video']} <span><i
                                                            className="fa-solid fa-arrow-right"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>}


                                {dataSet.data[2] && <div className="col-md-12 col-6">
                                    <a href={dataSet.baseUrl + "/doctor-talk/" + dataSet.data[2]?.slug}>
                                        <div className="position-relative overflow-hidden hear-doc-overlay" data-aos="fade-up">
                                            <img src={dataSet.data[2]?.thumbnailImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + dataSet.data[2]?.thumbnailImage?.url : "/img/no-image.jpg"}
                                                className="img-fluid w-100 hear-doc-image d-lg-block d-none" alt="" />
                                            <img src={dataSet.data[2]?.thumbnailImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + dataSet.data[2]?.thumbnailImage?.url : "/img/no-image.jpg"} className="mobile-hear-doc-bottom-image img-fluid w-100 d-lg-none d-block" alt="" />
                                            <div className="play-icon d-md-none d-block"> <img src="/img/play-icon-small.png" alt="" /> </div>
                                            <div className="hear-doctor-content">
                                                <div className="d-block align-items-center justify-content-between">
                                                    <div>
                                                        <h5 className="d-lg-block d-none">{formatDate(dataSet.data[2]?.date)}</h5>
                                                        <p>{dataSet.data[2].title}</p>
                                                    </div>
                                                    <div className="main-btn d-lg-block d-none">
                                                        <span><img src="/img/play-button.png" className="img-fluid" alt="" /> </span>
                                                        <a href={dataSet.baseUrl + "/doctor-talk/" + dataSet.data[2]?.slug}>
                                                            {staticTexts['Watch Video']} <span><i
                                                                className="fa-solid fa-arrow-right"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )



}

export default FromDoctor;
