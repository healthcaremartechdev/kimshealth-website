import Footer from '@/components/Footer'
import Form1 from '@/components/Forms/Form1'
import Header from '@/components/Header'
import getStaticText from '@/app/lib/getStaticTextServer'
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent'
import Breadcrumb from '@/components/Breadcrumb'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'

const PlanYourVisit = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile";
    const data = await getStaticPageContent("plan-your-visit", field);
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
                                                            middleTitle={""}
                                                            middleURL={""}
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
                    <section className="section association-section  doctor-line-divider">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">

                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                {/* <h2>{pageContent[2].title}</h2> */}
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[2].details || "" } || ""}></div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"> </div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[3].title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[3].details || "" } || ""}></div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"> </div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[4].title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[4].details || "" } || ""}></div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"> </div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[5].title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[5].details || "" } || ""}></div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"> </div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[6].title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[6].details || "" } || ""}></div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"> </div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[7].title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[7].details || "" } || ""}></div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"> </div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[8].title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[8].details || "" } || ""}></div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"> </div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[9].title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[9].details || "" } || ""}></div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"> </div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[10].title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[10].details || "" } || ""}></div>
                                            </div>
                                        </div>
                                    </section>

                                </div>
                                <div className="col-md-4 ">
                                    <div className="association-left-col">
                                        <div className="association-form-card mb-5">
                                            <Form1 title={"Request a Call Back"} type={"International"} />
                                        </div>

                                        <div className="main-heading sub-heading main-list">
                                            <h4>{pageContent[11].title}</h4>
                                            <div dangerouslySetInnerHTML={{ __html: pageContent[11].details || "" } || ""}></div>
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

export default PlanYourVisit