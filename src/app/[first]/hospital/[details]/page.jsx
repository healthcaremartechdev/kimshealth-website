import { getBaseUrl } from '@/app/lib/getBaseUrl';
import blogData from '@/app/lib/getBlog';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import doctorData from '@/app/lib/getDoctor';
import doctorTalkData from '@/app/lib/getDoctorTalk';
import hospitalData from '@/app/lib/getHospital';
import getSpecialityData from '@/app/lib/getSpeciality';
import getStaticText from '@/app/lib/getStaticTextServer';
import testimonialData from '@/app/lib/getTestimonial';
import BlogCarousel from '@/components/BlogCarousel';
import Breadcrumb from '@/components/Breadcrumb';
import ExcellenceCarousel from '@/components/ExcellenceCarousel';
import ExpertCarousel from '@/components/ExpertCarousel';
import Footer from '@/components/Footer';
import BookAnAppoinmentShort from '@/components/Forms/BookAnAppoinmentShort';
import DocTalk from '@/components/DocTalk';
import Header from '@/components/Header';
import TestimonialSection from '@/components/TestimonialSection';
import WatchVideoButton from '@/components/WatchVideoButton';
import { marked } from 'marked';
import TabHome from '@/components/TabHome';
import mediaCoverData from '@/app/lib/getMediaCoverage';
import mediaData from '@/app/lib/getMediaEvent';
import galleryData from '@/app/lib/getGallery';
import SocialMedia from '@/components/SocialMedia';



const HospitalDetails = async ({ params }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const hptData = await hospitalData.getSingleHospital({ slug: params.details, langLoc: getLangLoc });
    const hospitals = await hospitalData.getAll({ langLoc: getLangLoc });
    const staticText = await getStaticText()


    // ::::::::: ALL DATA SETS :::::::::
    const specialityDataSet = {
        sectionTitle: hptData.specialitySection.title,
        buttonText: 'View All', buttonURL: `${basePath + "/speciality?hospital=" + hptData.slug}`,
        data: await getSpecialityData.getAllByFeaturedHospital({ langLoc: getLangLoc, hospitalId: hptData.id }),
        hospital_slug: hptData.slug,
        baseUrl: basePath
    };

    const expertDataSet = {
        sectionTitle: hptData.expertSection.title,
        buttonText: 'View All', buttonURL: `${basePath + "/doctor?hospital=" + hptData.slug}`,
        data: await doctorData.getDoctorByHospital({ langLoc: getLangLoc, hospitalId: hptData.id }),
        baseUrl: basePath
    };

    const testimonialDataSet = {
        sectionTitle: hptData.testimonialSection.title,
        buttonText: 'View All', buttonURL: `${basePath + "/testimonial?hospital=" + hptData.slug}`,
        data: await testimonialData.getTestimonialByHospital({ langLoc: getLangLoc, hospitalId: hptData.id }),
        baseUrl: basePath
    }

    const blogDataSet = {
        sectionTitle: hptData.blog.title,
        buttonText: 'View All', buttonURL: `${basePath + "/blog"}`,
        data: await blogData.getRecentBlog({ langLoc: getLangLoc }),
        baseUrl: basePath
    }

    const galleryDataSet = {
        sectionTitle: "Gallery",
        buttonText: 'View All', buttonURL: `${basePath + "/gallery"}`,
        data: await galleryData.getGalleryImage({ langLoc: getLangLoc }),
        baseUrl: basePath
    }

    const mediaEventDataSet = {
        sectionTitle: "Media & Events",
        buttonText: 'View All', buttonURL: `${basePath + "/media-and-events"}`,
        data: await mediaData.getRecentMedia({ langLoc: getLangLoc }),
        baseUrl: basePath
    }

    const mediaCoverageDataSet = {
        sectionTitle: "News",
        buttonText: 'View All', buttonURL: `${basePath + "/media-coverage"}`,
        data: await mediaCoverData.getRecentMedia({ langLoc: getLangLoc }),
        baseUrl: basePath
    }


    const docTalkDataSet = {
        sectionTitle: hptData.doctorTalk.title,
        buttonText: 'View All', buttonURL: `${basePath + "/doctor-talk?hospital=" + hptData.slug}`,
        data: await doctorTalkData.getByHospital({ langLoc: getLangLoc, hospitalId: hptData.id }),
        baseUrl: basePath
    }


    return (
        <>
            <Header  hospital={hptData.slug} />
            <div role="main" className="main">
                
                {/* <section className="section this-text pt-3 hospital-details-page-section d-lg-block  d-none"
                    style={hptData?.pageBanner?.[0]?.bannerImageDesktop?.url ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}${hptData?.pageBanner?.[0]?.bannerImageDesktop?.url})` } : {}}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 pt-4">
                                <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                    <div className="row">
                                        <div className="col-12 px-0">
                                            <Breadcrumb
                                                activeTitle={hptData.title}
                                                middleTitle={staticText['Our Hospital']}
                                                middleURL={basePath + "/hospital"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="details-banner">
                                            <div className="details-heading">
                                                <div className="hospital-content">
                                                    <ul>
                                                        <li className="hospital-icon-custom">{hptData.title}</li>
                                                        <li>{hptData.address} </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="details-banner">
                                            <div className="details-heading">
                                                <div className="hospital-content">
                                                    <ul>
                                                        <li className="telephone-icon-custom"><a href={`tel:${hptData.contactNo}`}> {staticText['Appointment Number']}- {hptData.contactNo} </a></li>
                                                        <li className="send-custom-icon">
                                                            <a href={hptData.mapURL} target='_blank'> {staticText['Get Direction']}</a>
                                                        </li>
                                                    </ul>
                                                    <div className="d-flex align-items-center mt-2">
                                                        <img src="/img/google.png" alt="Google Logo" className="me-2" />
                                                        <div className="star-rating" data-rating="4.7">
                                                            {
                                                                Array.from({ length: hptData.rating }).map((r, index) => {
                                                                    return index + 1 < hptData.rating - 1 ?
                                                                        <i className="fa fa-solid fa-star ms-1" style={{ color: "#ffc107" }} key={index}></i>
                                                                        : <i key={index} className={`fa fa-solid ms-1 ${Number.isInteger(hptData.rating) ? 'fa-star' : 'fa-star-half'}`} style={{ color: "#ffc107" }}></i>
                                                                })
                                                            }
                                                            {hptData.rating}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section className="d-lg-block d-none">
                    <div className="container-wrapper">
                        <div className="owl-carousel owl-theme hospital-details-slider2">
                            {
                                hptData?.pageBanner?.map((banner, index) => {
                                    return <div className="item" key={index}>
                                        <img src={banner.bannerImageDesktop?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + banner.bannerImageDesktop?.url : "/img/no-image.jpg"} 
                                            className="img-fluid" alt={banner.title} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </section>
                <section className="d-lg-none d-block">
                    <div className="container-wrapper">
                        <div className="owl-carousel owl-theme hospital-details-slider2">
                            {
                                hptData?.pageBanner?.map((banner, index) => {
                                    return <div className="item" key={index}>
                                        <img src={banner.bannerImageMobile?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + banner.bannerImageMobile?.url : "/img/no-image.jpg"} 
                                            className="img-fluid" alt={banner.title} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </section>

                <section className="section hospital-details-page-md-section py-0  d-lg-none  d-block">
                    <div className="container">
                        <div className="row">
                            {/* <div className="col-12 px-0">
                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + hptData.featuredImage?.url} alt="" className="img-fluid hospital-details-mobile-banner" />
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 pt-">
                                        <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                            <div className="row">
                                                <div className="col-12 px-0">
                                                    <ul className="breadcrumb mb-0">
                                                        <li>
                                                            <a href={basePath + "/"}>{staticText['Home']}</a>
                                                        </li>
                                                        <li>
                                                            <a href={basePath + "/hospital"}>{staticText['Our Hospital']}</a>
                                                        </li>
                                                        <li className="active"> {hptData.title} </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="details-banner">
                                                    <div className="details-heading">
                                                        <div className="hospital-content">
                                                            <ul>
                                                                <li className="hospital-icon-custom">{hptData.title} </li>
                                                                <li>{hptData.address}</li>
                                                                <li className="telephone-icon-custom"><a href={`tel:${hptData.contactNo}`}>{staticText['Appointment Number']}- {hptData.contactNo}</a></li>
                                                                <li className="send-custom-icon">
                                                                    <a href={hptData.mapURL}>{staticText['Get Direction']}</a>
                                                                </li>
                                                            </ul>

                                                            <div className="d-flex align-items-center mt-2">
                                                                <img src="/img/google.png" alt="Google Logo" className="me-2" />
                                                                <div className="star-rating" data-rating="4.7">
                                                                    {
                                                                        Array.from({ length: hptData.rating }).map((r, index) => {
                                                                            return index + 1 < hptData.rating - 1 ?
                                                                                <i className="fa fa-solid fa-star ms-1" style={{ color: "#ffc107" }} key={index}></i>
                                                                                : <i key={index} className={`fa fa-solid ms-1 ${Number.isInteger(hptData.rating) ? 'fa-star' : 'fa-star-half'}`} style={{ color: "#ffc107" }}></i>
                                                                        })
                                                                    }
                                                                    {hptData.rating}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>


                {/* <!--=========== fromsection end =======--> */}
                <section className="section py-0 d-lg-block d-none">
                    <div className="container-fluid ps-0">
                        <div className="row">
                            {/* <div className="cta-col ctn-left-col">
                                <div className="cta-diff">
                                    <h3>{staticText['I am here to']} <i className="icon-arrow-right"></i></h3>
                                </div>
                            </div> */}
                            <div className="cta-col">
                                <a href={basePath + "/doctor?hospital="+hptData.slug}>
                                    <div className="cta-diff">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img src="/img/doctor.png" alt="" />
                                            <h3>{staticText['Find a']} <br /> <span>{staticText['Doctor']}</span></h3>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="cta-col">
                                <a href={basePath + "/book-an-appointment?hospital="+hptData.slug}>
                                    <div className="cta-diff">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img src="/img/appointment.png" alt="" />
                                            <h3>{staticText['Book an']} <br /> <span>{staticText['Appointment']}</span></h3>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="cta-col">
                                <a href={basePath + "/health-package"}>
                                    <div className="cta-diff">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img src="/img/health.png" alt="" />
                                            <h3>{staticText['Book a']} <br /> <span>{staticText['Health Checkup']}</span></h3>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            {/* <div className="cta-col">
                                <a href={basePath + "/second-opinion"}>
                                    <div className="cta-diff">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img src="/img/opinion.png" alt="" />
                                            <h3>{staticText['Get']} <br /> <span>{staticText['Second Opinion']}</span></h3>
                                        </div>
                                    </div>
                                </a>
                            </div> */}
                            <div className="cta-col">
                                <a target='_blank' href={"https://consult.bestdocapp.com/home/KIMSTVM?version=new"}>
                                    <div className="cta-diff">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img src="/img/opinion.png" alt="" />
                                            <h3>Get <br /> <span>Tele Medicine</span></h3>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <BookAnAppoinmentShort basePath={basePath} extraClass={"py-4"} currentLangLoc={getLangLoc} currentHospital={hptData.slug} />

                <section className="section pt-lg-0 pt-2 pb-2 d-lg-none d-block" data-aos="fade-up">
                    <div className="container-fluid ps-0">
                        <div className="row">
                            <div className="cta-col ctn-left-col">
                                <a href={basePath + "/book-an-appointment?hospital="+hptData.slug}>
                                    <div className="cta-diff">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img src="/img/appointment-mb.png" alt="" />
                                            <h3>{staticText['Book an']} <br /> {staticText['Appointment']}</h3>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="cta-col">
                                <a href={basePath + "/doctor?hospital="+hptData.slug}>
                                    <div className="cta-diff">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img src="/img/doctor.png" alt="" />
                                            <h3>{staticText['Find a']} <br /> <span>{staticText['Doctor']}</span></h3>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="cta-col">
                                <a href={basePath + "/health-package"}>
                                    <div className="cta-diff">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img src="/img/opinion.png" alt="" />
                                            <h3>{staticText['Health']} <br /> <span>{staticText['Check-up']}</span></h3>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section hospital-details-overview-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 order-lg-1 order-2">
                                <div className="details-right-col text-center sticky-from">
                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${hptData.overviewSection?.thumbnail?.url ? hptData.overviewSection?.thumbnail?.url : hptData.featuredImage?.url}`} alt="" className="img-fluid w-100" />
                                    <h5>{hptData.overviewSection?.caption || hptData.title}</h5>
                                    <p>{hptData.overviewSection?.shortDetails || hptData.overviewSection?.subTitle}</p>
                                    {
                                        hptData.overviewSection?.videoId ?
                                            <WatchVideoButton txt={"Watch Video"} id={hptData.overviewSection?.videoId} />
                                            : null
                                    }
                                    <div className="hospital-content text-start">
                                        <ul>
                                            <li className="location-icon-custom">{hptData.address}</li>
                                            <li className="telephone-icon-custom"><a href={`tel:${hptData.contactNo}`}> {staticText['Appointment Number']}- {hptData.contactNo} </a></li>
                                            <li className="send-custom-icon underline-map">
                                                <a href={hptData.mapURL} target='_blank'> {staticText['Get Direction']}</a>
                                            </li>
                                        </ul>
                                        <div className="d-flex align-items-center mt-2">
                                            <img src="/img/google.png" alt="Google Logo" className="me-2" />

                                            <div className="star-rating" data-rating={hptData.rating}>
                                                {
                                                    Array.from({ length: 5 }, (_, index) => {
                                                        const starValue = index + 1;

                                                        if (starValue <= Math.floor(hptData.rating)) {
                                                            // full star
                                                            return <i key={index} className="fa fa-solid fa-star ms-1" style={{ color: "#ffc107" }}></i>;
                                                        } else if (starValue === Math.floor(hptData.rating) + 1 && !Number.isInteger(hptData.rating)) {
                                                            // half star
                                                            return <i key={index} className="fa fa-solid fa-star-half-stroke ms-1" style={{ color: "#ffc107" }}></i>;
                                                        } else {
                                                            // empty star
                                                            return <i key={index} className="fa fa-regular fa-star ms-1" style={{ color: "#ffc107" }}></i>;
                                                        }
                                                    })
                                                }
                                                <span className="ms-2">{hptData.rating}</span>
                                            </div>

                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                <div className="main-heading">
                                    <h2 className="mb-1">{hptData.overviewSection?.title}</h2>
                                    <h4 className="mb-3">{hptData.overviewSection?.subTitle}</h4>
                                </div>

                                <div className="main-list">
                                    <input type="checkbox" id="read-more-toggle" className="read-more-toggle" />
                                    <div
                                        className="clamped-content"
                                        dangerouslySetInnerHTML={{ __html: marked(hptData.overviewSection?.details) }}
                                    />
                                    <label htmlFor="read-more-toggle" className="read-more-label"></label>
                                </div>


                                {hptData.USPSection.uspItem.length > 1 ? <div className="details-counter-section">
                                    <div className="row">
                                        {
                                            hptData.USPSection?.uspItem?.map((upsec, index) => {
                                                return <div className="col-md-3 col-6 mb-lg-0 mb-3" key={index}>
                                                    <div className="details-counter-box">
                                                        <h2><span className="counter">{upsec.number}</span> <span>{upsec.suffix}
                                                        </span></h2>
                                                        <p>{upsec.title}</p>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div> : null}
                            </div>

                        </div>
                    </div>
                </section>

                <div className="line-divider"></div>
                <ExcellenceCarousel dataSet={specialityDataSet} />

                <div className="line-divider"> </div>
                <ExpertCarousel dataSet={expertDataSet} />

                <div className="line-divider"></div>
                <TestimonialSection dataSet={testimonialDataSet} />

                <div className="line-divider"></div>
                <DocTalk dataSet={docTalkDataSet} />

                {/* <div className="line-divider"></div>
                <BlogCarousel dataSet={blogDataSet} /> */}

                {/*::::: Tab ::::  */}
                <div className="line-divider"></div>
                <TabHome blogDataSet={blogDataSet} galleryDataSet={galleryDataSet} mediaEventDataSet={mediaEventDataSet} mediaCoverageDataSet={mediaCoverageDataSet} />

                {/* <div className="line-divider"></div>
                <section className="section">
                    <div className="container">
                        <div className="row justify-content-between" data-aos="fade-up">
                            <div className="col-md-6 col-8">
                                <div className="main-heading">
                                    <h2>{hptData.hospitalsSection?.title} </h2>
                                </div>
                            </div>
                            <div className="col-md-2 col-4">
                                <div className="over-all-btn text-end">
                                    <a href={basePath + "/hospital"}>{staticText['View All']}<span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                        alt="" /></span></a>
                                </div>
                            </div>
                        </div>
                        <div className="owl-carousel owl-theme hospital-slider">
                            {
                                hospitals.map((h, index) => {
                                    return <div className="custom-hospital-top-card" key={index}>
                                        <div className="custom-hospital-top-card">
                                            <div className="hospital-img">
                                                <a href={basePath + "/hospital/" + h.slug}>
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + h.featuredImage?.url} alt={h.title} className="img-fluid w-100" />
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
                                                        <img src="/img/google.png" alt="Google Logo" className="me-2" style={{ width: "auto" }} />
                                                        <div className="star-rating" data-rating="4.7">
                                                            {
                                                                Array.from({ length: h.rating }).map((r, index) => {
                                                                    return index + 1 < h.rating - 1 ?
                                                                        <i className="fa fa-solid fa-star ms-1" style={{ color: "#ffc107" }} key={index}></i>
                                                                        : <i key={index} className={`fa fa-solid ms-1 ${Number.isInteger(h.rating) ? 'fa-star' : 'fa-star-half'}`} style={{ color: "#ffc107" }}></i>
                                                                })
                                                            }
                                                            {h.rating}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-lg-flex d-block align-items-center justify-content-between pt-3">
                                                    <a href={basePath + "/hospital/" + h.slug} className="btn mb-lg-0 mb-2 hospital-primarybtn">{staticText['View Details']}</a>
                                                    <a href={basePath + "/book-an-appointment"} className="btn mb-lg-0 mb-3 hospital-secondarybtn">{staticText['Appointment']}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </section> */}

            </div>
            <SocialMedia socialWidgetID={hptData.elfScocialWidget} />
            <Footer />
        </>
    )
}

export default HospitalDetails;
