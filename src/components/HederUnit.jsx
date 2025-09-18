"use client"
import React, { useEffect, useState } from 'react'
import langLoc from "@/helper/getLangLoc";
import { onLangChangeRedirection, } from "@/helper/onChageRedirection";
import Cookies from 'js-cookie';
import { getBaseUrl } from '@/helper/getBaseUrl';
import getLocation from '@/app/lib/getLocation';
import getSpecialityData from '@/app/lib/getSpeciality';
import hospitalData from '@/app/lib/getHospital';
import getStaticText from '@/helper/getStaticText';
import getCurrentLangLocClient from '@/helper/getCurrentLangLocClient';
import InternationalMenu from './InternationalMenu';
import SearchBox from './Forms/SearchBox';
import getStaticPage from '@/helper/staticPage';


const HeaderUnit = ({ hospital }) => {
  const [selectedLangLoc, setselectedLangLoc] = useState([]);
  const [allLanguages, setAllLanguage] = useState([]); // Store all language;
  const [allLocations, setAllLocations] = useState([]); // Store all locations;
  const [selectedLang, setSelectedLang] = useState(null);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [basePath, setBasePath] = useState();
  const [basePathOnlyLang, setBasePathOnlyLang] = useState();
  const [speciality, setSpeciality] = useState();
  const [locationData, setLocationData] = useState();
  const [allHospital, setAllHospital] = useState();
  const [activeIndex, setActiveIndex] = useState(null);
  const [staticTexts, setStaticTexts] = useState({});
  const [staticPageChecker, setPageChecker] = useState({});
  const [showSearch, setShowSearch] = useState(false); // FOR SEARCH TOGGLE
  const [activeLogoUrl, setLogoUrl] = useState();


  useEffect(() => {
    const fetchTexts = async () => {
      setStaticTexts({ ...await getStaticText() })

      setPageChecker({ ...await getStaticPage() })
    };

    fetchTexts();
  }, []);



  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };


  useEffect(() => {
    const get = async () => {
      const LangLoc = await getCurrentLangLocClient();
      // console.log(LangLoc, "in header");
      setselectedLangLoc(LangLoc);

      if (hospital)
        setSpeciality(await getSpecialityData.getHeaderSpecialityByHospital({ LangLoc, hospital }))
      else
        setSpeciality(await getSpecialityData.getHeaderSpeciality({ LangLoc }))

      setLocationData(await getLocation());


      setAllHospital(await hospitalData.getAllHospitalAndMedicalCenter());

    }
    get();

  }, [hospital])


  useEffect(() => {
    const getLang = async () => {
      const lang = await langLoc.getLanguages();
      setAllLanguage([...lang]);
    }

    const getLoc = async () => {
      const loc = await langLoc.getLocations(true);
      setAllLocations([...loc]);
    }

    getLang()
    getLoc()


    setSelectedLang(JSON.parse(Cookies.get("systemLang")))
    setSelectedLoc(JSON.parse(Cookies.get("systemLocation")))

    setBasePath(getBaseUrl(true, true));
    setBasePathOnlyLang(getBaseUrl(true, false));

  }, [])

  useEffect(() => {

    let logoURL = getBaseUrl(true, true);
    if (hospital)
      logoURL = logoURL + "/hospital/" + hospital;
    setLogoUrl(logoURL)

  }, [hospital])




  /********************************Google Translator*****************************/
  useEffect(() => {
    // Prevent adding script multiple times
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Define the init function only once
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (!document.querySelector(".goog-te-combo")) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en", // default language
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };
    }
  }, []);

  const handleChange = (e) => {
    const lang = e.target.value;
    if (lang) {
      const translateSelect = document.querySelector(".goog-te-combo");
      if (translateSelect && translateSelect.value !== lang) {
        translateSelect.value = lang;
        translateSelect.dispatchEvent(new Event("change"));
      }
    }
  };

  /********************************Google Translator*****************************/


  return (
    <>
      <header id="header-sticky" className="header">
        <section id="topheader" className="d-lg-block d-none">
          <div className="container d-flex align-items-center justify-content-between">
            <div className="navbar-logo py-2 ">
              <a href={activeLogoUrl}>
                <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${locationData?.logo?.url}`} alt="KIMSHEALTH" className="img-fluid" />
              </a>
            </div>
            <div className="header-contact d-flex align-items-center justify-content-center position-relative">
              <ul>
                <li><a href={`${basePath}/ambulance-services`}>{staticTexts['Call Ambulance']}</a></li>
                <li><a href={`${basePath}/about-us${hospital ? '?hospital=' + hospital : ''}`}>{staticTexts['About Us']}</a></li>
                <li><a href={`${basePath}/at-home-services`}>{staticTexts['Home Care']}</a></li>
                <li><a href={`${basePath}/second-opinion`}>{staticTexts['Second Opinion']}</a></li>
                {/* <li className="menu-item-has-children show-submenu">
                  <a href={`${basePath}/contact-us`}>{staticTexts['Contact Us']}</a>
                  <div className="sub-menu sub-menu-single">
                    <div className="sub-menu-details">
                      <ul>
                        <li>
                          <a href={"tel:" + locationData?.phone}><i className="fa-solid fa-phone"></i>   {locationData?.phone}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li> */}
                {/* <li><a href={"https://healthcheckup.kimshealthcare.com/p/kims-trivandrum-1/"} target='_blank'>{staticTexts['Health Checkup']}</a></li> */}
                <li><a href={locationData?.virtualTour ? locationData?.virtualTour : "#"} target='_blank'>
                  {staticTexts['360° Virtual Tour']}</a>
                </li>
              </ul>

              <div className="top-bar-icon d-flex align-items-center">
                <div className="whatapp-icon">
                  <a href={"https://wa.me/" + locationData?.whatsapp} target='_blank'> <img src="/img/whatsapp.svg" className="img-fluid" alt="" /></a>
                </div>

                <div className="search-icon ms-3 me-2 rounded-field-form">
                  <a href="#" className="search-button" onClick={() => {
                    setShowSearch(!showSearch);
                  }}>
                    <i className="fa-solid fa-magnifying-glass"></i></a>
                  <div className={`search-box input-group p-0 my-lg-3 my-3 ${showSearch ? "d-flex" : "d-none"}`}>
                    <SearchBox />
                  </div>
                </div>

                <div className="top-drop-down">
                  {/* Hidden Google Translate container */}
                  <div id="google_translate_element" style={{ display: "none" }} />
                  <select className="border-0 " onChange={handleChange}>
                    {
                      allLanguages.length < 1 ? <option>Loading...</option> :
                        allLanguages.map((l, _) => {
                          return <option value={l.code} data-fulldata={JSON.stringify(l)} key={l.id}>
                            {l.name}
                          </option>
                        })
                    }
                  </select>
                  {/* <select value={selectedLang?.slug || ""} className="border-0 " onChange={onLangChangeRedirection}>
                    {
                      allLanguages.length < 1 ? <option>Loading...</option> :
                        allLanguages.map((l, _) => {
                          return <option value={l.code} data-fulldata={JSON.stringify(l)} key={l.id}>
                            {l.name}
                          </option>
                        })
                    }
                  </select> */}
                </div>
              </div>

            </div>
          </div>
        </section>


        <div className="header-menu mobileMenuBar" id="menuHeader">
          <div className="container">
            <nav className="header-menu-container justify-content-lg-end">
              <div className="navbar-brand">
                <a href={activeLogoUrl} className="text-decoration-none">
                  <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${locationData?.logo?.url}`} alt='KIMSHEALTH' height="55" className="img-fluid" />
                </a>
              </div>
              <div className="mobile_primary" id="primary-nav">
                <ul className="menu-navigation" id="menu-main-navigation-1">
                  <li className="menu-item-has-children show-submenu">
                    <a href={`${basePath}/speciality${hospital ? '?hospital=' + hospital : ''}`} className="anchor-menu">{staticTexts['Specialities']}</a>
                    <div className="sub-menu">
                      <div className="row mb-4">
                        {
                          (() => {
                            const columns = [[], [], []]; // 3 columns
                            const perColumn = Math.ceil(speciality?.length / 3);

                            for (let i = 0; i < speciality?.length; i++) {
                              const s = speciality[i];
                              const colIndex = Math.floor(i / perColumn);
                              columns[colIndex].push(
                                <li key={i}>
                                  <a href={`${basePath}/speciality/${s?.speciality?.slug}${hospital ? '?hospital=' + hospital : ''}`}>
                                    <span>
                                      <img src={s.speciality?.iconImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + s.speciality?.iconImage.url : "/img/no-image.jpg"} alt={s?.title} className="img-fluid" />
                                    </span>
                                    {s?.title}
                                  </a>
                                </li>
                              );

                            }

                            return columns.map((items, idx) => (
                              <div className="col-lg-4" key={idx}>
                                <div className="sub-menu-details">
                                  <ul>{items}</ul>
                                </div>
                              </div>
                            ));
                          })()
                        }
                      </div>
                      <div className="from-btn text-center">
                        <a href={`${basePath}/speciality${hospital ? '?hospital=' + hospital : ''}`} className="btn w-auto d-inline-block px-5">
                          View All
                        </a>
                      </div>

                    </div>
                  </li>
                  <li><a href={`${basePath}/doctor${hospital ? '?hospital=' + hospital : ''}`} className="anchor-menu">{staticTexts['Find a Doctor']}</a></li>
                  <li><a href={`${basePathOnlyLang}/visa-medical`} className="anchor-menu">{staticTexts['Visa Medical']}</a></li>
                  <li className="menu-item-has-children show-submenu d-lg-inline-block d-none">
                    <a href={basePathOnlyLang + "/hospital"} className="anchor-menu">{staticTexts['Locations']}</a>
                    <div className="sub-menu ">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="sub-menu-details">
                            <div className="tabs">
                              {
                                allLocations.map((loc, i) => {
                                  return <div
                                    onMouseEnter={(e) => {
                                      const tabId = e.currentTarget.getAttribute('data-tab');
                                      document.querySelectorAll('.tab-content').forEach(tab => {
                                        tab.classList.remove('active');
                                      });
                                      const targetTab = document.getElementById(tabId);
                                      if (targetTab) {
                                        targetTab.classList.add('active');
                                      }
                                    }}
                                    className={`tab ${selectedLoc?.slug === loc.slug ? 'active' : ''}`}
                                    data-tab={"tab" + i} key={loc.documentId}
                                  >
                                    <a href={loc?.slug !== "ip" ? basePathOnlyLang + "/" + loc?.slug : "#"}>{loc?.title} <i className="fa-solid fa-chevron-right"></i></a>
                                  </div>
                                })
                              }
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-8">
                          <div className="sub-menu-details">
                            {
                              allLocations.map((l, index) => {
                                // Filter once per location
                                const hospitalsForLocation = allHospital?.filter(h => h?.location.id === l.id) || [];

                                const onlyHospitals = hospitalsForLocation.filter(h => h?.type === "Hospital");
                                const onlyMedicalCenters = hospitalsForLocation.filter(h => h.type === "Medical Center");

                                return (
                                  <div id={"tab" + index} className={`tab-content ${index === 0 ? 'active' : ''}`} key={index}>
                                    {l?.slug !== "ip" ? <div className="row">
                                      <div className="col-md-6 mb-3 location-menu-red-color">
                                        {onlyHospitals?.length > 0 && <h3>{staticTexts['Hospitals']}</h3>}
                                        <ul>
                                          {onlyHospitals.map((hospital, i) => (
                                            <li key={`hospital-${i}`}>
                                              <a href={`${basePathOnlyLang}/${l?.slug}/hospital/${hospital?.slug}`}>{hospital?.title}</a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      <div className="col-md-6 mb-3">
                                        {
                                          onlyMedicalCenters.length > 0 && <h3>{staticTexts["Medical Centers"]}</h3>
                                        }
                                        <ul>
                                          {onlyMedicalCenters?.map((center, i) => (
                                            <li key={`medcenter-${i}`}>
                                              <a href={`${basePathOnlyLang}/${l?.slug}/hospital/${center?.slug}`}>{center?.title}</a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div> : <InternationalMenu />}
                                  </div>
                                );
                              })
                            }
                          </div>
                        </div>

                      </div>
                    </div>
                  </li>

                  <li className="menu-item-has-children show-submenu d-lg-none d-block">
                    <a href={basePath + "/hospital"}>{staticTexts['Locations']}</a>
                    <div className="sub-menu">
                      <div className="sub-menu-details">
                        <div className="accordion">
                          {allLocations.map((l, index) => {
                            const hospitalsForLocation = allHospital?.filter(h => h.location.id === l.id) || [];
                            const onlyHospitals = hospitalsForLocation.filter(h => h.type === "Hospital");
                            const onlyMedicalCenters = hospitalsForLocation.filter(h => h.type === "Medical Center");

                            const isOpen = activeIndex === index;

                            return (
                              <div className={`accordion-item ${isOpen ? "active" : ""}`} key={index}>
                                <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                                  <h3>
                                    <a href={l?.slug !== "ip" ? basePathOnlyLang + "/" + l?.slug : "#"}>{l.title}</a>
                                  </h3>
                                  <div className="accordion-icon"></div>
                                </div>


                                {isOpen && (
                                  <div className="accordion-content">
                                    <div className="content-inner">
                                      {l.slug !== "ip" ? <div className="row">
                                        <div className="col-md-6 mb-3">
                                          {onlyHospitals?.length > 0 && <h3>{staticTexts['Hospitals']}</h3>}
                                          <ul>
                                            {onlyHospitals.map((hospital, i) => (
                                              <li key={`hospital-${i}`}>
                                                <a href={`${basePathOnlyLang}/${l.slug}/hospital/${hospital?.slug}`}>
                                                  {hospital?.title}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div className="col-md-6">
                                          {
                                            onlyMedicalCenters?.length > 0 && <h3>{staticTexts["Medical Centers"]}</h3>
                                          }
                                          <ul>
                                            {onlyMedicalCenters?.map((center, i) => (
                                              <li key={`medcenter-${i}`}>
                                                <a href={`${basePathOnlyLang}/${l?.slug}/hospital/${center?.slug}`}>
                                                  {center?.title}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div> : <InternationalMenu />}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li><a href={`${basePathOnlyLang}/international-patient`} className="anchor-menu">
                    {staticTexts['International Patients']}</a></li>

                  <li className="menu-item-has-children show-submenu quicklink-header">
                    <a href="#" className="anchor-menu">{staticTexts['About Us']}</a>
                    <div className="sub-menu">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="sub-menu-details">
                            <ul>
                              <li>
                                <a href={`${basePath}/about-us${hospital ? '?hospital=' + hospital : ''}`}>{staticTexts['Overview']}</a>
                              </li>
                              <li>
                                <a href={basePath + "/leadership"}>{staticTexts['Leadership']}</a>
                              </li>
                              <li>
                                <a href={basePath + "/milestone"}>{staticTexts['Milestones']}</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="quicklink-header"><a href={`${basePath}/at-home-services`} className="anchor-menu">{staticTexts['Home Care']}</a></li>
                  <li className="quicklink-header"><a href={`${basePath}/second-opinion`} className="anchor-menu">{staticTexts['Second Opinion']}</a></li>
                  <li className="quicklink-header"><a href={`${basePath}/ambulance-services`} className="anchor-menu">{staticTexts['Call Ambulance']}</a></li>
                  <li className="quicklink-header"><a href={`${basePath}/contact-us`} className="anchor-menu">{staticTexts['Contact Us']}</a></li>
                  <li className="quicklink-header"><a target='_blank' href={"https://healthcheckup.kimshealthcare.com/p/kims-trivandrum-1/"} className="anchor-menu">{staticTexts['Health Checkup']}</a></li>



                  {staticPageChecker['telehealth'] && (<li className="quicklink-header">
                    <a target='_blank' href="https://consult.bestdocapp.com/home/KIMSTVM?version=new" className="anchor-menu">{staticTexts['Telehealth']}</a>
                  </li>)}
                  {staticPageChecker['teletriage'] && (<li className="quicklink-header">
                    <a href={basePath + "/teletriage"} className="anchor-menu">{staticTexts['Teletriage']}</a>
                  </li>)}
                  {staticPageChecker['corporate'] && (<li className="quicklink-header">
                    <a href={basePath + "/corporate"} className="anchor-menu">{staticTexts['Corporate']}</a>
                  </li>)}
                  <li className="menu-item-has-children show-submenu quicklink-header">
                    <a href="#" className="anchor-menu">{staticTexts['CSR']}</a>
                    <div className="sub-menu">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="sub-menu-details">
                            <ul>
                              {staticPageChecker['csr-policy'] && (
                                <li>
                                  <a href={basePath + "/csr-policy"}>
                                    {staticTexts['CSR Policy']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['csr-initiative'] && (
                                <li>
                                  <a href={basePath + "/csr-initiative"}>
                                    {staticTexts['CSR Initiative']}
                                  </a>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="menu-item-has-children show-submenu quicklink-header">
                    <a href="#" className="anchor-menu">{staticTexts['Patients and Visitors']}</a>
                    <div className="sub-menu">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="sub-menu-details">
                            <ul>
                              {staticPageChecker['testimonial'] && (
                                <li>
                                  <a href={basePath + "/testimonial"}>
                                    {staticTexts['Patient Testimonials']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['patient-stories'] && (
                                <li>
                                  <a href={basePath + "/patient-stories"}>
                                    {staticTexts['Patient Stories']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['patients-rights-and-responsibilities'] && (
                                <li>
                                  <a href={basePath + "/patients-rights-and-responsibilities"}>
                                    {staticTexts['Patient Rights']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['guidebook-for-tpa-patients'] && (
                                <li>
                                  <a href={basePath + "/guidebook-for-tpa-patients"}>
                                    {staticTexts['Guidelines']}
                                  </a>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="quicklink-header">
                    <a href={basePath + "/ethics-committee"}>{staticTexts['Ethics Committee']}</a>
                  </li>
                  <li className="menu-item-has-children show-submenu quicklink-header">
                    <a href="#" className="anchor-menu">{staticTexts['Academics']}</a>
                    <div className="sub-menu">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="sub-menu-details">
                            <ul>
                              {staticPageChecker['kisa-kimshealth-institute-of-skill-acquisition'] && (
                                <li>
                                  <a href={basePath + "/kisa-kimshealth-institute-of-skill-acquisition"}>
                                    {staticTexts['KISA (KIMSHEALTH Institute of Skill Acquisition)']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['internal-medicine-training-imt'] && (
                                <li>
                                  <a href={basePath + "/internal-medicine-training-imt"}>
                                    {staticTexts['Internal Medicine Training (IMT)']}
                                  </a>
                                </li>
                              )}

                              {staticPageChecker['internal-medicine-foundation-programme'] && (
                                <li>
                                  <a href={basePath + "/internal-medicine-foundation-programme"}>
                                    {staticTexts['Internal Medicine Foundation Programme']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['excel-paces'] && (
                                <li>
                                  <a href={"https://excelpaces.com"} target='_blank'>
                                    {staticTexts['Excel Paces']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['emergency-medicine-program'] && (
                                <li>
                                  <a href={basePath + "/emergency-medicine-program"}>
                                    {staticTexts['Emergency Medicine Program']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['american-heart-association'] && (
                                <li>
                                  <a href={basePath + "/american-heart-association"}>
                                    {staticTexts['American Heart Association']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['doctoral-courses'] && (
                                <li>
                                  <a href={basePath + "/doctoral-courses"}>
                                    {staticTexts['Doctoral Courses']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['socomer'] && (
                                <li>
                                  <a href={basePath + "/socomer"}>
                                    {staticTexts['SOCOMER']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['nursing-recruitment'] && (
                                <li>
                                  <a href={basePath + "/nursing-recruitment"}>
                                    {staticTexts['Nursing Recruitment']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['paramedical-courses'] && (
                                <li>
                                  <a href={basePath + "/paramedical-courses"}>
                                    {staticTexts['Paramedical Courses']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['kimshealth-clinical-skills-and-simulation-centre'] && (
                                <li>
                                  <a href={basePath + "/kimshealth-clinical-skills-and-simulation-centre"}>
                                    {staticTexts['KIMSHEALTH Clinical Skills and Simulation Centre']}
                                  </a>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <li className="quicklink-header">
                    <a href={basePath + "#"}>{staticTexts['Facilities']}</a>
                  </li> */}
                  {/* <li className="quicklink-header">
                    <a href={basePath + "#"}>{staticTexts['Quality Focus']}</a>
                  </li> */}
                  {staticPageChecker['all-companies-on-panel'] && (
                    <li className="quicklink-header">
                      <a href={basePath + "/all-companies-on-panel"}>
                        {staticTexts['Insurance Providers']}
                      </a>
                    </li>
                  )}

                  {staticPageChecker['career'] && (
                    <li className="quicklink-header">
                      <a href={basePath + "/career"}>
                        {staticTexts['Careers']}
                      </a>
                    </li>
                  )}


                  {staticPageChecker['blog'] && (
                    <li className="quicklink-header">
                      <a href={basePath + "/blog"}>
                        {staticTexts['Blogs']}
                      </a>
                    </li>
                  )}
                  {staticPageChecker['doctor-talk'] && (
                    <li className="quicklink-header">
                      <a href={basePath + "/doctor-talk"}>
                        {staticTexts['Expert Talks']}
                      </a>
                    </li>
                  )}

                  <li className="menu-item-has-children show-submenu quicklink-header">
                    <a href="#" className="anchor-menu">{staticTexts['Others']}</a>
                    <div className="sub-menu">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="sub-menu-details">
                            <ul>
                              {staticPageChecker['media-and-events'] && (
                                <li>
                                  <a href={basePath + "/media-and-events"}>
                                    {staticTexts['Events']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['travel-clinic'] && (
                                <li>
                                  <a href={basePath + "/travel-clinic"}>
                                    {staticTexts['Travel Clinic']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['ews-services'] && (
                                <li>
                                  <a href={basePath + "/ews-services"}>
                                    {staticTexts['EWS Services']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['blood-bank'] && (
                                <li>
                                  <a href={basePath + "/blood-bank"}>
                                    {staticTexts['Blood Bank']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['bmw-report'] && (
                                <li>
                                  <a href={basePath + "/bmw-report"}>
                                    {staticTexts['BMW Reports']}
                                  </a>
                                </li>
                              )}

                              {/* <li>
                                    <a href={basePath + "/faqs"}>{staticTexts['FAQs']}</a>
                                  </li> */}

                              {staticPageChecker['stents-price-list'] && (
                                <li>
                                  <a href={basePath + "/stents-price-list"}>
                                    {staticTexts['Stents Price List']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['knee-implant-list'] && (
                                <li>
                                  <a href={basePath + "/knee-implant-list"}>
                                    {staticTexts['Knee Implant List']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['donor-information'] && (
                                <li>
                                  <a href={basePath + "/donor-information"}>
                                    {staticTexts['Donor Information']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['quality-focus'] && (
                                <li>
                                  <a href={basePath + "/quality-focus"}>
                                    {staticTexts['Quality Focus']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['privacy-policy'] && (
                                <li>
                                  <a href={basePath + "/privacy-policy"}>
                                    {staticTexts['Privacy Policies']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['terms-and-conditions'] && (
                                <li>
                                  <a href={basePath + "/terms-and-conditions"}>
                                    {staticTexts['Term & Conditions']}
                                  </a>
                                </li>
                              )}
                              {staticPageChecker['refund-and-cancellation-policy'] && (
                                <li>
                                  <a href={basePath + "/refund-and-cancellation-policy"}>
                                    {staticTexts['Refund & Cancellation Policy']}
                                  </a>
                                </li>
                              )}

                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>


              <div className="appointment-btn d-lg-block d-none me-4">
                <button className="btn" type="submit"
                  onClick={() => { location.href = `${basePath}/book-an-appointment${hospital ? '?hospital=' + hospital : ''}` }}>
                  {staticTexts['Book An Appointment']}
                </button>
              </div>


              {/*:::::::::::::::::::::::::::::::::::::  Humbarger start here ::::::::::::::::::::::::::::::: */}
              {/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  */}

              <div className="desktop-humberger-menu">
                <div className="hamburger" id="hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="sidebar pb-5" id="sidebar" style={{ overflowY: 'auto' }}>
                  <div className="menu-items">
                    <ul className="sub-menu-details">
                      {/* <li className="has-dropdown">
                        <a href={basePath + "#"} className="menu-item">{staticTexts['About Us']}<i className="fa-solid fa-angle-down"></i></a>

                        <ul className="submenu">
                          <li className="submenu-item">
                            <a href={basePath + "/about-us"}>{staticTexts['Overview']}</a>
                          </li>
                          <li className="submenu-item">
                            <a href={basePath + "/leadership"}>{staticTexts['Leadership']}</a>
                          </li>
                          <li className="submenu-item">
                            <a href={basePath + "/milestone"}>{staticTexts['Milestones']}</a>
                          </li>
                        </ul>
                      </li> */}
                      {staticPageChecker['telehealth'] && (<li>
                        <a target='_blank' href="https://consult.bestdocapp.com/home/KIMSTVM?version=new" className="menu-item ">{staticTexts['Telehealth']}</a>
                      </li>)}
                      {staticPageChecker['teletriage'] && (<li>
                        <a href={basePath + "/teletriage"} className="menu-item">{staticTexts['Teletriage']}</a>
                      </li>)}
                      {staticPageChecker['corporate'] && (<li>
                        <a href={basePath + "/corporate"} className="menu-item">{staticTexts['Corporate']}</a>
                      </li>)}

                      <li className="has-dropdown">
                        <a href="#" className="menu-item">{staticTexts['CSR']}<i className="fa-solid fa-angle-down"></i></a>

                        <ul className="submenu">
                          {staticPageChecker['csr-policy'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/csr-policy"}>
                                {staticTexts['CSR Policy']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['csr-initiative'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/csr-initiative"}>
                                {staticTexts['CSR Initiative']}
                              </a>
                            </li>
                          )}

                        </ul>
                      </li>

                      <li className="has-dropdown">
                        <a href="#" className="menu-item">{staticTexts['Patients and Visitors']}<i className="fa-solid fa-angle-down"></i></a>

                        <ul className="submenu">
                          {staticPageChecker['testimonial'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/testimonial"}>
                                {staticTexts['Patient Testimonials']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['patient-stories'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/patient-stories"}>
                                {staticTexts['Patient Stories']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['patients-rights-and-responsibilities'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/patients-rights-and-responsibilities"}>
                                {staticTexts['Patient Rights']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['guidebook-for-tpa-patients'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/guidebook-for-tpa-patients"}>
                                {staticTexts['Guidelines']}
                              </a>
                            </li>
                          )}

                        </ul>
                      </li>

                      <li className="has-dropdown">
                        <a href="#" className="menu-item">{staticTexts['Academics']}<i className="fa-solid fa-angle-down"></i></a>

                        <ul className="submenu">
                          {staticPageChecker['kisa-kimshealth-institute-of-skill-acquisition'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/kisa-kimshealth-institute-of-skill-acquisition"}>
                                {staticTexts['KISA (KIMSHEALTH Institute of Skill Acquisition)']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['internal-medicine-training-imt'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/internal-medicine-training-imt"}>
                                {staticTexts['Internal Medicine Training (IMT)']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['internal-medicine-foundation-programme'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/internal-medicine-foundation-programme"}>
                                {staticTexts['Internal Medicine Foundation Programme']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['excel-paces'] && (
                            <li className="submenu-item">
                              <a href={"https://excelpaces.com"} target='_blank'>
                                {staticTexts['Excel Paces']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['emergency-medicine-program'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/emergency-medicine-program"}>
                                {staticTexts['Emergency Medicine Program']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['american-heart-association'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/american-heart-association"}>
                                {staticTexts['American Heart Association']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['doctoral-courses'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/doctoral-courses"}>
                                {staticTexts['Doctoral Courses']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['socomer'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/socomer"}>
                                {staticTexts['SOCOMER']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['nursing-recruitment'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/nursing-recruitment"}>
                                {staticTexts['Nursing Recruitment']}
                              </a>
                            </li>
                          )}

                          {staticPageChecker['paramedical-courses'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/paramedical-courses"}>
                                {staticTexts['Paramedical Courses']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['kimshealth-clinical-skills-and-simulation-centre'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/kimshealth-clinical-skills-and-simulation-centre"}>
                                {staticTexts['KIMSHEALTH Clinical Skills and Simulation Centre']}
                              </a>
                            </li>
                          )}

                        </ul>
                      </li>
                      {/* <li>
                        <a href={basePath + "#"} className="menu-item ">{staticTexts['Facilities']}</a>
                      </li> */}
                      {/* <li>
                        <a href={basePath + "#"} className="menu-item ">{staticTexts['Quality Focus']}</a>
                      </li> */}
                      {staticPageChecker['all-companies-on-panel'] && (
                        <li>
                          <a href={basePath + "/all-companies-on-panel"} className="menu-item ">
                            {staticTexts['Insurance Providers']}
                          </a>
                        </li>
                      )}
                      {staticPageChecker['career'] && (
                        <li>
                          <a href={basePath + "/career"} className="menu-item ">
                            {staticTexts['Careers']}
                          </a>
                        </li>
                      )}

                      {staticPageChecker['blog'] && (
                        <li>
                          <a href={basePath + "/blog"} className="menu-item ">
                            {staticTexts['Blogs']}
                          </a>
                        </li>
                      )}
                      {staticPageChecker['doctor-talk'] && (
                        <li>
                          <a href={basePath + "/doctor-talk"} className="menu-item ">
                            {staticTexts['Expert Talks']}
                          </a>
                        </li>
                      )}
                      {staticPageChecker['ethics-committee'] && (
                        <li>
                          <a href={basePath + "/ethics-committee"} className="menu-item ">
                            {staticTexts['Ethics Committee']}
                          </a>
                        </li>
                      )}


                      {/* OTHERS */}
                      <li className="has-dropdown">
                        <a href="#" className="menu-item">{staticTexts['Others']} <i className="fa-solid fa-angle-down"></i></a>

                        <ul className="submenu">
                          {staticPageChecker['media-and-events'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/media-and-events"}>
                                {staticTexts['Events']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['travel-clinic'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/travel-clinic"}>
                                {staticTexts['Travel Clinic']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['ews-services'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/ews-services"}>
                                {staticTexts['EWS Services']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['blood-bank'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/blood-bank"}>
                                {staticTexts['Blood Bank']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['bmw-report'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/bmw-report"}>
                                {staticTexts['BMW Reports']}
                              </a>
                            </li>
                          )}

                          {/* <li className="submenu-item">
                                <a href={basePath + "/faqs"}>{staticTexts['FAQs']}</a>
                              </li> */}

                          {staticPageChecker['stents-price-list'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/stents-price-list"}>
                                {staticTexts['Stents Price List']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['knee-implant-list'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/knee-implant-list"}>
                                {staticTexts['Knee Implant List']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['donor-information'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/donor-information"}>
                                {staticTexts['Donor Information']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['quality-focus'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/quality-focus"}>
                                {staticTexts['Quality Focus']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['privacy-policy'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/privacy-policy"}>
                                {staticTexts['Privacy Policies']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['terms-and-conditions'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/terms-and-conditions"}>
                                {staticTexts['Term & Conditions']}
                              </a>
                            </li>
                          )}
                          {staticPageChecker['refund-and-cancellation-policy'] && (
                            <li className="submenu-item">
                              <a href={basePath + "/refund-and-cancellation-policy"}>
                                {staticTexts['Refund & Cancellation Policy']}
                              </a>
                            </li>
                          )}

                        </ul>
                      </li>
                    </ul>

                  </div>
                </div>
              </div>


              <div className="mobile-spacing-nav">
                {/* <div className="mobile-location-dropdown d-md-none d-block">
                                    <select aria-label="Default select example">
                                        <option value={""}>En</option>
                                        <option value="1">Ar</option>
                                        <option value="2">Ml</option>
                                    </select>
                                </div> */}
                {/* <div className="mobile-location-dropdown d-md-none d-block">
                  <select value={basePathOnlyLang + "/" + selectedLangLoc?.loc?.slug} aria-label="Default select example" onChange={(e) => {
                    const url = e.target.value;
                    window.open(url, '_self', 'noreferrer');
                  }}>
                    <option value={basePathOnlyLang + "/hospital"}>{staticTexts['Location']}</option>
                    {
                      allLocations?.map((loc, i) => {
                        return <option value={basePathOnlyLang + "/" + loc?.slug} key={i}>{loc?.title}</option>
                      })
                    }

                  </select>
                </div> */}
                <div className="search-icon ms-3 me-2 rounded-field-form d-md-none d-block">
                  <a href="#" className="search-button" onClick={() => {
                    setShowSearch(!showSearch);
                  }}>
                    <i className="fa-solid fa-magnifying-glass"></i></a>
                  <div className={`search-box input-group p-0 my-lg-3 my-3 ${showSearch ? "d-flex" : "d-none"}`} >
                    <SearchBox />
                  </div>
                </div>
                <div className="menu-button">
                  <span className="toggle-bar"></span>
                  <span className="toggle-bar"></span>
                  <span className="toggle-bar"></span>
                </div>
              </div>

            </nav>

          </div>
        </div>
      </header>
    </>
  )
}

export default HeaderUnit;

