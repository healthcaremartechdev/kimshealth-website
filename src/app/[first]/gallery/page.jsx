import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { marked } from 'marked';
import awardData from '@/app/lib/getAward';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import GalleryViewer from '@/components/GalleryViewer';
import GalleryCarousel from '@/components/GalleryCarousel';
import galleryData from "@/app/lib/getGallery";



const Gallery = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection";
    const data = await getStaticPageContent("gallery", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();


    let allGallery = await galleryData.getAll({ langLoc: getLangLoc });


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="about-us-main-page">

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
                                        middleTitle={""}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <GalleryViewer allGallery={allGallery} pageContent={pageContent} />


                </div>
            </div>
            <Footer />
        </>
    )
}

export default Gallery