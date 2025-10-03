import Footer from '@/components/Footer'
import Header from '@/components/Header';
import React from 'react'
import getStaticText from '@/app/lib/getStaticTextServer';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import diseaseData from '@/app/lib/getDisease';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import DiseaseListing from '@/components/DiseaseListing';
import getSpecialityData from '@/app/lib/getSpeciality';

const Disease = async ({ searchParams }) => {
    const URLParams = await searchParams;
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText();
    const basePath = await getBaseUrl(true, true);
    const baseUrlOnlyLang = await getBaseUrl(true, false);
    const data = await getStaticPageContent("disease");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;

    const getAllDisease = await diseaseData.getAll({ langLoc: getLangLoc, URLParams: URLParams });
    const allSpeciality = await getSpecialityData.getAllBaseSpeciality()



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
                                <Breadcrumb
                                    activeTitle={pageContent[0]?.title}
                                    middleTitle={''}
                                    middleURL={""}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section pt-lg-4 pt-0">
                    <div className="container">
                        <div className="row">
                            <DiseaseListing
                                allDisease={getAllDisease}
                                baseUrlOnlyLang={baseUrlOnlyLang}
                                allSpeciality={allSpeciality}
                                URLParams={URLParams}
                            />

                            <div className="col-md-3">
                                <a href={baseUrlOnlyLang + "/" + pageContent[1].card1Hyperlink}>
                                    <div className="key-master-book-appointment-btn mb-1">
                                        <div className="key-master-book-appointment-content">
                                            <img src={pageContent[1]?.card1Icon?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1].card1Icon.url : "/img/doctor.svg"} alt="" className="img-fluid" />
                                            <h5> {pageContent[1].card1Title}</h5>
                                        </div>

                                    </div>
                                </a>

                                <a href={baseUrlOnlyLang + "/" + pageContent[1].card2Hyperlink}>
                                    <div className="key-master-book-appointment-btn mb-1">
                                        <div className="key-master-book-appointment-content">
                                            <img src={pageContent[1]?.card2Icon?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1].card2Icon.url : "/img/calender.svg"} alt="" className="img-fluid" />
                                            <h5>{pageContent[1].card2Title}</h5>
                                        </div>
                                    </div>
                                </a>

                                <a href={baseUrlOnlyLang + "/" + pageContent[1].card3Hyperlink}>
                                    <div className="key-master-help-btn">
                                        <div className="key-master-book-appointment-content">
                                            <h5>{pageContent[1].card3Title}</h5>
                                        </div>

                                    </div>
                                </a>
                                <a href={`tel:${pageContent[1].card4Contact}`}>
                                    <div className="key-master-call-btn">
                                        <div className="key-master-book-appointment-content text-center">
                                            <h5>{pageContent[1].card4Title}</h5>
                                            <h4><i className="fa-solid fa-phone"></i> {pageContent[1].card4Contact}</h4>
                                        </div>

                                    </div>
                                </a>
                            </div>

                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}

export default Disease;