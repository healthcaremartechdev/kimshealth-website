import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import getStaticText from '@/app/lib/getStaticTextServer'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent'
import Breadcrumb from '@/components/Breadcrumb'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'
import Form1 from '@/components/Forms/Form1'

const Socomer = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true)
    const staticText = await getStaticText();
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection&populate[5]=pageContent.journal&populate[6]=pageContent.journal.thumbnailImage&populate[7]=pageContent.journal.file&populate[8]=pageContent.file&populate[9]=pageContent.courseCategory&populate[10]=pageContent.socomer&populate[11]=pageContent.socomer.socomerItem&populate[12]=pageContent.socomer.socomerItem.file";
    const data = await getStaticPageContent("socomer", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="socomer-main-page">
                    <section className="section details-page-before py-0">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">

                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <Breadcrumb activeTitle={pageContent[0]?.title}
                                                            middleTitle={staticText['Academics']}
                                                            middleURL={basePath + "#"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3>{pageContent[0].title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={pageContent[1].bannerItem[0]?.bannerImageDesktop?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1].bannerItem[0].bannerImageDesktop?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt="" />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>

                    <section className="section doctor-line-divider">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 ps-lg-0">
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list" dangerouslySetInnerHTML={{ __html: pageContent[2].details }}>
                                            </div>
                                        </div>
                                    </section>


                                    <div className="line-divider"> </div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading">
                                                <h2>{pageContent[3].title}</h2>
                                            </div>

                                            <div className="row">
                                                {
                                                    pageContent[3].socomer?.map((sp, i) => (
                                                        <div className="col-md-6" key={i}>
                                                            <div className="socomer-tab">
                                                                <div className="procedure-acc-card mb-3">
                                                                    <div className="accordion" id={`accordionExample_f${i}`}>
                                                                        <div className="accordion-item">
                                                                            <h2 className="accordion-header">
                                                                                <button
                                                                                    className={`accordion-button ${i === 0 ? "" : "collapsed"}`}
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target={`#collapse_f${i}`}
                                                                                    aria-expanded={i === 0 ? "true" : "false"}
                                                                                    aria-controls={`collapse_f${i}`}
                                                                                >
                                                                                    <span>{sp.title}</span>
                                                                                </button>
                                                                            </h2>
                                                                            <div
                                                                                id={`collapse_f${i}`}
                                                                                className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
                                                                            >
                                                                                <div className="accordion-body px-0 pt-0">
                                                                                    <ul>
                                                                                        {sp?.socomerItem?.map((spI, j) => (
                                                                                            <li key={j}>
                                                                                                - {spI.title}
                                                                                                <a href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${spI.file?.url}`} target="_blank" rel="noopener noreferrer">
                                                                                                    <i className="custom-download"></i>{spI.buttonText}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"> </div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading">
                                                <h2>{pageContent[4].title}</h2>
                                            </div>
                                            <div className="row">
                                                {
                                                    pageContent[4].socomer?.map((sp, i) => (
                                                        <div className="col-md-6" key={i}>
                                                            <div className="socomer-tab">
                                                                <div className="procedure-acc-card mb-3">
                                                                    <div className="accordion" id={`accordionExample${i}`}>
                                                                        <div className="accordion-item">
                                                                            <h2 className="accordion-header">
                                                                                <button
                                                                                    className={`accordion-button ${i === 0 ? "" : "collapsed"}`}
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target={`#collapse${i}`}
                                                                                    aria-expanded={i === 0 ? "true" : "false"}
                                                                                    aria-controls={`collapse${i}`}
                                                                                >
                                                                                    <span>{sp.title}</span>
                                                                                </button>
                                                                            </h2>
                                                                            <div
                                                                                id={`collapse${i}`}
                                                                                className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
                                                                            >
                                                                                <div className="accordion-body px-0 pt-0">
                                                                                    <ul>
                                                                                        {sp.socomerItem.map((spI, j) => (
                                                                                            <li key={j}>
                                                                                                - {spI.title}
                                                                                                <a href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${spI.file?.url}`} target="_blank" rel="noopener noreferrer">
                                                                                                    <i className="custom-download"></i>{spI.buttonText}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"> </div>

                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading">
                                                <h2>{pageContent[5].title}</h2>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="table-responsive hear-associations-table"
                                                        dangerouslySetInnerHTML={{ __html: pageContent[5].details }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </div>

                                <div className="col-md-4">
                                    <div className="association-left-col sticky-from">
                                        <div className="association-form-card mb-5">
                                            <Form1 title={"Request a Call Back"} type={"Contact"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>









                </div>
            </div>
            <Footer />
        </>
    )
}

export default Socomer