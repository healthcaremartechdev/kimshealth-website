import { getBaseUrl } from '@/app/lib/getBaseUrl';
import blogData from '@/app/lib/getBlog';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import doctorData from '@/app/lib/getDoctor';
import getStaticText from '@/app/lib/getStaticTextServer';
import BlogCarousel from '@/components/BlogCarousel';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import Form1 from '@/components/Forms/Form1';
import Header from '@/components/Header';
import { marked } from 'marked';


const BlogDetails = async ({ params }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const data = await blogData.getSingleBlog({ slug: params.details, langLoc: getLangLoc });
    const docData = await doctorData.getSingleDoctor({ slug: data?.doctor[0]?.slug, langLoc: getLangLoc });
    const staticText = await getStaticText();


    const blogDataSet = {
        sectionTitle: data.blogSection?.title || "Related Blogs",
        buttonText: 'View All', buttonURL: `${basePath + "/blog"}`,
        data: await blogData.getRecentBlog({ langLoc: getLangLoc }),
        baseUrl: basePath
    }



    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="blog-details-main-page">
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
                                                            middleTitle={staticText['Blogs']}
                                                            middleURL={basePath + "/blog"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {docData?.name && <div className="details-banner blog-details-banner-image">
                                                <div className="details-heading">
                                                    <div className="row">
                                                        <div className="col-md-4 ">
                                                            <img src={docData?.doctorImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + docData.doctorImage?.url : "/img/no-image.jpg"} alt={docData?.name} className="img-fluid" />
                                                        </div>
                                                        <div className="col-md-8 my-auto">
                                                            <h3>{`${docData.salutation ? docData.salutation + " " : ""}${docData.name}`}</h3>
                                                            <p>
                                                                {docData?.hospitals?.map((data, _) => {
                                                                    return data.title + (docData?.hospitals?.length - 1 !== _ ? "," : "");
                                                                })}
                                                            </p>
                                                            <h4>
                                                                {docData?.specialities?.map((data, _) => {
                                                                    return data.title + (docData?.specialities?.length - 1 !== _ ? "," : "");
                                                                })}
                                                            </h4>
                                                            <div className="mt-4">

                                                                {docData.appointmentAvailable && (
                                                                    <a
                                                                        href={`${basePath}/book-an-appointment/?doctor=${docData?.salutation ? docData?.salutation + " " : ""
                                                                            }${docData?.name}&location=${docData?.locations?.[0]?.slug === "generic"
                                                                                ? docData?.locations?.[1]?.slug
                                                                                : docData?.locations?.[0]?.slug
                                                                            }&hospital=${docData?.hospitals?.[0]?.slug}&speciality=${docData?.specialities?.[0]?.slug}`}
                                                                        className="hospital-primarybtn"
                                                                    >
                                                                        {staticText['Book An Appointment']}
                                                                    </a>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>


                                    <div className="col-md-6 details-proceduce-banner-right-col mt-lg-0 mt-4">
                                        <img src={data.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + data.featuredImage.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={data.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ::::: MOBILE SECTION :::::: */}
                    <section className="section details-page-before py-0 d-lg-none d-block">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container pe-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col mt-lg-auto">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <Breadcrumb
                                                            activeTitle={data.title}
                                                            middleTitle={staticText['Blogs']}
                                                            middleURL={basePath + "/blog"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-proceduce-banner-right-col mt-lg-0 mt-4">
                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + data.featuredImage?.url} className="img-fluid details-banner-image"
                                                    alt={data.title} />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {docData?.name && <div className="col-md-6 mt-lg-0 mt-4">
                                    <div className="details-banner">
                                        <div className="details-heading">
                                            <div className="row">
                                                <div className="col-12 my-auto pe-3">
                                                    <h3>{data.title}</h3>
                                                    <h4>{`${docData.salutation ? docData.salutation + " " : ""}${docData.name}`}</h4>
                                                    <p>{docData?.hospitals?.map((data, _) => {
                                                        return data.title + (docData?.hospitals?.length - 1 !== _ ? "," : "");
                                                    })}</p>
                                                    <h4>
                                                        {docData?.specialities.map((data, _) => {
                                                            return data.title + (docData?.specialities?.length - 1 !== _ ? "," : "");
                                                        })}
                                                    </h4>
                                                    <div className="mt-4 mb-4">
                                                        <a href={`${basePath}/book-an-appointment/?doctor=${docData?.salutation ? docData?.salutation + " " : ""
                                                            }${docData?.name}&location=${docData?.locations?.[0]?.slug === "generic"
                                                                ? docData?.locations?.[1]?.slug
                                                                : docData?.locations?.[0]?.slug
                                                            }&hospital=${docData?.hospitals?.[0]?.slug}&speciality=${docData?.specialities?.[0]?.slug}`} className="hospital-primarybtn ">{staticText['Book An Appointment']}</a>
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <img src={docData.doctorImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + docData.doctorImage?.url : "/img/no-image.jpg"} alt={docData?.name} className="img-fluid" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </section>

                    <section className="section blog-details-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <div className="main-heading sub-heading">
                                        <h2 className="mb-1">{data.title}</h2>
                                        <div className='main-list'
                                            dangerouslySetInnerHTML={{ __html: marked(data?.details || "") || "" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="association-form-card">
                                        <Form1 title={"GET A CALLBACK FROM OUR HEALTH ADVISOR"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"> </div>
                    <BlogCarousel dataSet={blogDataSet} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BlogDetails;
