"use client"

import getStaticText from "@/helper/getStaticText";
import { useEffect, useState } from "react";

const TestimonialSection = ({ dataSet }) => {
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

            <section className="section d-lg-block d-none testimonial-section overflow-hidden">
                <div className="container">
                    <div className="row justify-content-between" data-aos="fade-right">
                        <div className="col-md-4 col-8">
                            <div className="main-heading">
                                <h2>{dataSet.sectionTitle}</h2>
                            </div>
                        </div>
                        <div className="col-md-2 col-4">
                            <div className="over-all-btn text-end">
                                <a href={dataSet.buttonURL}>{staticTexts[dataSet.buttonText]}
                                    <span>
                                        <img src="/img/slider-right-arrow.svg" className="img-fluid"
                                            alt="" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        {
                            dataSet.data?.slice(0, 4).map((t, index) => {
                                return <div className="col-xl-6 col-lg-6 col-md-6 col-12"
                                    data-aos={index === 0 || index === 2 ? "fade-right" : "fade-left"} key={index}>
                                    <div className={`row testi-card ${index === 0 ? 'active' : ""}`}>
                                        <div className="col-md-3">
                                            <div className="overflow-hidden position-relative">
                                                <a href={dataSet.baseUrl + "/testimonial/" + t.slug}>
                                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${t.thumbnailImage?.url}`} alt="" className="img-fluid w-100" />
                                                    <div className="play-icon"> <img src="/img/play-icon-small.png" alt="" /> </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-9 my-auto">
                                            <div className="testi-rightbox">
                                                <h3>{t.title}</h3>
                                                <p>{`${t.shortDetails.slice(0, 80)}...`}
                                                    <a href={dataSet.baseUrl + "/testimonial/" + t.slug}>{staticTexts['Watch Video']}</a></p>


                                                <div className="d-flex align-items-center justify-content-between mt-3">
                                                    <div className="doctor-name">
                                                        {t.doctor?.name && <p><span><img src="/img/doctor.png" className="img-fluid" alt="" /></span> {`${t.doctor?.salutation?t.doctor?.salutation+" ":""}${t.doctor?.name}`} </p>}
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
                </div>
            </section>


            <section className="section d-lg-none d-block testimonial-section" data-aos="fade-up">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-8">
                            <div className="main-heading">
                                <h2>{dataSet.sectionTitle}</h2>
                            </div>
                        </div>
                        <div className="col-md-2 col-4">
                            <div className="over-all-btn text-end">
                                <a href={dataSet.buttonURL}>{dataSet.buttonText} <span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                    alt="" /></span></a>
                            </div>
                        </div>
                    </div>


                    <div className="owl-carousel owl-theme testimonial">
                        {
                            dataSet?.data?.map((t, index) => {
                                return <div className="card border-0" key={index}>
                                    <div className="card-top">
                                        <a href="#">
                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${t.thumbnailImage?.url}`} alt="" className="img-fluid w-100" />
                                        </a>
                                        <div className="play-icon"> <img src="/img/play-icon-small.png" alt="" /> </div>
                                    </div>
                                    <div className="testi-rightbox card-content">
                                        <h3>{t.title}</h3>
                                        <p>{`${t.shortDetails?.slice(0, 80)}...`}</p>


                                        <div className="d-block mt-lg-3 mt-2">
                                            <div className="doctor-name mb-1">
                                                {t.doctor?.name && <p>{`${t.doctor?.salutation?t.doctor?.salutation+" ":""}${t.doctor?.name}`}</p>}
                                            </div>
                                            <div className="doctor-catagory">
                                                <p>{t.specialities[0]?.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </div>
            </section>

        </>
    )
}

export default TestimonialSection;
