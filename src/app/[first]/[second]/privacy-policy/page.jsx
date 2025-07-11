import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import Breadcrumb from '@/components/Breadcrumb';
import getStaticText from '@/app/lib/getStaticTextServer';


const PrivacyPolicy = async () => {
    const data = await getStaticPageContent("privacy-policy");
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
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PrivacyPolicy