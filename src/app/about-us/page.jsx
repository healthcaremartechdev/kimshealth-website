import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { marked } from 'marked';
import leaderData from '@/app/lib/getLeader';
import awardData from '@/app/lib/getAward';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';



const AboutUs = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection&populate[5]=pageContent.highlightButtonItem&populate[6]=pageContent.highlightButtonItem.iconImage&populate[7]=pageContent.image&populate[8]=pageContent.uspItem&populate[9]=pageContent.uspItem.icon";
    const data = await getStaticPageContent("about-us", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();


    let allLeaderPromoters = await leaderData.getAll({ type: 'Promoters', langLoc: getLangLoc });
    let allLeaderBoardofDirectors = await leaderData.getAll({ type: 'Board of Directors', langLoc: getLangLoc });
    let allLeaderSeniorManagement = await leaderData.getAll({ type: 'Senior Management', langLoc: getLangLoc });
    let allLeaderClinicalLeaders = await leaderData.getAll({ type: 'Clinical Leaders', langLoc: getLangLoc });
    let awards = await awardData.getAll({ langLoc: getLangLoc })

    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="about-us-main-page">
                    <section className="section details-page-before py-0 d-lg-block d-none">
                        <div className="procedures-details-page-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">


                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <Breadcrumb
                                                            activeTitle={staticText['About Us']}
                                                            middleTitle={''}
                                                            middleURL={''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <div className="hospital-content">
                                                        <div className="row">
                                                            {
                                                                pageContent[10]?.uspItem?.map((u, i) => {
                                                                    return <div className="col-md-6 col-6 mb-3" key={i}>
                                                                        <div className="d-flex align-items-center">
                                                                            <div>
                                                                                <img src={u?.icon?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + u?.icon?.url : "/img/no-image.jpg"} alt="" className="img-fluid" />
                                                                            </div>
                                                                            <div>
                                                                                <h3>{u?.number} {u?.suffix}</h3>
                                                                                <p>{u.title}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <div className="owl-carousel owl-theme hospital-details-slider">
                                            {
                                                pageContent[1]?.bannerItem?.map((b, i) => {
                                                    return <div className="item" key={i}>
                                                        <img src={b.bannerImageDesktop?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + b.bannerImageDesktop?.url : '/img/no-image.jpg'}
                                                            alt="" className="img-fluid w-100" />
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="section details-page-before py-0 d-lg-none d-block">
                        <div className="procedures-details-page-header">
                            <div className="container pe-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col px-0">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <Breadcrumb
                                                            activeTitle={staticText['About Us']}
                                                            middleTitle={''}
                                                            middleURL={''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-proceduce-banner-right-coL">
                                                <div className="owl-carousel owl-theme hospital-details-slider">
                                                    {
                                                        pageContent[1]?.bannerItem?.map((b, i) => {
                                                            return <div className="item" key={i}>
                                                                <img src={b.bannerImageDesktop?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + b.bannerImageDesktop?.url : "/img/no-image.jpg"}
                                                                    alt="" className="img-fluid w-100" />
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="details-banner">
                                            <div className="details-heading">
                                                <div className="hospital-content">
                                                    <div className="row">
                                                        {
                                                            pageContent[10]?.uspItem?.map((u, i) => {
                                                                return <div className="col-md-6 col-6 mb-3">
                                                                    <div className="d-flex align-items-center">
                                                                        <div>
                                                                            <img src={u?.icon?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + u?.icon?.url : "/img/no-image.jpg"} alt="" className="img-fluid" />
                                                                        </div>
                                                                        <div>
                                                                            <h3>{u?.number} {u?.suffix}</h3>
                                                                            <p>{u.title}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                    <div className="main-heading">
                                        <h2 className="mb-lg-1">{pageContent[2]?.title}</h2>
                                        <h3 className="mb-lg-3">{pageContent[2]?.subTitle}</h3>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: marked(pageContent[2]?.details || "") || "" }}></div>


                                    <div className="row">
                                        <div className="col-md-4 mb-3 main-heading sub-heading mission-box" data-aos="slide-up" data-aos-duration="1000">
                                            <div className="d-flex align-items-center mb-2">
                                                <img src="/img/mission.png" alt="" className="img-fluid me-2" />
                                                <h3 className="mb-0">{pageContent[3].title}</h3>
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: marked(pageContent[3]?.details || "") || "" }}></div>
                                        </div>

                                        <div className="col-md-4 mb-3 main-heading sub-heading mission-box" data-aos="slide-up" data-aos-duration="1000">
                                            <div className="d-flex align-items-center mb-2">
                                                <img src="/img/vision.png" alt="" className="img-fluid me-2" />
                                                <h3 className="mb-0">{pageContent[4].title}</h3>
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: marked(pageContent[4]?.details || "") || "" }}></div>
                                        </div>

                                        <div className="col-md-4 mb-3 main-heading sub-heading mission-box" data-aos="slide-up" data-aos-duration="1000">
                                            <div className="d-flex align-items-center mb-2">
                                                <img src="/img/values.png" alt="" className="img-fluid me-2" />
                                                <h3 className="mb-0">{pageContent[5].title}</h3>
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: marked(pageContent[5]?.details || "") || "" }}></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    <div className="line-divider"> </div>
                    <section className="section chairman-section pb-0">
                        <div className="container">
                            <div className="main-heading overflow-hidden">
                                <h2 data-aos="slide-right" data-aos-duration="1500">{pageContent[6].title}</h2>
                            </div>

                            <div className="row">
                                <div className="col-md-5 mt-lg-auto mb-0">
                                    <img src={pageContent[6].image ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[6].image.url : "/img/no-image.jpg"} alt="" className="img-fluid" />
                                </div>
                                <div className="col-md-7 mb-3 pb-lg-5 mt-3 mt-lg-0 overflow-hidden">
                                    <div className="sub-heading main-heading" data-aos="slide-left" data-aos-duration="1500" dangerouslySetInnerHTML={{ __html: marked(pageContent[6].details || "") || "" }}>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>


                    {/* ==== Leadership ==== */}
                    <div className="line-divider"></div>
                    <section className="section expert-section">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{pageContent[8].title}</h2>
                            </div>
                            {allLeaderPromoters.length > 0 && <>
                                <div className="sub-heading mb-3">
                                <h4>{staticText['Promoters']}</h4>
                                </div>
                                <div className="row mb-3">
                                    {
                                        allLeaderPromoters.map((l, i) => {
                                            return <div className="col-md-3 col-6 mb-4" key={i}>
                                                <div className="expert-card" data-aos="fade-right">
                                                    <div className="card card.promoter-card border-0 p-lg-4 p-0">
                                                        <div className="card-top">
                                                            <a href="#">
                                                                <img src={l.image ? process.env.NEXT_PUBLIC_IMAGE_URL + l.image.url : "/img/no-image.jpg"}
                                                                    className="img-fluid w-100" alt={l.name} />
                                                            </a>
                                                        </div>
                                                        <div className="card-content ">
                                                            <h4>{l.name}</h4>
                                                            {/* <p className='no-clamp'>{l.designation}</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                            }

                            {allLeaderBoardofDirectors.length > 0 && <>
                                <div className="sub-heading mb-3">
                                <h4>{staticText['Board of Directors']}</h4>
                                </div>
                                <div className="row mb-3">
                                    {
                                        allLeaderBoardofDirectors.map((l, i) => {
                                            return <div className="col-md-3 col-6 mb-4" key={i}>
                                                <div className="expert-card" data-aos="fade-right">
                                                    <div className="card border-0 p-lg-4 p-0">
                                                        <div className="card-top">
                                                            <a href="#">
                                                                <img src={l.image ? process.env.NEXT_PUBLIC_IMAGE_URL + l.image.url : "/img/no-image.jpg"}
                                                                    className="img-fluid w-100" alt={l.name} />
                                                            </a>
                                                        </div>
                                                        <div className="card-content">
                                                            <h4>{l.name}</h4>
                                                            <p className='no-clamp'>{l.designation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                            }

                            {allLeaderSeniorManagement.length > 0 && <>
                                <div className="sub-heading mb-3">
                                    <h4>{staticText['Senior Management']}</h4>
                                </div>
                                <div className="row mb-3">
                                    {
                                        allLeaderSeniorManagement.map((l, i) => {
                                            return <div className="col-md-3 col-6 mb-4" key={i}>
                                                <div className="expert-card" data-aos="fade-right">
                                                    <div className="card border-0 p-lg-4 p-0">
                                                        <div className="card-top">
                                                            <a href="#">
                                                                <img src={l.image ? process.env.NEXT_PUBLIC_IMAGE_URL + l.image.url : "/img/no-image.jpg"}
                                                                    className="img-fluid w-100" alt={l.name} />
                                                            </a>
                                                        </div>
                                                        <div className="card-content">
                                                            <h4>{l.name}</h4>
                                                            <p className='no-clamp'>{l.designation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                            }

                            {allLeaderClinicalLeaders.length > 0 && <>
                                <div className="sub-heading mb-3">
                                    <h4>{staticText['Clinical Leaders']}</h4>
                                </div>
                                <div className="row mb-3">
                                    {
                                        allLeaderClinicalLeaders.map((l, i) => {
                                            return <div className="col-md-3 col-6 mb-4" key={i}>
                                                <div className="expert-card" data-aos="fade-right">
                                                    <div className="card border-0 p-lg-4 p-0">
                                                        <div className="card-top">
                                                            <a href="#">
                                                                <img src={l.image ? process.env.NEXT_PUBLIC_IMAGE_URL + l.image.url : "/img/no-image.jpg"}
                                                                    className="img-fluid w-100" alt={l.name} />
                                                            </a>
                                                        </div>
                                                        <div className="card-content">
                                                            <h4>{l.name}</h4>
                                                            <p className='no-clamp'>{l.designation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                            }
                        </div>
                    </section>

                    {/* :::: AWARDS :::: */}
                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{pageContent[9].title}</h2>
                            </div>
                            <div className="row">
                                {
                                    awards.map((a, i) => {
                                        return <div className="col-md-4 mb-3" key={i}>
                                            <div className="awards-box">
                                                <p>{a.title}</p>
                                            </div>
                                        </div>
                                    })
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

export default AboutUs