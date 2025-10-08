import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JournalCarousel from '@/components/JournalCarousel';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import Form1 from '@/components/Forms/Form1';

const InternalMedicine = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText();
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection&populate[5]=pageContent.journal&populate[6]=pageContent.journal.thumbnailImage&populate[7]=pageContent.journal.file&populate[8]=pageContent.file";
    const data = await getStaticPageContent("internal-medicine-training-imt", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const basePath = await getBaseUrl(true, true);


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="internal-medicine-main-page">
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
                                                    <h3 className="mb-2">{pageContent[0]?.title}</h3>
                                                    <p>{pageContent[0]?.subTitle}</p>
                                                    <h5>{pageContent[2]?.title}</h5>
                                                    <a download href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${pageContent[2]?.file?.url}`}
                                                        className="mb-3 mt-2 d-block"><i className="custom-download"></i>
                                                        {pageContent[2]?.buttonText}</a>
                                                    <a href="#imtApply" className="hospital-primarybtn">{staticText['Apply Now']}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${pageContent[1]?.bannerItem[0].bannerImageDesktop?.url}`} className="img-fluid details-banner-image"
                                            alt={pageContent[1]?.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="section doctor-line-divider" >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <section className="section pt-0">
                                        <div className="main-heading sub-heading">
                                            <h2>{pageContent[3]?.title}</h2>
                                            <div dangerouslySetInnerHTML={{ __html: pageContent[3]?.details || "" }}></div>
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list">
                                                <h2>{pageContent[4]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[4]?.details || "" }}></div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list">
                                                <h2>{pageContent[5]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[5]?.details || "" }}></div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="col-md-4">
                                    <div className="association-form-card mb-0 mt-2 sticky-from" id='imtApply'>
                                        <Form1 title={"GET A CALLBACK FROM OUR HEALTH ADVISOR"} type={"IMT"} />
                                        <h3 className="mt-3">{pageContent[7]?.title}</h3>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: pageContent[7]?.details || "" }}
                                            className="main-list">
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    {pageContent[6]?.title && <>
                        <div className="line-divider"> </div>
                        <section className="section journal-section">
                            <div className="container">
                                <div className="main-heading">
                                    <h2>{pageContent[6]?.title}</h2>
                                </div>
                                <div className="owl-carousel owl-theme journal-slider">
                                    {
                                        pageContent[6]?.journal.map((j, index) => {
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



                    {/* <JournalCarousel data={[]}/> */}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default InternalMedicine;
