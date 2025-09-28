import { getBaseUrl } from '@/app/lib/getBaseUrl'
import testimonialData from '@/app/lib/getTestimonial'
import youtubeData from '@/app/lib/getYoutubeData'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import TestimonialSection from '@/components/TestimonialSection'
import formatDate from '@/app/lib/formatDate'
import { marked } from 'marked'
import Breadcrumb from '@/components/Breadcrumb'
import getStaticText from '@/app/lib/getStaticTextServer'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'


const TestimonialDetails = async ({ params }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl();
    const data = await testimonialData.getSingleTestimonaial({slug: params.details, langLoc: getLangLoc});
    const youtube = await youtubeData(data?.videoId);
    const staticText = await getStaticText()



    const testimonialDataSet = {
        sectionTitle: data?.testimonialSection?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/testimonial"}`,
        data: await testimonialData.getRecent({ langLoc: getLangLoc }),
        baseUrl: basePath
    }



    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="testimonial-details-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{data.title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb activeTitle={data.title}
                                        middleTitle={staticText['Testimonial']}
                                        middleURL={basePath + "/testimonial"}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <div className="container">
                            <div className="testimonial-details-card">
                                <div className="row">
                                    {data.videoId && <div className="col-md-7 mb-lg-0 mb-3">
                                        {
                                            data.videoSource === "Youtube" ?
                                                <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${data.videoId}?si=uQi_tVy9LN6UaOhE`}  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                                                : <iframe src={`https://www.facebook.com/plugins/video.php?height=476&amp;href=https://www.facebook.com/watch/?v=${data.videoId}`} width="100%" height="315" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowFullScreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                        }
                                    </div>}
                                    <div className={`${data.videoId ? 'col-md-5' : 'col-md-12'} col-md-5 testi-rightbox my-auto`}>
                                        <div className="main-heading">
                                            <h3>
                                                {/* {data.videoSource === "Youtube" ? youtube.items[0]?.statistics?.viewCount + "views, " : null}  */}
                                                {formatDate(data.date)} </h3>
                                            <h3>
                                                {
                                                    data.videoSource === "Youtube" ? youtube.items[0]?.snippet?.tags?.map((tag, _) => {
                                                        return <span className='me-2'>
                                                            <a href={`https://www.youtube.com/results?search_query=${tag}`} target='_blank'>{tag}</a>
                                                        </span>
                                                    })
                                                        : null
                                                }
                                            </h3>
                                            <div className='main-list' dangerouslySetInnerHTML={{ __html: marked(data.details || "") || "" }}>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-3">
                                            <div className="doctor-name">
                                                {data.doctor?.name && <p><span><img src="/img/doctor.png" className="img-fluid" alt="" /></span>
                                                    {`${data.doctor.salutation?data.doctor.salutation+" ":""}${data.doctor.name}`}</p>}
                                            </div>
                                            <div className="doctor-catagory">
                                                <p>
                                                    {/* {
                                                        data.specialities?.map((st, _) => (
                                                            st.title + (data.specialities.length - 1 !== _ ? ", " : '')
                                                        ))
                                                    } */}
                                                    {data.specialities[0]?.title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"></div>

                    <TestimonialSection dataSet={testimonialDataSet} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TestimonialDetails;
