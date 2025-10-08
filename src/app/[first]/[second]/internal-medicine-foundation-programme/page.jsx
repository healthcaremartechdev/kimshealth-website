import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import Breadcrumb from '@/components/Breadcrumb';
import getStaticText from '@/app/lib/getStaticTextServer';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import Form1 from '@/components/Forms/Form1';

const ClinicalSkills = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText();
    const field = "populate[0]=pageContent&populate[1]=pageContent.logoSlider&populate[2]=pageContent.logoSlider.image&populate[3]=metaSection&populate[4]=pageContent.journal&populate[5]=pageContent.journal.thumbnailImage&populate[6]=pageContent.journal.file";
    const data = await getStaticPageContent("internal-medicine-foundation-programme", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="emergency-medicine-main-page">

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
                            <div className="main-heading sub-heading main-list">
                                <h2>{pageContent[1]?.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: pageContent[1]?.details }}>
                                </div>
                            </div>
                        </div>
                    </section>



                    <div className="line-divider"></div>

                    {pageContent[2]?.title && <section className="section exellence-section" data-aos="fade-up">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-md-4 col-8">
                                    <div className="main-heading">
                                        <h2>{pageContent[2]?.title}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="owl-carousel owl-theme exellence imt-foundation">
                                {
                                    pageContent[3]?.logoSlider?.map((img, index) => {
                                        return <div className="item" key={index}>
                                            <div class="expert-card aos-init aos-animate" data-aos="fade-right">
                                                <div class="card border-0 p-lg-4 p-0">
                                                    <div class="card-top">
                                                        <img class="img-fluid w-100" alt={img.title} src={img.image?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${img.image.url}` : '/img/no-image.jpg'} />
                                                    </div>
                                                    <div class="card-content leader-card-content">
                                                        <h4>{img.title}</h4>
                                                        <p className='no-clamp'>{img.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }



                            </div>
                        </div>
                    </section>}


                    {/* ::::::: JOURNAL :::::: */}
                    {pageContent[4]?.title && <>
                        <div className="line-divider"></div>
                        <section className="section journal-section">
                            <div className="container">
                                <div className="main-heading">
                                    <h2>{pageContent[4]?.title}</h2>
                                </div>
                                <div className="owl-carousel owl-theme journal-slider">
                                    {
                                        pageContent[4]?.journal?.map((j, index) => {
                                            return <div className="expert-card" data-aos="fade-right" key={index}>
                                                <a download href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${j.file.url}`} >
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

                </div>
            </div>
            <Footer />
        </>
    )
}

export default ClinicalSkills