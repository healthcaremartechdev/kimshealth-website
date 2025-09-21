import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getSpecialityData from '@/app/lib/getSpeciality';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import Popup from '@/components/Popup';


const Speciality = async ({ searchParams }) => {
    const URLParams = await searchParams;
    const getLangLoc = await getCurrentLangLoc()
    const baseURL = await getBaseUrl(true, true);
    const baseUrlOnlyLang = await getBaseUrl(true, false);
    const data = await getStaticPageContent("speciality");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText()


    const allSpecility = await getSpecialityData.getSpecialityAllParent({
        langLoc: getLangLoc, URLParams: URLParams
    });


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="page-header">
                    <div className="container">
                        <h2>{pageContent[0]?.title}</h2>
                    </div>
                </div>
                <section className="breadcrumb-wrapper py-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <Breadcrumb activeTitle={pageContent[0]?.title} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section pt-lg-4 pt-0 ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 mb-3">
                                {/* <div className="speciality-masterpage-card">
                                    <div className="main-heading">
                                        <h2> {pageContent[1]?.title}</h2>
                                    </div>
                                    <div className="row">
                                        {
                                            coeSpecility?.map((cs, index) => {
                                                return <div className="col-md-6" key={index}>
                                                    <div className="speciality-masterpage-card-content">
                                                        <a href={baseURL + "/speciality/" + cs.speciality?.slug}>
                                                            <span><img src={cs.speciality?.iconImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + cs.speciality?.iconImage.url : "/img/no-image.jpg"} alt={cs?.title} className="img-fluid" /></span> {cs.title}
                                                        </a>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div> */}
                                <div className="speciality-masterpage-card mt-3">
                                    <div className="main-heading">
                                        <h2>{pageContent[2]?.title}</h2>
                                    </div>
                                    <div className='row'>
                                        {
                                            allSpecility?.map((os, index) => {
                                                return <div className="col-md-6" key={index}>
                                                    <div className="speciality-masterpage-card-content">
                                                        <a
                                                            {...(os?.manageAppearance?.viewingMode === "Popup"
                                                                ? {
                                                                    href: "#",
                                                                    "data-bs-toggle": "modal",
                                                                    "data-bs-target": `#popupModalSubSpeciality-${os?.speciality?.slug}`,
                                                                }
                                                                : {
                                                                    href: `${baseURL}/speciality/${os?.speciality?.slug}${URLParams.hospital ? `?hospital=${URLParams.hospital}` : ""
                                                                        }`,
                                                                })}
                                                        >
                                                            <span><img src={os.speciality?.iconImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + os.speciality?.iconImage.url : "/img/no-image.jpg"} alt={os?.title} className="img-fluid" /></span> {os.title}
                                                        </a>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* <TreamentSidebar
                                baseUrlOnlyLang={baseUrlOnlyLang}
                                title={pageContent[3]?.title} 
                                procedures={procedures}
                                allSpeciality={allSpeciality}
                            /> */}

                            <div className="col-md-3">
                                <div className='association-left-col sticky-from'>
                                    <a href={baseURL + "/" + pageContent[3].card1Hyperlink}>
                                        <div className="key-master-book-appointment-btn mb-1">
                                            <div className="key-master-book-appointment-content">
                                                <img src={pageContent[3]?.card1Icon?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[3].card1Icon.url : "/img/doctor.svg"} alt="" className="img-fluid" />
                                                <h5> {pageContent[3].card1Title}</h5>
                                            </div>


                                        </div>
                                    </a>


                                    <a href={baseURL + "/" + pageContent[3].card2Hyperlink}>
                                        <div className="key-master-book-appointment-btn mb-1">
                                            <div className="key-master-book-appointment-content">
                                                <img src={pageContent[3]?.card2Icon?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[3].card2Icon.url : "/img/calender.svg"} alt="" className="img-fluid" />
                                                <h5>{pageContent[3].card2Title}</h5>
                                            </div>
                                        </div>
                                    </a>


                                    <a href={baseUrlOnlyLang + "/" + pageContent[3].card3Hyperlink}>
                                        <div className="key-master-help-btn">
                                            <div className="key-master-book-appointment-content">
                                                <h5>{pageContent[3].card3Title}</h5>
                                            </div>


                                        </div>
                                    </a>
                                    <a href={`tel:${pageContent[3].card4Contact}`}>
                                        <div className="key-master-call-btn">
                                            <div className="key-master-book-appointment-content text-center">
                                                <h5>{pageContent[3].card4Title}</h5>
                                                <h4><i className="fa-solid fa-phone text-white"></i> {pageContent[3].card4Contact}</h4>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            <Footer />

            {allSpecility?.map((subS, index) => (
                <Popup
                    key={index}
                    modalId={`popupModalSubSpeciality-${subS.speciality?.slug}`}
                    title={subS.title}
                    content={subS.overviewSection?.details}
                />
            ))}
        </>
    )
}

export default Speciality