import ExpertCarousel from '@/components/ExpertCarousel'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent'
import Breadcrumb from '@/components/Breadcrumb'
import getStaticText from '@/app/lib/getStaticTextServer'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'
import doctorData from '@/app/lib/getDoctor'
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import TravelClinicForm from '@/components/Forms/TravelClinicForm'

const TravelClinic = async () => {
  const basePath = await getBaseUrl(true, true);
    const getLangLoc = await getCurrentLangLoc()
    const data = await getStaticPageContent("travel-clinic");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();

    const expertDataSet = {
        sectionTitle: "Meet the Experts",
        buttonText: 'View All', buttonURL: `${basePath + "/doctor"}`,
        data: await doctorData.getMultipleDoctorBySlug({ langLoc: getLangLoc, slug:'dr-surej-kumar-l-k,dr-rajalakshmi-a,dr-muhammed-niyas' }),
        baseUrl: basePath
    };

    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="patients-and-visitors-main-page">
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

                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[1]?.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{ __html: pageContent[1]?.details }}
                                ></div>
                            </div>
                        </div>
                    </section>
                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[2]?.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{ __html: pageContent[2]?.details }}
                                ></div>

                            </div>
                        </div>
                    </section>

                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[3]?.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{ __html: pageContent[3]?.details }}
                                ></div>
                            </div>
                        </div>
                    </section>
                    <div className="line-divider"> </div>

                    <ExpertCarousel dataSet={expertDataSet} /> 


                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>Enquire Now</h2>
                                <TravelClinicForm/>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TravelClinic