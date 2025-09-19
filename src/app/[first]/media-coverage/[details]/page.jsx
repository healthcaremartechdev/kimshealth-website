import formatDate from '@/app/lib/formatDate'
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'
import mediaCoverData from '@/app/lib/getMediaCoverage'
import getStaticText from '@/app/lib/getStaticTextServer'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { marked } from 'marked'
import React from 'react'

const MediaAndEventsDetails = async ({ params }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const staticText = await getStaticText();
    const data = await mediaCoverData.getSingleMedia({slug: params.details, langLoc: getLangLoc});
    const recentMedia = await mediaCoverData.getRecentMedia({langLoc: getLangLoc})


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="media-coverage-details-main-page">

                    {/* Desktop section */}
                    <section className="section details-page-before py-0 d-lg-block d-none">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <Breadcrumb
                                                            activeTitle={data.title}
                                                            middleTitle={staticText["Media & Coverage"]}
                                                            middleURL={basePath + "/media-coverage"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3>{data.title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col mt-lg-0 mt-4">
                                        <img src={data.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + data.featuredImage?.url : '/img/no-image.jpg'} className="img-fluid details-banner-image" alt={data.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* mobile section */}
                    <section className="section details-page-before py-0 d-lg-none d-block">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col mt-lg-auto">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <Breadcrumb
                                                            activeTitle={data.title}
                                                            middleTitle={staticText["Media & Events"]}
                                                            middleURL={basePath + "/media-coverage"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-proceduce-banner-right-col mt-lg-0 mt-4">
                                                    <img src={data.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + data.featuredImage?.url : '/img/no-image.jpg'} className="img-fluid details-banner-image" alt={data.title} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-lg-0 mt-4">
                                    <div className="details-banner">
                                        <div className="details-heading">
                                            <h3>{data.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>














                    <section className="section">
                        <div className="container">
                            <div className="date-heading main-heading sub-heading">
                                {/* <ul>
                                    <li className="calender-doc mb-2">{formatDate(data.date)}</li>
                                </ul> */}
                                <h3 className="mb-4">{data.title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: marked(data.details) || "" }}></div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"> </div>

                    <section className="section d-lg-block d-none">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-md-6 col-8">
                                    <div className="main-heading">
                                        <h2>{data.mediaSection?.title}</h2>
                                    </div>
                                </div>
                                <div className="col-md-2 col-4">
                                    <div className="over-all-btn text-end">
                                        <a href={basePath + "/media-coverage"}>{staticText['View All']} <span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                            alt="" /></span></a>
                                    </div>
                                </div>
                            </div>

                            <div className="owl-carousel owl-theme blog">

                                {
                                    recentMedia.map((rm, i) => {
                                        return <div className="media-card"  key={i}>
                                            <div className="media-img">
                                                <a href={basePath + "/media-coverage/" + rm.slug}>
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
                                                                <img src="/img/kims-small-logo.png" className="img-fluid" alt="" />
                                                            </div>
                                                            <p><a href={basePath + "/media-coverage/" + rm.slug}><strong>{rm.title}</strong></a> 
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
                            <div className="row g-2">

                            </div>

                        </div>
                    </section>

                    {/* Mobiel view */}
                    <section className="section d-lg-none d-block">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-md-4 col-8">
                                    <div className="main-heading">
                                        <h2>{data.mediaSection?.title}</h2>
                                    </div>
                                </div>
                                <div className="col-md-2 col-4">
                                    <div className="over-all-btn text-end">
                                        <a href={basePath + "/media-coverage"}>{staticText['View All']} <span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                            alt="" /></span></a>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2">

                                {
                                    recentMedia.map((e, i) => (
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-6 mb-2" key={i}>
                                            <div className="media-card">
                                                <div className="media-img">
                                                    <a href={basePath + "/media-coverage/" + e.slug}>
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
                                                                <img src="/img/kims-small-logo.png" className="img-fluid" alt="" />
                                                            </div>
                                                            <p>
                                                                <a href={basePath + "/media-coverage/" + e.slug}><strong>{e.title}
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
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MediaAndEventsDetails