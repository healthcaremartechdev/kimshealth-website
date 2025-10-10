import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import Form1 from '@/components/Forms/Form1';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';

const CsrPolicy = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection";
    const data = await getStaticPageContent("csr-policy", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const statictText = await getStaticText()


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="csr-policy-main-page">
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
                                                            activeTitle={pageContent[0]?.title}
                                                            middleTitle={''}
                                                            middleURL={''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3>{pageContent[0]?.title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col mt-lg-0 mt-4">
                                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${pageContent[1]?.bannerItem[0]?.bannerImageDesktop?.url}`} className="img-fluid details-banner-image" alt={pageContent[1]?.bannerItem[0].title} />
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
                                                            activeTitle={pageContent[0]?.title}
                                                            middleTitle={''}
                                                            middleURL={''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-proceduce-banner-right-col mt-lg-0 mt-4">
                                                <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${pageContent[1]?.bannerItem[0]?.bannerImageDesktop?.url}`}
                                                    className="img-fluid details-banner-image" alt={pageContent[1]?.bannerItem[0].title} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-lg-0 mt-4">
                                    <div className="details-banner">
                                        <div className="details-heading">
                                            <h3>{pageContent[0]?.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section doctor-line-divider">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 ps-lg-0 ">
                                    {pageContent[2]?.title && <section className="section pt-0">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[2]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[2]?.details || "" }}></div>
                                            </div>
                                        </div>
                                    </section>}
                                    <div className="line-divider"></div>
                                    {pageContent[3]?.title && <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list-black">
                                                <h2>{pageContent[3]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[3]?.details || "" }}></div>

                                            </div>
                                        </div>
                                    </section>}
                                    <div className="line-divider"></div>
                                    {pageContent[5]?.title && <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list-black">
                                                <h2>{pageContent[5]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[5]?.details || "" }}></div>
                                            </div>
                                        </div>
                                    </section>}
                                    <div className="line-divider"></div>
                                    {pageContent[6]?.title && <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list-black">
                                                <h2>{pageContent[6]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[6]?.details || "" }}></div>
                                            </div>
                                        </div>
                                    </section>}

                                    <div className="line-divider"></div>
                                    {pageContent[7]?.title && <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list-black">
                                                <h2>{pageContent[7]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[7]?.details || "" }}></div>
                                            </div>
                                        </div>
                                    </section>}
                                    <div className="line-divider"></div>
                                    {pageContent[8]?.title && <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list-black">
                                                <h2>{pageContent[8]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[8]?.details || "" }}></div>
                                            </div>
                                        </div>
                                    </section>}
                                    <div className="line-divider"></div>
                                    {pageContent[9]?.title && <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list-black">
                                                <h2>{pageContent[9]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[9]?.details || "" }}></div>
                                            </div>
                                        </div>
                                    </section>}

                                    <div className="line-divider"></div>
                                    {pageContent[10]?.title && <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list-black">
                                                <h2>{pageContent[10]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[10]?.details || "" }}></div>
                                            </div>
                                        </div>
                                    </section>}

                                    <div className="line-divider"></div>
                                    {pageContent[11]?.title && <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list-black">
                                                <h2>{pageContent[11]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[11]?.details || "" }}></div>
                                            </div>
                                        </div>
                                    </section>}

                                    <div className="line-divider"></div>
                                    {pageContent[12]?.title && <section className="section primary-table">
                                        <div className="container">
                                            <div className="main-heading">
                                                <h2 className="mb-1">{pageContent[12]?.title}</h2>
                                                <h3 className="mb-4">{pageContent[12]?.subTitle}</h3>
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: pageContent[12]?.details || "" }}
                                                className="table-responsive">
                                            </div>
                                        </div>
                                    </section>}
                                </div>

                                <div className="col-md-4">
                                    <div className="association-left-col">
                                        <div className="association-form-card mb-5">
                                            <Form1 title={"Request a Call Back"} type={"Contact"} subject={"CSR Policy"} />
                                        </div>
                                        <h4>{pageContent[4].title}</h4>
                                        {/* <p><strong>CSR Desk, KIMSHEALTH P.B. No. 1, Anayara Trivandrum – 695029 Kerala –
                                            India</strong></p>
                                        <p> Senior Manager</p>
                                        <a href="mailto:csr.tvm@kimsglobal.com"><i className="fa-solid fa-envelope"></i>
                                            csr.tvm@kimsglobal.com</a> */}

                                        <div
                                            dangerouslySetInnerHTML={{ __html: pageContent[4]?.details || "" }}
                                            className="table-responsive">
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

export default CsrPolicy;
