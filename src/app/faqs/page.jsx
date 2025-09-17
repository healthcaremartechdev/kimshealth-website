import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import { marked } from 'marked';


const Faqs = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const data = await getStaticPageContent("faqs");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText()


    return (
        <>
            <Header />
             <div role="main" className="main">
                <div className="faq-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent ? pageContent[0]?.title : null}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={staticText[pageContent[0]?.title]}
                                        middleTitle={''}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[1]?.title}</h2>
                            </div>

                            <div className="faq-card p-4">
                                <div className="accordion" id="accordionExample">
                                    {
                                        pageContent[1]?.faqData?.map((data, index) => {
                                            return <div className="accordion-item" key={index}>
                                                <h2 className="accordion-header">
                                                    <button className={`accordion-button ${index === 0 ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}
                                                        aria-expanded={`${index === 0 ? "true" : "false"}`} aria-controls={`collapse${index}`}>
                                                        <span>{data.question}</span>
                                                    </button>
                                                </h2>
                                                <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`} data-bs-parent="#accordionExample">
                                                    <div className="accordion-body main-list" dangerouslySetInnerHTML={{ __html: marked(data.answer || "") || "" }}>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
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

export default Faqs