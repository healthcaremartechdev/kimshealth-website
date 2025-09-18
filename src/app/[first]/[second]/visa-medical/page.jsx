import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import Breadcrumb from '@/components/Breadcrumb';
import getStaticText from '@/app/lib/getStaticTextServer';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import VisaMedicalTab from '@/components/VisaMedicalTab';
import { marked } from 'marked';

const VisaMedical = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const data = await getStaticPageContent("visa-medical");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="find-doctor-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent[0]?.title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb activeTitle={pageContent[0]?.title} middleTitle={""} middleURL={""} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <VisaMedicalTab pageContent={pageContent}/>
                    <section className="section association-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-heading sub-heading main-list">
                                        <h2>{pageContent[6].title}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: marked(pageContent[6].details) || "" } || ""}></div>
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

export default VisaMedical;
