"use server"
import getStaticPageChecker from '@/app/lib/getStaticPageChecker';
import { cookies, headers } from 'next/headers';
import getStaticText from '@/app/lib/getStaticTextServer';
import hospitalData from '@/app/lib/getHospital';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import getSpecialityData from '@/app/lib/getSpeciality';
import locationData from '@/app/lib/getLocationData';
import FooterAll from './FooterAll';


const Footer = async () => {

    const selectedLangLoc = await getCurrentLangLoc();
    // cookies
    const cookieStore = await cookies();
    const langFromStorage = JSON.parse(cookieStore.get("systemLang")?.value || "{}");
    const locationFromStorage = JSON.parse(cookieStore.get("systemLocation")?.value || "{}");
    const staticPageChecker = await getStaticPageChecker();
    const staticTexts = await getStaticText()

    const speciality = await getSpecialityData.getFooterSpeciality({ langLoc: selectedLangLoc });

    const locationAllData = await locationData.getCurrentLocation();

    const allHospital = await hospitalData.getFooterHospital();




    return (
        <>
            <FooterAll
                staticPageChecker={staticPageChecker}
                staticTexts={staticTexts}
                hospitals={allHospital}
                locationData={locationAllData}
                speciality={speciality}
            />
        </>
    );
};

export default Footer;
