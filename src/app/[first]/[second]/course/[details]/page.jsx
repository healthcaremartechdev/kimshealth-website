import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import getStaticText from '@/app/lib/getStaticTextServer'
import courseData from '@/app/lib/getCourse';
import Form1 from '@/components/Forms/Form1';
import Breadcrumb from '@/components/Breadcrumb'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'

const DoctoralCourseDetails = async ({ params }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const staticText = await getStaticText();
    const courseDetails = await courseData.getSingleCourse({slug: params.details, langLoc: getLangLoc});
    const otherCourse = await courseData.getAll({ id: courseDetails.courseCategory.id, langLoc: getLangLoc });


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="home-details-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>Course Details</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={staticText['Course Details']}
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
                                <div className="col-md-8">
                                    <div className="main-heading sub-heading">
                                        <h2 className="mb-1">{courseDetails.title}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: courseDetails.details }}></div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doctoral-card-content sub-heading mb-4">
                                        <p>Certified by: {courseDetails.affiliation}</p>
                                        <ul>
                                            <li className="hourglass">{staticText['Duration']} : {courseDetails.affiliation}</li>
                                            <li className="luxury">{staticText['Eligibility']} : {courseDetails.eligibility}</li>
                                            <li className="calender-doc">{staticText['Commencement']} : {courseDetails.commencement}</li>
                                            <li className="car-seat">{staticText['No of seat']}: {courseDetails.noOfSeat}</li>
                                        </ul>

                                    </div>
                                    <div className="association-form-card mb-5">
                                        <Form1 title={"Request a Call Back"} type={"Contact"} subject={courseDetails.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="line-divider"></div>

                    <section className="section">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{courseDetails.courseSection?.title}</h2>
                            </div>
                            <div className="owl-carousel owl-theme hospital-slider">
                                {
                                    otherCourse?.map((l, i) => {
                                        return <div className="doctoral-card-content sub-heading m-3" key={i}>
                                            <h3>{l.title}</h3>
                                            <p>{l.affiliation}</p>
                                            <ul>
                                                <li className="hourglass">{staticText['Duration']}: {l.duration}</li>
                                                <li className="luxury">{staticText['Eligibility']}: {l.eligibility} </li>
                                                <li className="calender-doc">{staticText['Commencement']}: {l.commencement}</li>
                                                <li className="car-seat">{staticText['No of seat']}: {l.noOfSeat}</li>
                                            </ul>
                                            <a href={basePath + "/course/" + l.slug} className="doctotal-btn">
                                                {staticText['View More']}
                                            </a>
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

export default DoctoralCourseDetails;
