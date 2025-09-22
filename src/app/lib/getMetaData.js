import { headers } from "next/headers";
import { getStaticPageContent } from "./getStaticPageContent";
import getCurrentLangLoc from "./getCurrentLangLoc";
import doctorData from './getDoctor'
import blogData from "./getBlog";
import homeServices from "./getHomeServices";
import jobData from "./getJob";
import investorData from "./getInvestor";
import courseData from "./getCourse";
import diseaseData from "./getDisease";
import doctorTalkData from "./getDoctorTalk";
import getHealthPackageData from "./getHealthPackage";
import hospitalData from "./getHospital";
import leaderData from "./getLeader";
import mediaData from "./getMediaEvent";
import mediaCoverData from "./getMediaCoverage";
import procedureData from "./getProcedure";
import getSpecialityData from "./getSpeciality";
import testimonialData from "./getTestimonial";
import locationData from "./getLocationData";



const getMetadata = async () => {
    const langLoc = await getCurrentLangLoc();
    const headerList = await headers();
    const metaPage = headerList.get("x-meta-page");
    const parts = metaPage.split("/").filter(Boolean);
    const lastIndex = parts.length - 1;
    let metaData;


    if (metaPage.includes("/doctor") && parts[parts.indexOf("doctor") + 1]) {
        const data = await doctorData.getSingleDoctor({
            slug: parts[parts.indexOf("doctor") + 1], langLoc: langLoc, isMeta: true
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/blog") && parts[parts.indexOf("blog") + 1]) {
        const data = await blogData.getSingleBlog({
            slug: parts[parts.indexOf("blog") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/at-home-services") && parts[parts.indexOf("at-home-services") + 1]) {
        const data = await homeServices.getSingleHomeService({
            slug: parts[parts.indexOf("at-home-services") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/career") && parts[parts.indexOf("career") + 1]) {
        const data = await jobData.getSingleJob({
            slug: parts[parts.indexOf("career") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/corporate") && parts[parts.indexOf("corporate") + 1]) {
        const data = await investorData.getSingleInvestor({
            slug: parts[parts.indexOf("corporate") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/course") && parts[parts.indexOf("course") + 1]) {
        const data = await courseData.getSingleCourse({
            slug: parts[parts.indexOf("course") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/disease") && parts[parts.indexOf("disease") + 1]) {
        const data = await diseaseData.getSingleDisease({
            slug: parts[parts.indexOf("disease") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/doctor") && parts[parts.indexOf("doctor") + 1]) {
        const data = await doctorData.getSingleDoctor({
            slug: parts[parts.indexOf("doctor") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/doctor-talk") && parts[parts.indexOf("doctor-talk") + 1]) {
        const data = await doctorTalkData.getSingleDoctor({
            slug: parts[parts.indexOf("doctor-talk") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/health-package") && parts[parts.indexOf("health-package") + 1]) {
        const data = await getHealthPackageData.getSingleHealthPackage({
            slug: parts[parts.indexOf("health-package") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/hospital") && parts[parts.indexOf("hospital") + 1]) {
        const data = await hospitalData.getSingleHospital({
            slug: parts[parts.indexOf("hospital") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/leadership") && parts[parts.indexOf("leadership") + 1]) {
        const data = await leaderData.getSingleLeader({
            slug: parts[parts.indexOf("leadership") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/media-and-events") && parts[parts.indexOf("media-and-events") + 1]) {
        const data = await mediaData.getSingleMedia({
            slug: parts[parts.indexOf("media-and-events") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/media-coverage") && parts[parts.indexOf("media-coverage") + 1]) {
        const data = await mediaCoverData.getSingleMedia({
            slug: parts[parts.indexOf("media-coverage") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/procedure") && parts[parts.indexOf("procedure") + 1]) {
        const data = await procedureData.getSingleProcedure({
            slug: parts[parts.indexOf("procedure") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/speciality") && parts[parts.indexOf("speciality") + 1]) {

        const data = await getSpecialityData.getSingleSpeciality({
            slug: parts[parts.indexOf("speciality") + 1], langLoc: langLoc, isMeta: true
        });
        metaData = data?.metaSection;
    }
    else if (metaPage.includes("/testimonial") && parts[parts.indexOf("testimonial") + 1]) {
        const data = await testimonialData.getSingleTestimonaial({
            slug: parts[parts.indexOf("testimonial") + 1], langLoc: langLoc
        });
        metaData = data?.metaSection;
    }
    else if (parts[lastIndex]===langLoc.loc.slug) {
        const data = await locationData.getSingleLocation({
            slug: parts[lastIndex]
        });
        metaData = data?.metaSection;
    }
    else {
        const data = await getStaticPageContent(parts[lastIndex], "", true, true, true);
        metaData = data?.data[0]?.metaSection;
    }

    
    const data = await locationData.getSingleLocation({
        slug: langLoc.loc.slug
    });
    const metaDefaultData = data?.metaSection;
    const analyticsCode = data?.analyticsCode;

    return { metaData, metaDefaultData, analyticsCode };

}

export default getMetadata;

