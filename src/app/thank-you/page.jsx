import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';


const ThankYou = async ({searchParams}) => {
    const URLParams = await searchParams;
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl()
    const data = await getStaticPageContent("thank-you");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    let staticTexts = await getStaticText();

    console.log(URLParams)
    const msg = decodeURIComponent(URLParams.msg);

    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="home-service-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent[0].title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={pageContent[0].title}
                                        middleTitle={''}
                                        middleURL={''}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>


                    {pageContent[0]?.title && <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                    <div className="main-heading">
                                        <h2 className="mb-lg-1">{pageContent[0]?.title}</h2>
                                        <h3 className="mb-lg-3">{pageContent[0]?.subTitle}</h3>
                                    </div>
                                    <div className='main-heading sub-heading main-list'>
                                        <div className="alert alert-success" role="alert">
                                            <strong>Thank you!</strong> Your form has been submitted successfully.
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-6 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                    

                                    <div
                                dangerouslySetInnerHTML={{ __html: msg || "" }}
                                className="main-heading main-list sub-heading"></div>
                                </div>

                            </div>
                        </div>
                    </section>}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ThankYou