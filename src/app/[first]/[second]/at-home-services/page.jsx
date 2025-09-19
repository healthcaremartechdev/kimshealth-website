import BlogCarousel from '@/components/BlogCarousel';
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import TestimonialSection from '@/components/TestimonialSection';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import testimonialData from '@/app/lib/getTestimonial';
import blogData from '@/app/lib/getBlog';
import homeServices from '@/app/lib/getHomeServices';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import { marked } from 'marked';
import FormHomeCare from '@/components/Forms/FormHomeCare';


const HomeServices = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl()
    const data = await getStaticPageContent("at-home-services");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const homeServiceData = await homeServices.getAll({ langLoc: getLangLoc });
    let staticTexts = await getStaticText();


    const testimonialDataSet = {
        sectionTitle: pageContent[5]?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/testimonial"}`,
        data: await testimonialData.getFeaturedAll({ langLoc: getLangLoc }),
        baseUrl: basePath
    }

    const blogDataSet = {
        sectionTitle: pageContent[6]?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/blog"}`,
        data: await blogData.getRecentBlog({ langLoc: getLangLoc }),
        baseUrl: basePath
    }

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

                    <section className="section">
                        <div className="container">
                            <div className="row mb-lg-5">
                                <div className="col-md-5 mb-lg-0 mb-4 order-lg-1 order-2">
                                    <div className="details-right-col text-center">
                                        <img src={pageContent[1].thumbnail?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1].thumbnail?.url : "/img/no-image.jpg"} alt="" className="img-fluid w-100" />
                                        {/* <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${pageContent[1].videoId}?si=uQi_tVy9LN6UaOhE`} title={"KIMSHEALTH"} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}
                                        <h5>{pageContent[1].title}</h5>
                                        <p>{pageContent[1].subTitle}</p>
                                        {/* <div className="main-btn">
                                            <a href="#">{staticTexts['Watch Video']} <span><i className="fa-solid fa-arrow-right"></i></span></a>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="col-md-7 home-service-right-col mb-3  order-lg-2 order-1">
                                    <div className="main-heading sub-heading">
                                        <h2>{pageContent[1].title}</h2>
                                        <p>{pageContent[1].details}</p>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                {
                                    homeServiceData?.map((h, index) => {
                                        return <div className="col-md-4" key={index}>
                                            <div className="home-service-card">
                                                <div className="home-service-card-image text-start">
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + h.icon?.url} alt={h.title} className="img-fluid" />
                                                </div>
                                                <div className="home-service-content text-start">
                                                    <h3>{h.title}</h3>
                                                    <p>{h.shortDetails}</p>
                                                    <div className="main-btn text-start">
                                                        <a href={basePath + "/at-home-services/" + h.slug}>
                                                            {staticTexts['Read More']} <span><i className="fa-solid fa-arrow-right"></i></span>
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


                    {pageContent[4]?.title && <div className="line-divider"> </div>}
                    {pageContent[4]?.title && <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                    <div className="main-heading">
                                        <h2 className="mb-lg-1">{pageContent[4]?.title}</h2>
                                        <h3 className="mb-lg-3">{pageContent[4]?.subTitle}</h3>
                                    </div>
                                    <div className='main-heading sub-heading main-list' dangerouslySetInnerHTML={{ __html: marked(pageContent[4]?.details || "") || "" }}></div>
                                </div>
                                <div className="col-md-4 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                    <div className="association-form-card mb-0"  id="bookNowForm" >
                                        <FormHomeCare title={"GET A CALLBACK FROM OUR HEALTH ADVISOR"} type={"Health At Home Services"} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>}

                    {/* <div className="line-divider"></div>
                    <TestimonialSection dataSet={testimonialDataSet} />


                    <div className="line-divider"></div>
                    <BlogCarousel dataSet={blogDataSet} /> */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HomeServices