import { getBaseUrl } from '@/app/lib/getBaseUrl'
import blogData from '@/app/lib/getBlog'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'
import diseaseData from '@/app/lib/getDisease'
import doctorData from '@/app/lib/getDoctor'
import doctorTalkData from '@/app/lib/getDoctorTalk'
import procedureData from '@/app/lib/getProcedure'
import getSpecialityData from '@/app/lib/getSpeciality'
import getStaticText from '@/app/lib/getStaticTextServer'
import testimonialData from '@/app/lib/getTestimonial'
import BlogCarousel from '@/components/BlogCarousel'
import Breadcrumb from '@/components/Breadcrumb'
import ExpertCarousel from '@/components/ExpertCarousel'
import Footer from '@/components/Footer'
import FormSpeciality from '@/components/Forms/FormSpeciality'
import DocTalk from '@/components/DocTalk'
import Header from '@/components/Header'
import TestimonialSection from '@/components/TestimonialSection'
import WatchVideoButton from '@/components/WatchVideoButton'
import { marked } from 'marked'
import React from 'react'
import Popup from '@/components/Popup'

const SpecialityDetails = async ({ params, searchParams }) => {
    const URLParams = await searchParams;
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText()
    const baseUrl = await getBaseUrl(true, true);
    const baseUrlLangOnly = await getBaseUrl(true, false)
    const data = await getSpecialityData.getSingleSpeciality({ slug: params.details, langLoc: getLangLoc });

    const selectedHospital = URLParams.hospital ? URLParams.hospital : "";

    const allSubSpeciality = await getSpecialityData.getAllSubSpeciality({ langLoc: getLangLoc, id: data.speciality?.id, hospital: selectedHospital });

    // const allDiseas = await diseaseData.getAll({langLoc: getLangLoc, URLParams:URLParams})
    // const allProcedure = await procedureData.getAll({langLoc: getLangLoc, URLParams:URLParams})



    const allDiseas = await diseaseData.getDiseaseBySpeciality({ langLoc: getLangLoc, speciality: data.speciality?.slug })
    const allProcedure = await procedureData.getProcedureBySpeciality({ langLoc: getLangLoc, speciality: data.speciality?.slug })



    // ::::::::: ALL DATA SETS :::::::::
    const expertDataSet = {
        sectionTitle: data.expertSection?.title,
        buttonText: 'View All', buttonURL: `${baseUrl + "/doctor?speciality=" + data.speciality?.slug + `${URLParams.hospital ? '&hospital=' + URLParams.hospital : ''}`}`,
        data: await doctorData.getBySpecialityAndHospital({ id: data.speciality.id, hospital: selectedHospital, langLoc: getLangLoc }),
        baseUrl: baseUrl
    };
    const testimonialDataSet = {
        sectionTitle: data.testimonialSection?.title,
        buttonText: 'View All', buttonURL: `${baseUrl + "/testimonial?speciality=" + data.speciality?.slug}`,
        data: await testimonialData.getBySpecialityWithDefault({ id: data.speciality.id, langLoc: getLangLoc }),
        baseUrl: baseUrl
    }
    const blogDataSet = {
        sectionTitle: data.blogSection?.title,
        buttonText: 'View All', buttonURL: `${baseUrl + "/blog?speciality=" + data.speciality?.slug}`,
        data: await blogData.getBySpeciality({ id: data.speciality.id, langLoc: getLangLoc }),
        baseUrl: baseUrl
    }
    const docTalkDataSet = {
        sectionTitle: data.doctorTalk?.title,
        buttonText: 'View All', buttonURL: `${baseUrl + "/doctor-talk?speciality=" + data.speciality?.slug}`,
        data: await doctorTalkData.getBySpecialityWithDefault({ id: data.speciality.id, langLoc: getLangLoc }),
        baseUrl: baseUrl
    }


    return (
        <>
            <Header />

            <div role="main" className="main">
                <div className="speciality-details-page">
                    <section className="section details-page-before py-0 d-lg-block d-none">
                        <div className="procedures-details-page-header inner-pages-header details-page-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper">
                                                <div className="row">
                                                    <div className="col-12 px-lg-0 px-4">
                                                        <Breadcrumb
                                                            activeTitle={data.title}
                                                            middleTitle={staticText['Specialities']}
                                                            middleURL={baseUrl + "/speciality"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner pt-2">
                                                <div className="details-heading">
                                                    <FormSpeciality title={"Have a query?"} speciality={data.title} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={
                                            data.pageBanner[0].bannerImageDesktop?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + data.pageBanner[0].bannerImageDesktop.url : "/img/no-image.jpg"}
                                            className="img-fluid details-banner-image" alt={data.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section details-page-before py-0 d-lg-none d-block">
                        <div className="procedures-details-page-header inner-pages-header details-page-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <div className="breadcrumb-wrapper">
                                            <div className="row">
                                                <div className="col-12 px-lg-0 px-4">
                                                    <Breadcrumb
                                                        activeTitle={data.title}
                                                        middleTitle={staticText['Specialities']}
                                                        middleURL={baseUrl + "/speciality"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <img src={
                                            data.pageBanner[0].bannerImageDesktop?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + data.pageBanner[0].bannerImageMobile?.url : "/img/no-image.jpg"}
                                            className="img-fluid details-banner-image" alt={data.title} />
                                    </div>
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">

                                            <div className="details-banner pt-lg-5 pt-4">
                                                <div className="details-heading">
                                                    <FormSpeciality title={"Have a query?"} speciality={data.title} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {allSubSpeciality.length > 0 && <section className="section"
                        style={{ background: "linear-gradient(180deg,rgba(255, 255, 255, 1) 45%, rgba(248, 248, 248, 1) 74%)" }}>
                        <div className="container">
                            <div className="details-card-wrapper pb-5">
                                <div className="owl-carousel owl-theme sub-speciality-slide2 position-relative" style={{ zIndex: "99" }}>

                                    {
                                        allSubSpeciality.map((subS, index) => (
                                            subS?.manageAppearance?.viewingMode === "Popup" ? (
                                                <div className="item" key={index}>
                                                    <a
                                                        href="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#popupModalSubSpeciality-${index}`}
                                                    >
                                                        <div className="details-card text-center">
                                                            <div className="card-content custom-min-height-content">
                                                                <h4>{subS.title}</h4>
                                                                <p>{subS.overviewSection?.details?.slice(0, 140)}...</p>
                                                                <div className="main-btn-speciality ">

                                                                    {staticText["Read More"]}
                                                                    <span>
                                                                        <i className="fa-solid fa-arrow-right"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className="item" key={index}>
                                                    <a href={`${baseUrl}/speciality/${subS?.speciality?.slug}`}>
                                                        <div className="details-card text-center">
                                                            <div className="card-content custom-min-height-content">
                                                                <h4>{subS.title}</h4>
                                                                <p>{subS.overviewSection?.details?.slice(0, 140)}...</p>
                                                                <div className="main-btn-speciality ">
                                                                    {staticText['Read More']}
                                                                    <span>
                                                                        <i className="fa-solid fa-arrow-right"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            )
                                        ))
                                    }


                                </div>
                            </div>
                        </div>
                    </section>}

                    {
                        allSubSpeciality.map((subS, index) => {
                            return <Popup key={index} modalId={`popupModalSubSpeciality-${index}`} title={subS.title} content={subS.overviewSection?.details} />
                        })
                    }



                    <section className="section">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-md-7  mb-lg-0 mb-3 pe-lg-5">
                                    <div className="main-heading sub-heading">
                                        <h2>{data.overviewSection?.title}</h2>
                                    </div>
                                    <input type="checkbox" id="read-more-toggle" className="read-more-toggle" />
                                    <div className='main-heading sub-heading main-list clamped-content' dangerouslySetInnerHTML={{ __html: marked(data.overviewSection?.details || "") || "" }}>
                                    </div>
                                    <label htmlFor="read-more-toggle" className="read-more-label"></label>
                                </div>
                                <div className="col-md-5">
                                    <div className="details-right-col text-center sticky-from">
                                        {/* <img src={
                                            data.speciality?.featuredImage ? process.env.NEXT_PUBLIC_IMAGE_URL + data.speciality?.featuredImage.url : "/img/no-image.jpg"} alt="" className="img-fluid w-100" /> */}

                                        <iframe width={'100%'} className='rounded-2' height="315" src={`https://www.youtube.com/embed/${data.overviewSection?.videoId}?si=uQi_tVy9LN6UaOhE`} title={data.overviewSection?.caption} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                                        <h5>{data.overviewSection?.caption}</h5>
                                        <p>{data.overviewSection?.shortDetails} </p>
                                        <div className="main-btn">
                                            <WatchVideoButton txt={"Watch Video"} id={data.overviewSection?.videoId} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <div className="line-divider"> </div>
                    <section className="section"
                        style={{ background: "linear-gradient(180deg,rgba(255, 255, 255, 1) 45%, rgba(248, 248, 248, 1) 74%)" }}>
                        <div className="container">
                            <div className="details-card-wrapper pb-5">
                                <div className="row position-relative" style={{ zIndex: "99" }}>

                                    {
                                        allSubSpeciality.map((subS, index) => {
                                            return <div className="col-md-4 mb-lg-0 mb-3" key={index}>
                                                <div className="details-card text-center">
                                                    <div className="card-content">
                                                        <h4>{subS.title}</h4>
                                                        <p>{subS.overviewSection?.details.slice(0, 70)}</p>

                                                        <div className="main-btn">
                                                            <a href={baseUrl + "/speciality/" + subS?.speciality?.slug}>
                                                                {staticText['Read More']}<span>
                                                                    <i className="fa-solid fa-arrow-right"></i>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }

                                </div>
                            </div>

                            <div className="detsils-key-procedures">
                                <div className="main-heading text-center mb-5">
                                    <h2>{data.diseasesAndProceduresSection?.title}</h2>
                                </div>

                                <div className="details-key-row">
                                    <div className="row justify-content-between">
                                        <div className="col-md-5 col-12 mt-lg-0 mt-3 d-none">
                                            <form action="">
                                                <div className="input-group p-0 my-lg-5 my-1 position-relative justify-content-center">

                                                    <select className="form-select diseases-page-search">
                                                        <option >Search for conditions/diseases </option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                    <button className="input-group-text border-0 search-btn-page"><i
                                                        className="fa-solid fa-magnifying-glass"></i></button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-5 col-12 mb-lg-0 mb-3 d-none">
                                            <form action="">
                                                <div className="input-group p-0 my-lg-5 my-1 position-relative justify-content-center">

                                                    <select className="form-select treatments-page-search">
                                                        <option >Search for procedures/treatments </option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                    <button className="input-group-text border-0 search-btn-page"><i
                                                        className="fa-solid fa-magnifying-glass"></i></button>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="col-md-4 mb-lg-0 mb-3">
                                            {
                                                allDiseas.slice(0,allDiseas.length/2).map((d, index) => {
                                                    return <a href={baseUrlLangOnly + "/disease/" + d.disease.slug} key={index}>
                                                        <div className="details-key-box">
                                                            <div className="details-key-left-col">
                                                                <h5>{d.title}</h5>
                                                            </div>
                                                            <div className="details-key-right-col">
                                                                <span>C</span>
                                                            </div>
                                                        </div>
                                                    </a> 
                                                })
                                            }

                                            <div className="over-all-btn text-start mt-3 ms-2 ps-1 d-lg-block d-none">
                                                <a href={baseUrlLangOnly + "/disease?speciality="+data.speciality.slug}>View all Diseases <span><img src="/img/slider-right-arrow.svg"
                                                    className="img-fluid" alt="" /></span></a>
                                            </div>
                                        </div>


                                        <div className="col-md-4 mb-lg-0 mb-3">
                                            {
                                                allDiseas.slice(allDiseas.length/2,).map((d, index) => {
                                                    return <a href={baseUrlLangOnly + "/disease/" + d.disease.slug} key={index}>
                                                        <div className="details-key-box">
                                                            <div className="details-key-left-col">
                                                                <h5>{d.title}</h5>
                                                            </div>
                                                            <div className="details-key-right-col">
                                                                <span>C</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                })
                                            }
                                        </div>

                                        <div className="over-all-btn text-start mb-3 ms-2 ps-1 d-lg-none d-block">
                                            <a href={baseUrlLangOnly + "/disease?speciality="+data.speciality.slug}>View all Diseases <span><img src="/img/slider-right-arrow.svg"
                                                className="img-fluid" alt="" /></span></a>
                                        </div>


                                        <div className="col-md-4 mb-lg-0 mb-3">
                                            {
                                                allProcedure.map((p, index) => {
                                                    return <a href={baseUrlLangOnly + "/procedure/" + p.procedure.slug} key={index}>
                                                        <div className="details-key-box">
                                                            <div className="details-key-left-col">
                                                                <h5>{p.title}</h5>
                                                            </div>
                                                            <div className="details-key-right-col">
                                                                <span>T</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                })
                                            }

                                            <div className="over-all-btn text-start mt-3 ms-2 ps-1">
                                                <a href={baseUrlLangOnly + "/procedure?speciality="+data.speciality.slug}>View all Procedures<span><img src="/img/slider-right-arrow.svg"
                                                    className="img-fluid" alt="" /></span></a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>  */}


                    <div className="line-divider"> </div>
                    <ExpertCarousel dataSet={expertDataSet} />


                    <div className="line-divider"></div>
                    <TestimonialSection dataSet={testimonialDataSet} />


                    <div className="line-divider"></div>
                    <DocTalk dataSet={docTalkDataSet} />


                    <div className="line-divider"></div>
                    <BlogCarousel dataSet={blogDataSet} />

                </div>
            </div>
            <Footer />
        </>
    )
}

export default SpecialityDetails;