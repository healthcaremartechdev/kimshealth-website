"use client"
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState } from 'react'
import Popup from './Popup';

const ExcellenceCarousel = ({ dataSet }) => {
    const [staticTexts, setStaticTexts] = useState({});


    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();
    }, []);


    if (dataSet.data.length < 1) {
        return;
    }

    return (
        <>
            <section className="section exellence-section" data-aos="fade-up">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-4 col-8">
                            <div className="main-heading">
                                <h2>{dataSet.sectionTitle}</h2>
                            </div>
                        </div>
                        {dataSet.buttonText && <div className="col-md-2 col-4">
                            <div className="over-all-btn text-end">
                                <a href={dataSet.buttonURL}>{staticTexts[dataSet.buttonText]} <span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                    alt="" /></span></a>
                            </div>
                        </div>}
                    </div>

                    <div className="owl-carousel owl-theme exellence">
                        {
                            dataSet.data.map((e, index) => {
                                return <div className="item" key={index}>
                                    <div className="card border-0">
                                        <a
                                            {...(e?.manageAppearance?.viewingMode === "Popup"
                                                ? {
                                                    href: "#",
                                                    "data-bs-toggle": "modal",
                                                    "data-bs-target": `#popupModalSubSpeciality-slide-${e?.speciality?.slug}`,
                                                }
                                                : {
                                                    href:
                                                        dataSet.baseUrl +
                                                        "/speciality/" +
                                                        e.speciality?.slug +
                                                        (dataSet.hospital_slug ? `?hospital=${dataSet.hospital_slug}` : ""),
                                                })}
                                        >
                                            <div className="card-top">
                                                <img src={e.speciality?.featuredImage?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${e.speciality?.featuredImage?.url}` : '/img/no-image.jpg'}
                                                    className="img-fluid w-100" alt={e.title} />
                                            </div>
                                            <div className="card-content">
                                                <h4>{e.title}</h4>
                                                <p>{e.overviewSection.details.slice(0, 150)}</p>
                                                <div className="main-btn">
                                                    <span className='read-more'>
                                                        Read More <span><i className="fa-solid fa-arrow-right"></i></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </div>
            </section>

            {dataSet.data?.map((subS, index) => (
                subS?.manageAppearance?.viewingMode === "Popup" ? (
                    <Popup
                        key={index}
                        modalId={`popupModalSubSpeciality-slide-${subS.speciality?.slug}`}
                        title={subS.title}
                        content={subS.overviewSection?.details}
                    />
                ) : null
            ))}

        </>
    )
}

export default ExcellenceCarousel;
