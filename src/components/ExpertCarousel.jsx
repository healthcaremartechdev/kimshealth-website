"use client"

import getStaticText from "@/helper/getStaticText";
import { use, useEffect, useState } from "react";

const ExpertCarousel = ({ dataSet }) => {
    const [staticTexts, setStaticTexts] = useState({});

    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();
    }, []);


    if (dataSet.data.length < 1 || dataSet.sectionTitle==null) {
        return;
    }
    return (
        <>
            <section className="section expert-section ">
                <div className="container">
                    <div className="row justify-content-between" data-aos="fade-right">
                        <div className="col-md-3 col-8">
                            <div className="main-heading">
                                <h2>{dataSet.sectionTitle}</h2>
                            </div>
                        </div>
                        <div className="col-md-2  col-4">
                            <div className="over-all-btn text-end">
                                <a href={dataSet.buttonURL}>{staticTexts[dataSet.buttonText]}
                                    <span>
                                        <img src="/img/slider-right-arrow.svg" className="img-fluid" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="owl-carousel owl-theme expert">
                        {
                            dataSet?.data?.map((d, index) => {
                                return <div className={`expert-card `} data-aos="fade-right" key={index}>
                                    <div className={`card border-0 p-lg-4 p-0 ${index === 0 ? 'active' : ""}`}>
                                        <div className="card-top video-iconfor-doc">
                                            <a href={dataSet.baseUrl + "/doctor/" + d.slug}>
                                                <img
                                                    src={d.doctorImage?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${d.doctorImage?.url}` : "/img/no-image.jpg"}
                                                    className="img-fluid w-100" alt={`${d.salutation ? d.salutation + " " : ""}${d.name}`}
                                                />
                                            </a>
                                            {d.teleConsultationAvailable && <a href='https://consult.bestdocapp.com/home/KIMSTVM?version=new' target='_blank'>
                                                <span className="video-iconfor-listing"><i class="fa-solid fa-video"></i></span>
                                            </a>}
                                        </div>
                                        <div className="card-content">
                                            <h4>{`${d.salutation ? d.salutation + " " : ""}${d.name}`}</h4>
                                            <p>{d.doctorDesignation}</p>
                                            <h5>{d.specialities[0]?.title}</h5>
                                            <div className="from-btn">


                                                {d.appointmentAvailable && (
                                                    <a
                                                        href={`${dataSet.baseUrl}/book-an-appointment/?doctor=${d?.salutation ? d?.salutation + " " : ""
                                                            }${d?.name}&location=${d?.locations?.[0]?.slug === "generic"
                                                                ? d?.locations?.[1]?.slug
                                                                : d?.locations?.[0]?.slug
                                                            }&hospital=${d?.hospitals?.[0]?.slug}&speciality=${d?.specialities?.[0]?.slug}`}
                                                        className="btn"
                                                    >
                                                        {staticTexts["Appointment"]}
                                                    </a>
                                                )}


                                                <a href={dataSet.baseUrl + "/doctor/" + d.slug} className="btn vice-btn">{staticTexts['View Profile']}</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="main-btn  text-lg-center text-start ms-lg-0 ms-2 mt-2">
                                        <a href={dataSet.baseUrl + "/doctor/" + d.slug}>{staticTexts['View Profile']}</a>
                                    </div> */}
                                </div>
                            })
                        }

                    </div>
                </div>
            </section>
        </>
    )
}

export default ExpertCarousel