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
import procedureData from '@/app/lib/getProcedure'
import WatchVideoButton from '@/components/WatchVideoButton'
import doctorTalkData from '@/app/lib/getDoctorTalk'
import testimonialData from '@/app/lib/getTestimonial'
import doctorData from '@/app/lib/getDoctor'
import Form1 from '@/components/Forms/Form1'
import { marked } from 'marked'
import hospitalData from '@/app/lib/getHospital'

const ProcedureDetails = async ({ params,searchParams }) => {
    const URLParams = await searchParams;
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText();
    const basePathOnlyLang = await getBaseUrl(true, false);
    const basePath = await getBaseUrl(true, true);
    const data = await procedureData.getSingleProcedure({ slug: params.details, langLoc: getLangLoc });




    // ::::::::: ALL DATA SETS :::::::::
    const expertDataSet = {
        sectionTitle: data.expertSection?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/doctor?procedure=" + data.procedure?.slug}`,
        data: await doctorData.getByProcedure({ id: data.procedure.id, langLoc: getLangLoc, hospital:URLParams.hospital }),
        hospitaldata: await hospitalData.getAllHospitalAndMedicalCenter(),
        selectedHospital:URLParams.hospital,
        baseUrl: basePath
    };
    const testimonialDataSet = {
        sectionTitle: data.testimonialSection?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/testimonial?procedure=" + data.procedure?.slug}`,
        data: await testimonialData.getByProcedure({ id: data.procedure.id, langLoc: getLangLoc }),
        baseUrl: basePath
    }

    const docTalkDataSet = {
        sectionTitle: data.doctorTalk?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/doctor-talk?procedure=" + data.procedure?.slug}`,
        data: await doctorTalkData.getByProcedure({ id: data.procedure.id, langLoc: getLangLoc }),
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
                                                        middleTitle={"Procedures"}
                                                        middleURL={basePathOnlyLang + "/procedure"}
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
                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.procedure?.featuredImage?.url}`} className="img-fluid details-banner-image" alt={data.title} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* mobile section */}
                <section className="section details-page-before py-0 d-lg-none d-block">
                    <div className="procedures-details-page-header inner-pages-header">
                        <div className="container-fluid px-0">
                            <div className="row">
                                <div className="col-md-6 details-proceduce-banner-left-col mt-lg-auto">
                                    <div className="hospital-banner-container">
                                        <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                            <div className="row">
                                                <div className="col-12">
                                                    <Breadcrumb
                                                        activeTitle={data.title}
                                                        middleTitle={"Procedures"}
                                                        middleURL={basePathOnlyLang + "/procedure"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="details-proceduce-banner-right-col mt-lg-0 mt-4">
                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.procedure?.featuredImage?.url}`}
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
                                    <Form1 title={"Request a Call Back"} type={"Contact"} subject={"Procedure:"+data.title} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <div className="line-divider"> </div>
                <ExpertCarousel dataSet={expertDataSet} />


                <div className="line-divider"></div>
                <TestimonialSection dataSet={testimonialDataSet} />



                <div className="line-divider"></div>
                <DocTalk dataSet={docTalkDataSet} />

            </div>
            <Footer />
        </>
    )
}

export default ProcedureDetails;
