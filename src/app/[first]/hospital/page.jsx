import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import hospitalData from '@/app/lib/getHospital';
import getStaticText from '@/app/lib/getStaticTextServer';
import HospitalFilter from '@/components/HospitalFilter';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import Breadcrumb from '@/components/Breadcrumb';


const Hospital = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText();
    const baseURL = await getBaseUrl(true, true);
    const baseURLOnlyLang = await getBaseUrl(true, false);
    const data = await getStaticPageContent("hospital");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const hospitals = await hospitalData.getAllByType({ type: "Hospital", langLoc: getLangLoc });
    const medicalCenter = await hospitalData.getAllByType({ type: "Medical Center", langLoc: getLangLoc })



    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="hospital-details-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent[0]?.title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={pageContent[0]?.title}
                                        middleTitle={''}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {
                        hospitals && <section className="section pt-lg-4 pt-0">
                            <div className="container">
                                <HospitalFilter title={pageContent[1]?.title} selectedLocation={getLangLoc.loc} />
                                <div className="row">
                                    {
                                        hospitals?.map((h, index) => {
                                            return index <= 1 ?
                                                <div className="col-md-6 mb-4" key={index}>
                                                    <div className="custom-hospital-top-card">
                                                        <div className="hospital-img">
                                                            <a href={baseURLOnlyLang + "/" + h.location?.slug + "/hospital/" + h.slug}>
                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + h.featuredImage?.url} alt="" className="img-fluid w-100" />
                                                            </a>
                                                        </div>
                                                        <div className="hospital-content">
                                                            <ul>
                                                                <li className="hospital-icon-custom">{h.title}</li>
                                                                <li className="location-icon-custom">{h.address}</li>
                                                                <li className="telephone-icon-custom">{h.contactNo}</li>
                                                            </ul>
                                                            <div className="d-lg-flex d-block align-items-center justify-content-between py-2 " style={{ borderBottom: "1px solid #fff" }}>
                                                                <div className="hospital-content mb-lg-0 mb-3 p-0">
                                                                    <ul>
                                                                        <li className="mb-0 send-custom-icon">
                                                                            <a href={h.mapURL} target='_blank'>{staticText['Get Direction']}</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <img src="/img/google.png" alt="Google Logo" className="me-2" />
                                                                    <div className="star-rating" data-rating={h.rating}>
                                                                        {
                                                                            Array.from({ length: 5 }, (_, index) => {
                                                                                const starValue = index + 1;

                                                                                if (starValue <= Math.floor(h.rating)) {
                                                                                    // full star
                                                                                    return <i key={index} className="fa fa-solid fa-star ms-1" style={{ color: "#ffc107" }}></i>;
                                                                                } else if (starValue === Math.floor(h.rating) + 1 && !Number.isInteger(h.rating)) {
                                                                                    // half star
                                                                                    return <i key={index} className="fa fa-solid fa-star-half-stroke ms-1" style={{ color: "#ffc107" }}></i>;
                                                                                } else {
                                                                                    // empty star
                                                                                    return <i key={index} className="fa fa-regular fa-star ms-1" style={{ color: "#ffc107" }}></i>;
                                                                                }
                                                                            })
                                                                        }
                                                                        <span className="ms-2">{h.rating}</span>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="d-lg-flex d-block align-items-center justify-content-between pt-3">
                                                                <a href={baseURLOnlyLang + "/" + h.location?.slug + "/hospital/" + h.slug} className="btn mb-lg-0 mb-2 hospital-primarybtn">{staticText['View Details']}</a>
                                                                <a href={baseURL + "/book-an-appointment?location=" + h.location?.slug} className="btn mb-lg-0 mb-3 hospital-secondarybtn">{staticText['Appointment']}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                : null
                                        })
                                    }


                                    {
                                        hospitals?.slice(2,).map((h, index) => {
                                            return <div className="col-md-4 mb-4" key={index}>
                                                <div className="custom-hospital-top-card">
                                                    <div className="hospital-img">
                                                        <a href={baseURL + "/" + h.location?.slug + "/hospital/" + h.slug}>
                                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + h.featuredImage?.url}
                                                                alt={h.title} className="img-fluid w-100" />
                                                        </a>
                                                    </div>
                                                    <div className="hospital-content">

                                                        <ul>
                                                            <li className="hospital-icon-custom">{h.title}</li>
                                                            <li className="location-icon-custom">{h.address}</li>
                                                            <li className="telephone-icon-custom">{h.contactNo}</li>
                                                        </ul>
                                                        <div className="d-lg-flex d-block align-items-center justify-content-between py-2 " style={{ borderBottom: "1px solid #fff" }}>
                                                            <div className="hospital-content mb-lg-0 mb-3 p-0">
                                                                <ul>
                                                                    <li className="mb-0 send-custom-icon">
                                                                        <a href={h.mapURL} target='_blank'>{staticText['Get Direction']}</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <img src="/img/google.png" alt="Google Logo" className="me-2" />
                                                                <div className="star-rating" data-rating={h.rating}>
                                                                    {
                                                                        Array.from({ length: 5 }, (_, index) => {
                                                                            const starValue = index + 1;

                                                                            if (starValue <= Math.floor(h.rating)) {
                                                                                // full star
                                                                                return <i key={index} className="fa fa-solid fa-star ms-1" style={{ color: "#ffc107" }}></i>;
                                                                            } else if (starValue === Math.floor(h.rating) + 1 && !Number.isInteger(h.rating)) {
                                                                                // half star
                                                                                return <i key={index} className="fa fa-solid fa-star-half-stroke ms-1" style={{ color: "#ffc107" }}></i>;
                                                                            } else {
                                                                                // empty star
                                                                                return <i key={index} className="fa fa-regular fa-star ms-1" style={{ color: "#ffc107" }}></i>;
                                                                            }
                                                                        })
                                                                    }
                                                                    <span className="ms-2">{h.rating}</span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="d-lg-flex d-block align-items-center justify-content-between pt-3">
                                                            <a href={baseURLOnlyLang + "/" + h.location?.slug + "/hospital/" + h.slug} className="btn mb-lg-0 mb-2 hospital-primarybtn">{staticText['View Details']}</a>
                                                            <a href={baseURL + "/book-an-appointment?location=" + h.location?.slug} className="btn mb-lg-0 mb-3 hospital-secondarybtn">{staticText['Appointment']}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        })
                                    }

                                </div>
                            </div>
                        </section>
                    }

                    {
                        medicalCenter.length > 0 && <>
                            <div className="line-divider"></div>
                            <section className="section">
                                <div className="container">
                                    <div className="row justify-content-between">
                                        <div className="col-md-8 col-8">
                                            <div className="main-heading">
                                                <h2>{pageContent[2]?.title}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {
                                            medicalCenter?.map((h, index) => {
                                                return <div className="col-md-4 mb-4" key={index}>
                                                    <div className="custom-hospital-top-card">
                                                        <div className="hospital-img">
                                                            <a href={baseURL + "/" + h.location?.slug + "/hospital/" + h.slug}>
                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + h.featuredImage.url} alt="" className="img-fluid w-100" />
                                                            </a>
                                                        </div>
                                                        <div className="hospital-content">

                                                            <ul>
                                                                <li className="hospital-icon-custom">{h.title}</li>
                                                                <li className="location-icon-custom">{h.address}</li>
                                                                <li className="telephone-icon-custom">{h.contactNo}</li>
                                                            </ul>
                                                            <div className="d-lg-flex d-block align-items-center justify-content-between py-2 " style={{ borderBottom: "1px solid #fff" }}>
                                                                <div className="hospital-content mb-lg-0 mb-3 p-0">
                                                                    <ul>
                                                                        <li className="mb-0 send-custom-icon">
                                                                            <a href={h.mapURL} target='_blank'>{staticText['Get Direction']}</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <img src="/img/google.png" alt="Google Logo" className="me-2" />
                                                                    <div className="star-rating" data-rating={h.rating}>
                                                                        {
                                                                            Array.from({ length: 5 }, (_, index) => {
                                                                                const starValue = index + 1;

                                                                                if (starValue <= Math.floor(h.rating)) {
                                                                                    // full star
                                                                                    return <i key={index} className="fa fa-solid fa-star ms-1" style={{ color: "#ffc107" }}></i>;
                                                                                } else if (starValue === Math.floor(h.rating) + 1 && !Number.isInteger(h.rating)) {
                                                                                    // half star
                                                                                    return <i key={index} className="fa fa-solid fa-star-half-stroke ms-1" style={{ color: "#ffc107" }}></i>;
                                                                                } else {
                                                                                    // empty star
                                                                                    return <i key={index} className="fa fa-regular fa-star ms-1" style={{ color: "#ffc107" }}></i>;
                                                                                }
                                                                            })
                                                                        }
                                                                        <span className="ms-2">{h.rating}</span>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="d-lg-flex d-block align-items-center justify-content-between pt-3">
                                                                <a href={baseURLOnlyLang + "/" + h.location?.slug + "/hospital/" + h.slug} className="btn mb-lg-0 mb-2 hospital-primarybtn">{staticText['View Details']}</a>
                                                                <a href={baseURL + "/book-an-appointment?location=" + h.location?.slug} className="btn mb-lg-0 mb-3 hospital-secondarybtn">{staticText['Appointment']}</a>
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
                    }

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Hospital;