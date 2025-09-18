import BlogCarousel from '@/components/BlogCarousel'
import ExcellenceCarousel from '@/components/ExcellenceCarousel'
import ExpertCarousel from '@/components/ExpertCarousel'
import Footer from '@/components/Footer'
import DocTalk from '@/components/DocTalk'
import Header from '@/components/Header'
import SocialMedia from '@/components/SocialMedia'
import TestimonialSection from '@/components/TestimonialSection'
import WallframeSection from '@/components/WallframeSection'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent'
import doctorData from '@/app/lib/getDoctor'
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import blogData from '@/app/lib/getBlog';
import testimonialData from '@/app/lib/getTestimonial'
import getSpecialityData from '@/app/lib/getSpeciality'
import getAwardData from '@/app/lib/getAward'
import doctorTalkData from '@/app/lib/getDoctorTalk'
import hospitalData from '@/app/lib/getHospital'
import BookAnAppoinmentShort from '@/components/Forms/BookAnAppoinmentShort'
import getCurrentLangLoc from './lib/getCurrentLangLoc';
import TabHome from '@/components/TabHome'
import galleryData from './lib/getGallery'
import mediaCoverData from './lib/getMediaCoverage'
import mediaData from './lib/getMediaEvent'



const Home = async () => {
  const getLangLoc = await getCurrentLangLoc()
  const basePath = await getBaseUrl(true, true);
  const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection&populate[5]=pageContent.highlightButtonItem&populate[6]=pageContent.highlightButtonItem.iconImage&populate[7]=pageContent.uspItem&populate[8]=pageContent.uspItem.image&populate[9]=pageContent.uspItem.icon";
  const data = await getStaticPageContent("home", field);
  const pageContent = data?.data[0]?.pageContent;
  const pageMeta = data?.data[0]?.metaSection;


  const specialityDataSet = {
    sectionTitle: pageContent[2]?.title,
    buttonText: 'View All', buttonURL: `${basePath + "/speciality"}`,
    data: await getSpecialityData.getAllFeatured({ langLoc: getLangLoc }),
    baseUrl: basePath
  };

  const expertDataSet = {
    sectionTitle: pageContent[3]?.title,
    buttonText: 'View All', buttonURL: `${basePath + "/doctor"}`,
    data: await doctorData.getFeturedDoctor({ langLoc: getLangLoc }),
    baseUrl: basePath
  };

  const awardDataSet = {
    sectionTitle: pageContent[4]?.title,
    buttonText: 'View All', buttonURL: `${basePath}`,
    data: await getAwardData.getFeatured({ langLoc: getLangLoc }),
    baseUrl: basePath
  };

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

  const docTalkDataSet = {
    sectionTitle: pageContent[7]?.title,
    buttonText: 'View All', buttonURL: `${basePath + "/doctor-talk"}`,
    data: await doctorTalkData.getFeaturedAll({ langLoc: getLangLoc }),
    baseUrl: basePath
  }

  const galleryDataSet = {
    sectionTitle: "Gallery",
    buttonText: 'View All', buttonURL: `${basePath + "/gallery"}`,
    data: await galleryData.getGalleryImage({ langLoc: getLangLoc }),
    baseUrl: basePath
  }

  const mediaEventDataSet = {
    sectionTitle: "Media & Events",
    buttonText: 'View All', buttonURL: `${basePath + "/media-and-events"}`,
    data: await mediaData.getRecentMedia({ langLoc: getLangLoc }),
    baseUrl: basePath
  }

  const mediaCoverageDataSet = {
    sectionTitle: "News",
    buttonText: 'View All', buttonURL: `${basePath + "/media-coverage"}`,
    data: await mediaCoverData.getRecentMedia({ langLoc: getLangLoc }),
    baseUrl: basePath
  }



  return (
    <>
      <Header />
      <div role="main" className="main">
        <section className="d-lg-block d-none">
          <div className="container-wrapper">
            <div className="owl-carousel owl-theme homepage-slider">
              {
                pageContent[0]?.bannerItem.map((banner, index) => {
                  return <div className="item" key={index}>
                    <a href={banner.hyperlink}>
                      <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${banner.bannerImageDesktop.url}`}
                        className="img-fluid" alt={banner.title} />
                    </a>
                  </div>
                })
              }
            </div>
          </div>
        </section>
        <section className="d-lg-none d-block">
          <div className="container-wrapper">
            <div className="owl-carousel owl-theme homepage-slider">
              {
                pageContent[0]?.bannerItem.map((banner, index) => {
                  return <div className="item" key={index}>
                    <a href={banner.hyperlink}>
                      <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${banner.bannerImageMobile.url}`}
                        className="img-fluid" alt={banner.title} />
                    </a>
                  </div>
                })
              }
            </div>
          </div>
        </section>

        {/* <!-- ======= homepage start ========== --> */}


        {/* <!--=========== fromsection end =======--> */}
        {/* <section className="section py-0 d-lg-block d-none">
          <div className="container-fluid ps-0">
            <div className="row">
              <div className="cta-col ctn-left-col">
                <div className="cta-diff">
                  <h3>{pageContent[1].title} <i className="icon-arrow-right"></i></h3>
                </div>
              </div>
              {

                pageContent[1].highlightButtonItem.map((h, index) => {
                  return <div className="cta-col" key={index}>
                    <a href={basePath + h.hyperlink}>
                      <div className="cta-diff">
                        <div className="d-flex align-items-center justify-content-center">
                          <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${h.iconImage?.url}`} alt={h.title} />
                          <h3>{h.title} <br /> <span>{h.subTitle}</span></h3>
                        </div>
                      </div>
                    </a>
                  </div>
                })

              }

            </div>
          </div>
        </section> */}
        <section className="section py-0 d-lg-block d-none">
          <div className="container-fluid ps-0">
            <div className="row">
              {/* <div className="cta-col ctn-left-col">
                <div className="cta-diff">
                  <h3>I am here to <i className="icon-arrow-right"></i></h3>
                </div>
              </div> */}
              <div className="cta-col">
                <a href={basePath + "/doctor"}>
                  <div className="cta-diff">
                    <div className="d-flex align-items-center justify-content-center">
                      <img src="/img/doctor.png" alt="" />
                      <h3>Find a <br /> <span>Doctor</span></h3>
                    </div>
                  </div>
                </a>
              </div>
              <div className="cta-col">
                <a href={basePath + "/book-an-appointment"}>
                  <div className="cta-diff">
                    <div className="d-flex align-items-center justify-content-center">
                      <img src="/img/appointment.png" alt="" />
                      <h3>Book an <br /> <span>Appointment</span></h3>
                    </div>
                  </div>
                </a>
              </div>
              <div className="cta-col">
                <a href={"https://healthcheckup.kimshealthcare.com/p/kims-trivandrum-1/"} target='_blank'>
                  <div className="cta-diff">
                    <div className="d-flex align-items-center justify-content-center">
                      <img src="/img/health.png" alt="" />
                      <h3>Book a <br /> <span>Health Checkup</span></h3>
                    </div>
                  </div>
                </a>
              </div>
              {/* <div className="cta-col">
                <a href={basePath + "/second-opinion"}>
                  <div className="cta-diff">
                    <div className="d-flex align-items-center justify-content-center">
                      <img src="/img/opinion.png" alt="" />
                      <h3>Get <br /> <span>Second Opinion</span></h3>
                    </div>
                  </div>
                </a>
              </div> */}
              <div className="cta-col">
                <a target='_blank' href={"https://consult.bestdocapp.com/home/KIMSTVM?version=new"}>
                  <div className="cta-diff">
                    <div className="d-flex align-items-center justify-content-center">
                      <img src="/img/opinion.png" alt="" />
                      <h3>Get <br /> <span>Tele Medicine</span></h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section pt-lg-0 pt-2 pb-2 d-lg-none d-block" data-aos="fade-up">
          <div className="container-fluid ps-0">
            <div className="row">
              <div className="cta-col ctn-left-col">
                <a href={basePath + "/book-an-appointment"}>
                  <div className="cta-diff">
                    <div className="d-flex align-items-center justify-content-center">
                      <img src="/img/appointment-mb.png" alt="" />
                      <h3>Book an <br /> Appointment</h3>
                    </div>
                  </div>
                </a>
              </div>
              <div className="cta-col">
                <a href={basePath + "/doctor"}>
                  <div className="cta-diff">
                    <div className="d-flex align-items-center justify-content-center">
                      <img src="/img/doctor.png" alt="" />
                      <h3>Find a <br /> <span>Doctor</span></h3>
                    </div>
                  </div>
                </a>
              </div>
              <div className="cta-col">
                <a href={"https://healthcheckup.kimshealthcare.com/p/kims-trivandrum-1/"}>
                  <div className="cta-diff">
                    <div className="d-flex align-items-center justify-content-center">
                      <img src="/img/opinion.png" alt="" />
                      <h3>Health <br /> <span> Check-up</span></h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- ====== cta section ==== --> */}

        <BookAnAppoinmentShort basePath={basePath} extraClass={"pt-5 pb-0"} />

        <ExcellenceCarousel dataSet={specialityDataSet} />



        <div className="line-divider"> </div>

        <ExpertCarousel dataSet={expertDataSet} /> 

        <section className="section international-counter-section">
          <div className="container">
            <div className="row">
              {
                pageContent[9].uspItem.map((u, i) => {
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

        {/* <div className="line-divider"> </div> */}

        <WallframeSection dataSet={awardDataSet} />

        <div className="line-divider"></div>
        <TestimonialSection dataSet={testimonialDataSet} />


        {/*::::: Tab ::::  */}
        <TabHome blogDataSet={blogDataSet} galleryDataSet={galleryDataSet} mediaEventDataSet={mediaEventDataSet} mediaCoverageDataSet={mediaCoverageDataSet} />

        {/* <div className="line-divider"></div>
        <BlogCarousel dataSet={blogDataSet} /> */}


        <div className="line-divider"></div>

        <DocTalk dataSet={docTalkDataSet} />

        <SocialMedia />

      </div>

      <Footer />
    </>
  )
}

export default Home;
