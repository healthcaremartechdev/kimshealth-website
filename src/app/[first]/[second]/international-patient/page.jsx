import BlogCarousel from '@/components/BlogCarousel'
import Footer from '@/components/Footer'
import DocTalk from '@/components/DocTalk'
import Header from '@/components/Header'
import TestimonialSection from '@/components/TestimonialSection'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent'
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import { marked } from 'marked'
import WatchVideoButton from '@/components/WatchVideoButton'
import getSpecialityData from '@/app/lib/getSpeciality'
import ExcellenceCarousel from '@/components/ExcellenceCarousel'
import testimonialData from '@/app/lib/getTestimonial'
import blogData from '@/app/lib/getBlog'
import doctorTalkData from '@/app/lib/getDoctorTalk';
import diseaseData from '@/app/lib/getDisease'
import procedureData from '@/app/lib/getProcedure'
import getStaticText from '@/app/lib/getStaticTextServer'
import Breadcrumb from '@/components/Breadcrumb'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'
import FormInternational from '@/components/Forms/FormInternational'
import FormInternationalMiddle from '@/components/Forms/FormInternationalMiddle'



const InternationalPage = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection&populate[5]=pageContent.highlightButtonItem&populate[6]=pageContent.highlightButtonItem.iconImage&populate[7]=pageContent.logoSlider&populate[8]=pageContent.logoSlider.image&populate[9]=pageContent.uspItem&populate[10]=pageContent.uspItem.image&populate[11]=pageContent.uspItem.icon&populate[12]=pageContent.contentCard&populate[13]=pageContent.contentCard.image&populate[14]=pageContent.thumbnail&populate[15]=pageContent.file&populate[16]=pageContent.faqData";
    const data = await getStaticPageContent("international-patient", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const featuredDisease = await diseaseData.getFeturedDisease({ langLoc: getLangLoc })
    const featuredProcedure = await procedureData.getFeturedProcedure({ langLoc: getLangLoc });
    const staticText = await getStaticText();


    const specialityDataSet = {
        sectionTitle: pageContent[5]?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/speciality"}`,
        data: await getSpecialityData.getAllFeatured({ langLoc: getLangLoc }),
        baseUrl: basePath
    };

    const testimonialDataSet = {
        sectionTitle: pageContent[11]?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/testimonial"}`,
        data: await testimonialData.getFeaturedAll({ langLoc: getLangLoc }),
        baseUrl: basePath
    }

    const blogDataSet = {
        sectionTitle: pageContent[13]?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/blog"}`,
        data: await blogData.getRecentBlog({ langLoc: getLangLoc }),
        baseUrl: basePath
    }

    const docTalkDataSet = {
        sectionTitle: pageContent[12]?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/doctor-talk"}`,
        data: await doctorTalkData.getFeaturedAll({ langLoc: getLangLoc }),
        baseUrl: basePath
    }

    console.log(pageContent)

    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="internation-patients-main-page">

                    <section className="section details-page-before py-0 d-none">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">

                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <Breadcrumb
                                                            activeTitle={pageContent[0]?.title}
                                                            middleTitle={''}
                                                            middleURL={""}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3>{pageContent[0].title}</h3>
                                                    <p>{pageContent[0].subTitle}</p>
                                                    <div className="rounded-field-form mb-3">
                                                        <FormInternational />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={pageContent[1].bannerItem?.length > 0 ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1].bannerItem[0].bannerImageDesktop?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={pageContent[0].title} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                    <section className="section details-page-before py-0 d-md-block d-none">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">


                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <ul className="breadcrumb mb-0">
                                                            <li>
                                                                <a href={basePath + "/"}>{staticText['Home']}</a>
                                                            </li>
                                                            <li className="active"> {pageContent[0].title} </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3>{pageContent[0].title}</h3>
                                                    <p>{pageContent[0].subTitle}</p>
                                                    <div className="rounded-field-form mb-3">
                                                        <FormInternational />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={pageContent[1].bannerItem?.length > 0 ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1].bannerItem[0].bannerImageDesktop?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </section>


                    <section className="section details-page-before py-0 d-md-none d-block">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container pe-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <ul className="breadcrumb mb-0">
                                                            <li>
                                                                <a href={basePath + "/"}>{staticText['Home']}</a>
                                                            </li>
                                                            <li className="active"> {pageContent[0].title} </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-proceduce-banner-right-col">
                                                <img src={pageContent[1].bannerItem?.length > 0 ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1].bannerItem[0].bannerImageDesktop?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt="" />
                                            </div>

                                        </div>
                                    </div>


                                    <div className="col-md-6">



                                        <div className="details-banner">
                                            <div className="details-heading">
                                                <h3>{pageContent[0].title}</h3>
                                                <p>{pageContent[0].subTitle}</p>
                                                <div className="rounded-field-form mb-3">
                                                    <form action="">
                                                        <div className="row">
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <div className="input-group">
                                                                    <input type="text" className="form-control"
                                                                        placeholder="Enter Your Name" name="search" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <div className="input-group">
                                                                    <input type="text" id="phone" defaultValue="+91"
                                                                        className="form-control" placeholder="Enter Mobile Number"
                                                                        name="search" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <button className="form-btn w-auto px-5">Submit</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 my-auto order-lg-1 order-2">
                                    <div className="details-right-col text-center">
                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[2].thumbnail?.url} alt={pageContent[2].caption} className="img-fluid w-100" />
                                        <h5>{pageContent[2].caption}</h5>
                                        <p>{pageContent[2].shortDetails}</p>
                                        <div className="main-btn">
                                            <WatchVideoButton txt={"Watch Video"} id={pageContent[2].videoId} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-7 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                    <div className="main-heading">
                                        <h2 className="mb-lg-1 mb-1">{pageContent[2].title}</h2>
                                        <h3 className="mb-lg-3 mb-3">{pageContent[2].subTitle}</h3>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: marked(pageContent[2].details || "") || "" }}></div>

                                    <div className="row justify-content-center internation-right-logo">

                                        {
                                            pageContent[3]?.logoSlider?.map((logo, i) => {
                                                return <div className="col-md-2 col-4 mb-2" key={i}>
                                                    <div className="internation-logo-box">
                                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + logo?.image?.url} alt={logo.title} className="img-fluid" />
                                                    </div>
                                                </div>
                                            })
                                        }

                                    </div>

                                    {/* <!-- <div className="details-counter-section">
                            <div className="row">
                                <div className="col-md-3 col-6 mb-lg-0 mb-3">
                                    <div className="details-counter-box">
                                        <h2><span className="counter">100</span> <span>+</span></h2>
                                        <p>Beds Facility</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mb-lg-0 mb-3">
                                    <div className="details-counter-box">
                                        <h2><span className="counter">100</span> <span>+</span></h2>
                                        <p>Doctors</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mb-lg-0 mb-3">
                                    <div className="details-counter-box">
                                        <h2><span className="counter">100</span> <span>+</span></h2>
                                        <p>Specialities </p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 mb-lg-0 mb-3">
                                    <div className="details-counter-box">
                                        <h2><span className="counter">100</span> <span>+</span></h2>
                                        <p>Trained Staff</p>
                                    </div>
                                </div>
                            </div>
                        </div> --> */}
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="section international-counter-section">
                        <div className="container">
                            <div className="row">
                                {
                                    pageContent[4].uspItem.map((u, i) => {
                                        return <div className="col-md-3 col-6 mb-3" key={i}>
                                            <div className="international-counter-box text-lg-start text-center">
                                                <h2><span className="counter">{u.number}</span> <span>{u.suffix}</span></h2>
                                                <div className="international-counter-bottom-content">
                                                    <div>
                                                        <img src={u.icon?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + u.icon?.url : "no-image.jpg"} alt="" className="img-fluid" />
                                                    </div>
                                                    <div>
                                                        <h3>{u.title}</h3>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </section>


                    <ExcellenceCarousel dataSet={specialityDataSet} />

                    <div className="line-divider"></div>
                    {pageContent[6].title ? <section className="section d-lg-block d-none">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{pageContent[6].title}</h2>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-md-6">
                                    <div className="faq-card p-4">
                                        <div className="accordion" id="accordionExample">
                                            {
                                                featuredDisease?.map((fd, i) => {
                                                    return <div className="accordion-item" key={i}>
                                                        <h2 className="accordion-header">
                                                            <button className={`accordion-button ${i === 0 ? "" : 'collapsed'}`} type="button" data-bs-toggle="collapse"
                                                                data-bs-target={"#collapse" + i} aria-expanded="true" aria-controls={"collapse" + i}>
                                                                <span>{fd.title}</span>
                                                            </button>
                                                        </h2>
                                                        <div id={"collapse" + i} className={`accordion-collapse collapse ${i === 0 ? "show" : ''}`}
                                                            data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {fd?.overviewSection?.details}
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-6 mt-lg-0 mt-4">
                                    <div className="faq-card p-4">
                                        <div className="accordion" id="accordionExample2">
                                            {
                                                featuredProcedure.map((fp, i) => {
                                                    // let i = i+1;
                                                    return <div className="accordion-item" key={i}>
                                                        <h2 className="accordion-header">
                                                            <button className={`accordion-button ${i === 0 ? "" : 'collapsed'}`} type="button" data-bs-toggle="collapse"
                                                                data-bs-target={"#collapse" + i + "1"} aria-expanded="true" aria-controls={"collapse" + i + "1"}>
                                                                <span>{fp.title}</span>
                                                            </button>
                                                        </h2>
                                                        <div id={"collapse" + i + "1"} className={`accordion-collapse collapse ${i === 0 ? "show" : ''}`}
                                                            data-bs-parent="#accordionExample2">
                                                            <div className="accordion-body">
                                                                {fp.overviewSection.details}
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : null}

                    {pageContent[6].title ? <section className="section d-lg-none d-block">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{pageContent[6].title}</h2>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-md-6">
                                    <div className="faq-card p-4">
                                        <div className="accordion" id="accordionExample">
                                            {
                                                featuredDisease.map((fd, i) => {
                                                    return <div className="accordion-item" key={i}>
                                                        <h2 className="accordion-header">
                                                            <button className={`accordion-button ${i === 0 ? "" : 'collapsed'}`} type="button" data-bs-toggle="collapse"
                                                                data-bs-target={"#collapse" + i} aria-expanded="true" aria-controls={"collapse" + i}>
                                                                <span>{fd.title}</span>
                                                            </button>
                                                        </h2>
                                                        <div id={"collapse" + i} className={`accordion-collapse collapse ${i === 0 ? "show" : ''}`}
                                                            data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {fd?.overviewSection?.details}
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-6 mt-lg-0 mt-4">
                                    <div className="faq-card p-4">
                                        <div className="accordion" id="accordionExample2">
                                            {
                                                featuredProcedure.map((fp, i) => {
                                                    // let i = i+1;
                                                    return <div className="accordion-item" key={i}>
                                                        <h2 className="accordion-header">
                                                            <button className={`accordion-button ${i === 0 ? "" : 'collapsed'}`} type="button" data-bs-toggle="collapse"
                                                                data-bs-target={"#collapse" + i + "1"} aria-expanded="true" aria-controls={"collapse" + i + "1"}>
                                                                <span>{fp.title}</span>
                                                            </button>
                                                        </h2>
                                                        <div id={"collapse" + i + "1"} className={`accordion-collapse collapse ${i === 0 ? "show" : ''}`}
                                                            data-bs-parent="#accordionExample2">
                                                            <div className="accordion-body">
                                                                {fp.overviewSection.details}
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : null}

                    <div className="line-divider"></div>
                    <section className="section logo-slider-section">
                        <div className="container-fluid">
                            <div className="heading-container">
                                <div className="row justify-content-between">
                                    <div className="col-md-8 col-6">
                                        <div className="main-heading">
                                            <h2>{pageContent[7].title} </h2>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-2 col-4">
                                        <div className="over-all-btn text-end">

                                            <a download target='_blank' href={process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[7].file?.url} >{pageContent[7].buttonText} <span><img src="/img/slider-right-arrow.svg" className="img-fluid" alt="" /></span></a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div id="exampleSlider">
                                <div className="MS-content">
                                    {
                                        pageContent[8].logoSlider.map((l, i) => {
                                            return <div className="item slider-item text-center py-0" key={i}>
                                                <div className="slider-box">
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + l?.image?.url} width="90" alt={l.title} />
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="rounded-field-form mt-4">

                                        <FormInternationalMiddle />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{pageContent[9].title}</h2>
                            </div>
                            <div className="row">
                                {
                                    pageContent[10].contentCard.map((c, i) => {
                                        return <div className="col-md-4" key={i}>
                                            <div className="home-service-card">
                                                <div className="home-service-card-image text-center">
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + c?.image?.url} alt="" className="img-fluid d-block" />
                                                </div>
                                                <div className="home-service-content text-start">
                                                    <h3>{c.title}</h3>
                                                    <div className='main-list' dangerouslySetInnerHTML={{ __html: marked(c.details || "") || "" }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"></div>
                    <TestimonialSection dataSet={testimonialDataSet} />

                    <div className="line-divider"></div>
                    <DocTalk dataSet={docTalkDataSet} />

                    <div className="line-divider"></div>
                    <BlogCarousel dataSet={blogDataSet} />


                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[14]?.title}</h2>
                            </div>

                            <div className="faq-card p-4">
                                <div className="accordion" id="accordionExample">
                                    {
                                        pageContent[14]?.faqData?.map((data, index) => {
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

export default InternationalPage;
