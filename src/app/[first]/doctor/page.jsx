import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import doctorData from '@/app/lib/getDoctor';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getStaticText from '@/app/lib/getStaticTextServer';
import DoctorListing from '@/components/DoctorListing';
import langLoc from '@/helper/getLangLoc';
import getSpecialityData from '@/app/lib/getSpeciality';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import hospitalData from '@/app/lib/getHospital';



const Doctor = async ({ searchParams }) => {
    const URLParams = await searchParams;
    const getLangLoc = await getCurrentLangLoc()
    const baseURL = await getBaseUrl(true, true);
    const data = await getStaticPageContent("doctor");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();

    const allLocation = await langLoc.getLocationsOnlyCMS()
    const allHospital=await hospitalData.getAllHospitalAndMedicalCenter()
    const allSpeciality = await getSpecialityData.getSpecialityAllParent({langLoc: getLangLoc})
    const allDoctorCount = await doctorData.allDoctorCount({langLoc: getLangLoc, URLParams:URLParams});



    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="find-doctor-main-page">
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

                    <DoctorListing
                        allDoctorCount={allDoctorCount}
                        allLocation={allLocation}
                        allHospital={allHospital}
                        allSpeciality={allSpeciality}
                        baseURL={baseURL}
                        langLoc={getLangLoc}
                        URLParams={URLParams}
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Doctor