import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import Breadcrumb from '@/components/Breadcrumb';
import getStaticText from '@/app/lib/getStaticTextServer';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';


const CsrInitiative = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const field = "populate[0]=pageContent&populate[1]=pageContent.logoSlider&populate[2]=pageContent.logoSlider.image&populate[3]=pageContent.contentCard&populate[4]=metaSection";
    const data = await getStaticPageContent("csr-initiative",field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="privacy-policy-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent[0]?.title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={pageContent[0]?.title}
                                        middleTitle={""}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <div className="container">
                            <div
                                dangerouslySetInnerHTML={{ __html: pageContent[1]?.details || "" }}
                                className="main-heading main-list sub-heading"></div>
                        </div>
                    </section>

                    
                    <section className="section pt-0">
                        <div className="container">
                            <div className="row">
                                {
                                    pageContent[2]?.logoSlider?.map((img, index) => {
                                        return <div className="col-md-3 col-6 mb-3" key={index}>
                                            <div className="csr-initiative-logo-card">
                                                <div className="csr-initiative-logo-card-img">
                                                    <img src={img.image?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${img.image.url}` : '/img/no-image.jpg'} alt={img.title} className="img-fluid" />
                                                </div>
                                                <h4>{img.title}</h4>
                                                <p>{img.content}</p>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </section>

                    
                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{pageContent[3]?.title}</h2>
                            </div>
                            <div className="row">
                                {
                                    pageContent[4]?.contentCard?.map((cardContent, index) => {
                                        return <div className="col-md-3 col-6 mb-3" key={index}>
                                            <div className="csr-initiative-card">
                                                <h4>{cardContent.title}</h4>
                                                <p>{cardContent.details}</p>
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

export default CsrInitiative;