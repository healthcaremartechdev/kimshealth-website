"use server"
import getStaticPageChecker from '@/app/lib/getStaticPageChecker';
import HederCorporate from './HeaderCorporate';
import HeaderUnit from './HederUnit';
import { cookies, headers } from 'next/headers';
import getStaticText from '@/app/lib/getStaticTextServer';
import hospitalData from '@/app/lib/getHospital';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import getSpecialityData from '@/app/lib/getSpeciality';
import locationData from '@/app/lib/getLocationData';


const Header = async ({ hospital, searchParams }) => {
  const URLParams = await searchParams;

  const selectedLangLoc = await getCurrentLangLoc();
  // cookies
  const cookieStore = await cookies();
  const langFromStorage = JSON.parse(cookieStore.get("systemLang")?.value || "{}");
  const locationFromStorage = JSON.parse(cookieStore.get("systemLocation")?.value || "{}");
  const staticPageChecker = await getStaticPageChecker();
  const staticTexts = await getStaticText()

  let speciality;

  if (URLParams?.hospital)
    hospital = URLParams.hospital;


  if (selectedLangLoc.loc.default)
    speciality = await getSpecialityData.getHeaderSpeciality({ LangLoc:selectedLangLoc })
  else {
    if (hospital)
      speciality = await getSpecialityData.getHeaderSpecialityByHospital({ LangLoc:selectedLangLoc, hospital });
    else
      speciality = await getSpecialityData.getHeaderUnitSpeciality({ LangLoc:selectedLangLoc });
  }


  const locationAllData = await locationData.getCurrentLocation();


  const allHospital = await hospitalData.getAllHospitalAndMedicalCenter();




  if (locationFromStorage.default === true) {
    return (
      <>
        <HederCorporate
          hospital={hospital}
          staticPageChecker={staticPageChecker}
          staticTexts={staticTexts} 
          allHospital={allHospital} 
          locationData={locationAllData} 
          selectedLangLoc={selectedLangLoc} 
          speciality={speciality}
        />
      </>
    );
  } else {
    return (
      <>
        <HeaderUnit
          hospital={hospital}
          staticPageChecker={staticPageChecker}
          staticTexts={staticTexts} 
          allHospital={allHospital} 
          locationData={locationAllData} 
          selectedLangLoc={selectedLangLoc} 
          speciality={speciality}
        />
      </>
    );
  }
};

export default Header;
