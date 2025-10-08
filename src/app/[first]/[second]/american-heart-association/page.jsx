import Footer from '@/components/Footer'
import Form1 from '@/components/Forms/Form1'
import Header from '@/components/Header'
import getStaticText from '@/app/lib/getStaticTextServer'
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent'
import Breadcrumb from '@/components/Breadcrumb'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'

const AmericanHeartAssoc = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection&populate[5]=pageContent.journal&populate[6]=pageContent.journal.thumbnailImage&populate[7]=pageContent.journal.file&populate[8]=pageContent.file";
    const data = await getStaticPageContent("american-heart-association", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    let staticText = await getStaticText();


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="heart-associations-main-page">
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
                                                    <h3>{pageContent[0].title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={pageContent[1].bannerItem.length > 0 ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1].bannerItem[0].bannerImageDesktop?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={pageContent[0]?.title} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                    <section className="section association-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="main-heading sub-heading">
                                        <h2>{pageContent[2].title}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: pageContent[2].details || "" } || ""}></div>
                                    </div>

                                </div>
                                <div className="col-md-4 ">
                                    <div className="association-left-col">
                                        <div className="association-form-card mb-5">
                                            <Form1 title={"Request a Call Back"} type={"American Heart Association"} />
                                        </div>

                                        <h4>{pageContent[3].sectionTitle}</h4>
                                        <p><strong>{pageContent[3].contactPerson}</strong></p>
                                        <p>{pageContent[3].designation}</p>

                                        {pageContent[3].phone && <a href={"tel:" + pageContent[3].phone}><i className="fa-solid fa-phone"></i> {pageContent[3].phone}</a>}

                                        {pageContent[3].email && <a href={"mailto:" + pageContent[3].email}><i className="fa-solid fa-envelope"></i>
                                            {pageContent[3].email}</a>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {pageContent[4]?.title && <>
                        <div className="line-divider"> </div>
                        <section className="section journal-section">
                            <div className="container">
                                <div className="main-heading">
                                    <h2>{pageContent[4]?.title}</h2>
                                </div>
                                <div className="owl-carousel owl-theme journal-slider">
                                    {
                                        pageContent[4]?.journal?.map((j, index) => {
                                            return <div className="expert-card" data-aos="fade-right" key={index}>
                                                <a download href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${j.file?.url}`} >
                                                    <div className="card border-0">
                                                        <div className="card-top">
                                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${j.thumbnailImage.url}`} className="img-fluid w-100" alt={j.title} />
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

export default AmericanHeartAssoc