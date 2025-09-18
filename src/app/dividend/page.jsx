import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import Breadcrumb from '@/components/Breadcrumb';
import getStaticText from '@/app/lib/getStaticTextServer';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import Form1 from '@/components/Forms/Form1';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import DividendForm from '@/components/Forms/DividendForm';


const Dividend = async ({ searchParams }) => {
    const URLParams = await searchParams;
    const basePath = await getBaseUrl(true, true);
    const getLangLoc = await getCurrentLangLoc()
    const data = await getStaticPageContent("dividend");
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

                    <DividendForm basePath={basePath} URLParams={URLParams} />
                    <div className="line-divider"> </div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading sub-heading main-list">
                                <h2>{pageContent[1].title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: pageContent[1].details || "" } || ""}></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>





            <Footer />
        </>
    )
}

export default Dividend