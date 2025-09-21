import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import jobData from '@/app/lib/getJob';
import formatDate from '@/app/lib/formatDate';
import { marked } from 'marked';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import JobForm from '@/components/Forms/JobForm';

const Carrer = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection";
    const data = await getStaticPageContent("career", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const statictText = await getStaticText();
    const basePath = await getBaseUrl(true, true);
    const allJobs = await jobData.getAll({ langLoc: getLangLoc })


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="career-main-page">
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
                                        middleTitle={''}
                                        middleURL={''}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    
                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                    <div className="main-heading">
                                        <h2 className="mb-lg-1">Make a life with KIMSHEALTH</h2>
                                    </div>
                                    <div className='main-heading sub-heading main-list'>
                                        “ We make it our mission to find people who make a difference in everyday life. At KIMSHEALTH, we offer wide possibilities for innovative and talented employees to enjoy their career and pave their path with personal growth and success. Kindly fill the below form to add your CV to our extensive database. Good luck! ”
                                    </div>
                                </div>
                                <div className="col-md-6 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                    <div className="association-form-card mb-0"  id="bookNowForm" >
                                        <JobForm title={"Apply Now"} jobTitle={"Work with us"}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <div className="container">

                            <div className="row">
                                {
                                    allJobs?.map((job, i) => {
                                        return <div className="col-md-6 mb-3" key={i}>
                                            <div className="career-card">
                                                <div className="career-card-heading">
                                                    <h3>{job?.title}, {job.hospitals[0]?.title}</h3>
                                                    <p>{statictText['Post Date']}: {formatDate(job.date)}</p>
                                                </div>

                                                <div className="main-heading sub-heading main-list-black">
                                                    <h3>{statictText['Experience']}: </h3>
                                                    <ul>
                                                        <li>{job.experience}</li>
                                                    </ul>

                                                    <h3>{statictText['Qualification']}: </h3>
                                                    <ul>
                                                        <li>{job.qualification}</li>
                                                    </ul>

                                                    <h3>{statictText['Description']}: </h3>
                                                    <p><strong>{statictText['Key Responsibilities']}:</strong></p>
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: marked(job.keyResponsibilities || "") || "" }}>
                                                    </div>
                                                </div>

                                                <div className="career-card-heading">
                                                    <h3>{job.hospitals[0]?.title}</h3>
                                                    <div className="from-btn">
                                                        <a href={basePath+"/career/"+job.slug} className="btn w-auto">
                                                            {statictText['Know More']}
                                                        </a>
                                                    </div>
                                                </div>
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

export default Carrer;