import Footer from '@/components/Footer'
import Header from '@/components/Header'
import JournalCarousel from '@/components/JournalCarousel'
import React from 'react'
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent'
import Form1 from '@/components/Forms/Form1';
import courseData from '@/app/lib/getCourse';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import CourseButton from '@/components/CourseButton'




const KisaHealth = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText();
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection&populate[5]=pageContent.journal&populate[6]=pageContent.journal.thumbnailImage&populate[7]=pageContent.journal.file&populate[8]=pageContent.file&populate[9]=pageContent.courseCategory";
    const basePath = await getBaseUrl(true, true);
    const data = await getStaticPageContent("kisa-kimshealth-institute-of-skill-acquisition", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    let allKisaCourse = await courseData.getAll({ id: pageContent[4].courseCategory?.id, langLoc: getLangLoc });;



    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="skills-acquisition-main-page">
                    <section className="section details-page-before py-0">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <Breadcrumb
                                                            activeTitle={pageContent[0]?.title}
                                                            middleTitle={staticText['Academics']}
                                                            middleURL={basePath + "#"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3 className="mb-2">{pageContent[0].title}</h3>
                                                    <p>{pageContent[0].subTitle}</p>
                                                    <a download={process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[2].file?.url} href={process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[2].file?.url} className="mb-3 mt-2 d-block"><i
                                                        className="custom-download"></i>{pageContent[2].buttonText}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={pageContent[1]?.bannerItem[0]?.bannerImageDesktop?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1]?.bannerItem[0]?.bannerImageDesktop?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={pageContent[0].title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <div className="main-heading sub-heading">
                                        <h2>{pageContent[3].title}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: pageContent[3].details || "" } || ""}></div>

                                        <div className="skill-form-section">
                                            <form action="" className='d-none'>
                                                <div className="row justify-content-center">
                                                    <div className="col-md-6 mb-3">
                                                        <div
                                                            className="input-group p-0 my-lg-5 my-1 position-relative justify-content-center">
                                                            <select className="form-select diseases-page-search">
                                                                <option value={""}>Search for Course </option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                                <option value="3">Three</option>
                                                            </select>
                                                            <button className="input-group-text border-0 search-btn-page"><i className="fa-solid fa-chevron-down"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                            <div className="row">
                                                {
                                                    allKisaCourse?.map((l, i) => {
                                                        return <div className="col-md-4" key={i}>
                                                            <div className="procedure-acc-card mb-3">
                                                                <div className="accordion" id="accordionExample">
                                                                    <div className="accordion-item">
                                                                        <h2 className="accordion-header">
                                                                            <button className={`accordion-button ${i > 2 ? "collapsed" : ""}`} type="button"
                                                                                data-bs-toggle="collapse" data-bs-target={"#collapse" + i}
                                                                                aria-expanded="true" aria-controls={"collapse" + i}>
                                                                                <span>{l.title}</span>
                                                                            </button>
                                                                        </h2>
                                                                        <div id={"collapse" + i} className={`accordion-collapse collapse ${i <= 2 ? "show" : ""}`}>
                                                                            <div className="accordion-body main-list px-0 pt-0">
                                                                                <ul>
                                                                                    {l.affiliation && <li>{staticText['Affiliation']}: {l.affiliation}</li>}
                                                                                    {l.entryLevel && <li>{staticText['Entry Level']}: {l.entryLevel}</li>}
                                                                                    {l.duration && <li>
                                                                                        {staticText['Course Duration']}: {l.duration}
                                                                                    </li>}
                                                                                    {l.fees && <li>{staticText['Fees']}: {l.fees}</li>}
                                                                                    {l.coursePeriodStipend && <li>
                                                                                        {staticText['Course period (stipend)']}: {l.coursePeriodStipend}
                                                                                    </li>}
                                                                                    {l.internshipStipend && <li>{staticText['Internship (stipend)']}: {l.internshipStipend}</li>}
                                                                                </ul>
                                                                                <CourseButton corseCategory={l.courseCategory.title} courseName={l.title} />
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
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="association-form-card mb-5">
                                        <Form1 title={"Request a Call Back"} type={"KISA"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {pageContent[5]?.title && <>
                        <div className="line-divider"> </div>
                        <section className="section journal-section">
                            <div className="container">
                                <div className="main-heading">
                                    <h2>{pageContent[5]?.title}</h2>
                                </div>
                                <div className="owl-carousel owl-theme journal-slider">
                                    {
                                        pageContent[5]?.journal?.map((j, index) => {
                                            return <div className="expert-card" data-aos="fade-right" key={index}>
                                                <a download href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${j.file?.url}`} >
                                                    <div className="card border-0">
                                                        <div className="card-top">
                                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${j.thumbnailImage?.url}`} className="img-fluid w-100" alt={j.title} />
                                                        </div>
                                                        <div className="card-content">
                                                            <h5>{j.title}</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                    </>}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default KisaHealth;
