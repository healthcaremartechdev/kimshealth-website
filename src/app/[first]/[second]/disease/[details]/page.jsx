import { getBaseUrl } from '@/app/lib/getBaseUrl'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'
import Breadcrumb from '@/components/Breadcrumb'
import ExpertCarousel from '@/components/ExpertCarousel'
import Footer from '@/components/Footer'
import DocTalk from '@/components/DocTalk'
import Header from '@/components/Header'
import TestimonialSection from '@/components/TestimonialSection'
import React from 'react'
import getStaticText from '@/app/lib/getStaticTextServer'
import diseaseData from '@/app/lib/getDisease'
import WatchVideoButton from '@/components/WatchVideoButton'
import doctorTalkData from '@/app/lib/getDoctorTalk'
import testimonialData from '@/app/lib/getTestimonial'
import doctorData from '@/app/lib/getDoctor'
import Form2 from '@/components/Forms/Form2'
import Form1 from '@/components/Forms/Form1'
import { marked } from 'marked'
import hospitalData from '@/app/lib/getHospital'

const DiseaseDetails = async ({ params,searchParams }) => {
    const URLParams = await searchParams;
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText();
    const basePathOnlyLang = await getBaseUrl(true, false);
    const basePath = await getBaseUrl(true, true);
    const data = await diseaseData.getSingleDisease({ slug: params.details, langLoc: getLangLoc });



    // ::::::::: ALL DATA SETS :::::::::
    const expertDataSet = {
        sectionTitle: data.expertSection?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/doctor?disease=" + data.disease?.slug}`,
        data: await doctorData.getByDisease({ id: data.disease.id, langLoc: getLangLoc, hospital:URLParams.hospital }),
        hospitaldata: await hospitalData.getAllHospitalAndMedicalCenter(),
        selectedHospital:URLParams.hospital,
        baseUrl: basePath
    };
    const testimonialDataSet = {
        sectionTitle: data.testimonialSection?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/testimonial?disease=" + data.disease?.slug}`,
        data: await testimonialData.getByDisease({ id: data.disease.id, langLoc: getLangLoc }),
        baseUrl: basePath
    }

    const docTalkDataSet = {
        sectionTitle: data.doctorTalk?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/doctor-talk?disease=" + data.disease?.slug}`,
        data: await doctorTalkData.getByDisease({ id: data.disease.id, langLoc: getLangLoc }),
        baseUrl: basePath
    }


    return (
        <>
            <Header />
            <div role="main" className="main">
                


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
                                                        activeTitle={data.title}
                                                        middleTitle={"Diseases"}
                                                        middleURL={basePathOnlyLang + "/disease"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="details-banner">
                                            <div className="details-heading">
                                                <h3>{data.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 details-proceduce-banner-right-col mt-lg-0 mt-4">
                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.disease?.featuredImage?.url}`} className="img-fluid details-banner-image" alt={data.title} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* mobile section */}
                <section className="section details-page-before py-0 d-lg-none d-block">
                    <div className="diseases-details-page-header inner-pages-header">
                        <div className="container-fluid px-0">
                            <div className="row">
                                <div className="col-md-6 details-proceduce-banner-left-col mt-lg-auto">
                                    <div className="hospital-banner-container">
                                        <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                            <div className="row">
                                                <div className="col-12">
                                                    <Breadcrumb
                                                        activeTitle={data.title}
                                                        middleTitle={"Diseases"}
                                                        middleURL={basePathOnlyLang + "/disease"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="details-proceduce-banner-right-col mt-lg-0 mt-4">
                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.disease?.featuredImage?.url}`}
                                                className="img-fluid details-banner-image" alt={data.title} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-lg-0 mt-4">
                                <div className="details-banner">
                                    <div className="details-heading">
                                        <h3>{data.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




                <section className="section  health-pack-details-main-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 sub-heading mb-lg-0 mb-3 pe-lg-5">
                                <div className="main-heading">
                                    <h2>{data.overviewSection?.title}</h2>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: marked(data.overviewSection?.details) || "" }}></div>
                            </div>
                            <div className="col-md-4">
                                <div className="association-form-card sticky-form mb-5">
                                    <Form1 title={"Request a Call Back"} type={"Contact"} subject={"Disease:"+data.title} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <div className="line-divider"> </div>

                <section className="section"
                    style={{ background: "linear-gradient(180deg,rgba(255, 255, 255, 1) 45%, rgba(248, 248, 248, 1) 74%)" }}>
                    <div className="container">
                        <div className="main-heading text-center">
                            <h2>Treatments</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-lg-0 mb-3">
                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                                    <span>Coronary Artery Disease (CAD)</span>
                                                </button>
                                            </h2>
                                            <div id="collapse1" className="accordion-collapse collapse show">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse105" aria-expanded="true" aria-controls="collapse105">
                                                    <span>Severe Left Main Coronary Artery Disease</span>
                                                </button>
                                            </h2>
                                            <div id="collapse105" className="accordion-collapse collapse">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse106" aria-expanded="true" aria-controls="collapse106">
                                                    <span>Post-Myocardial Infarction Complications</span>
                                                </button>
                                            </h2>
                                            <div id="collapse106" className="accordion-collapse collapse">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="col-md-4 mb-lg-0 mb-3">
                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
                                                    <span>Myocardial Ischemia</span>
                                                </button>
                                            </h2>
                                            <div id="collapse2" className="accordion-collapse collapse show">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Myocardial ischemia occurs when reduced blood flow to the heart deprives it
                                                        of oxygen, causing chest pain (angina), shortness . . . .<span> Read
                                                            More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse107" aria-expanded="true" aria-controls="collapse107">
                                                    <span>Multi-Vessel Coronary Artery Disease</span>
                                                </button>
                                            </h2>
                                            <div id="collapse107" className="accordion-collapse collapse">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse108" aria-expanded="true" aria-controls="collapse108">
                                                    <span>Heart Failure</span>
                                                </button>
                                            </h2>
                                            <div id="collapse108" className="accordion-collapse collapse">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>



                            </div>

                            <div className="col-md-4 mb-lg-0 mb-3">
                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse3" aria-expanded="true" aria-controls="collapse3">
                                                    <span>Chronic Stable Angina</span>
                                                </button>
                                            </h2>
                                            <div id="collapse3" className="accordion-collapse collapse show">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Chronic Stable Angina is chest pain or discomfort due to reduced blood flow
                                                        to the heart. It occurs during exertion or stress and is. . . .<span> Read
                                                            More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse109" aria-expanded="true" aria-controls="collapse109">
                                                    <span>Acute Coronary Syndrome (ACS)</span>
                                                </button>
                                            </h2>
                                            <div id="collapse109" className="accordion-collapse collapse">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </section> */}


                <div className="line-divider"> </div>
                <ExpertCarousel dataSet={expertDataSet}/>


                <div className="line-divider"></div>
                <TestimonialSection dataSet={testimonialDataSet}/>



                <div className="line-divider"></div>
                <DocTalk dataSet={docTalkDataSet}/>

            </div>
            <Footer />
        </>
    )
}

export default DiseaseDetails;
