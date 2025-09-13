"use client"
import getCurrentLangLocClient from '@/helper/getCurrentLangLocClient';
import langLoc from '@/helper/getLangLoc';
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState } from 'react';

const BookAnAppoinmentShort = ({ basePath, extraClass, currentLangLoc, currentHospital }) => {
    const [staticTexts, setStaticTexts] = useState({});
    const [locationList, setLocationList] = useState()
    const [allHospital, setAllHospital] = useState();
    const [allSpeciality, setAllSpeciality] = useState();
    const [allDoctors, setAllDoctors] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(currentLangLoc?.loc.slug || "");
    const [selectedHospital, setSelectedHospital] = useState(currentHospital || "");
    const [selectedSpeciality, setSelectedSpeciality] = useState();
    const [selectedDoctor, setSelectedDoctor] = useState();
    const [doctorLoading, setDoctorLoading] = useState(true);


    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();
    }, []);


    const getHospital = async ({ lang, loc }) => {

        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        const locationFilter = loc
            ? `&filters[location][slug][$eq]=${loc}`
            : `&filters[location][slug][$eq]=${loc}`;

        // Get total count
        const initialReq = await fetch(`${baseUrl}/hospitals?${locationFilter}`);


        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/hospitals?fields=title&fields=slug${locationFilter}&populate[0]=manageAppearance&populate[1]=location&pagination[start]=${start}&pagination[limit]=${limit}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];

        }

        return data;
    }


    const getSpeciality = async ({ lang, loc, hospital }) => {

        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        const locationFilter = loc
            ? `&filters[locations][slug][$eq]=${loc}`
            : ``;

        const hospitalFilter = loc
            ? `&filters[speciality][hospitals][slug][$eq]=${hospital}`
            : ``;

        // Get total count
        const initialReq = await fetch(`${baseUrl}/specialty-details?${locationFilter}${hospitalFilter}`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/specialty-details?populate=*&pagination[start]=${start}&pagination[limit]=${limit}${locationFilter}${hospitalFilter}&filters[speciality][specialities][$null]=true&sort=title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }


        return data;
    }

    const getDoctor = async ({ lang, loc, hospital, speciality }) => {
        setDoctorLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        const locationFilter = loc
            ? `&filters[locations][slug][$eq]=${loc}`
            : ``;

        const hospitalFilter = loc
            ? `&filters[hospitals][slug][$eq]=${hospital}`
            : ``;

        const specialityFilter = speciality
            ? `&filters[specialities][slug][$eq]=${speciality}`
            : ``;

        // Get total count
        const initialReq = await fetch(`${baseUrl}/doctor-details?${locationFilter}${specialityFilter}${hospitalFilter}`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/doctor-details?populate=*&pagination[start]=${start}&pagination[limit]=${limit}${locationFilter}${specialityFilter}${hospitalFilter}&sort=name:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        setAllDoctors(data);
        setDoctorLoading(false)
    }



    useEffect(() => {
        const get = async () => {
            let currentLangLoc = await getCurrentLangLocClient();
            setLocationList(await langLoc.getLocationsOnlyCMS())
            setAllHospital(await getHospital({ loc: selectedLocation == "" ? "" : selectedLocation }));
            setAllSpeciality(await getSpeciality({ loc: selectedLocation == "" ? currentLangLoc.loc.slug : selectedLocation, hospital: selectedHospital == "" ? "" : selectedHospital }));
            await getDoctor({ loc: selectedLocation == "" ? "" : selectedLocation, hospital: selectedHospital == "" ? "" : selectedHospital, speciality: selectedSpeciality == "" ? "" : selectedSpeciality });



        }
        get()

    }, [selectedLocation, selectedHospital, selectedSpeciality])



    return (
        <section className={'section book-form-mobile-card ' + extraClass}>
            <div className="container-fluid">
                <div className="custom-from">
                    <div className="row justify-content-between">
                        <div className="banner-from-col-custom">
                            <div className="input-group mb-lg-0 mb-3">
                                <span className="input-group-text" id="from-icon"><i
                                    className="fa-solid icon-location-pin"></i></span>
                                <select className="form-select from-location" value={selectedLocation} onChange={(e) => {
                                    setSelectedLocation(e.target.value);
                                    setSelectedHospital("");
                                    setSelectedSpeciality("");
                                    setSelectedDoctor("");
                                }}>
                                    <option value={""}>{staticTexts['Select location']}</option>
                                    {
                                        locationList?.map((loc, i) => {
                                            return <option value={loc.slug} key={i}>{loc.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="banner-from-col-custom">
                            <div className="input-group mb-lg-0 mb-3">
                                <span className="input-group-text" id="from-icon"><i
                                    className="fa-solid fa-hospital"></i></span>
                                <select className="form-select from-location" value={selectedHospital} onChange={(e) => {
                                    setSelectedHospital(e.target.value);
                                    setSelectedSpeciality("");
                                    setSelectedDoctor("");
                                }}>
                                    <option value={""}>{staticTexts['Select Hospital']}</option>
                                    {
                                        allHospital?.map((hos, i) => {
                                            return <option value={hos.slug} key={i}>{hos.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="banner-from-col-custom">
                            <div className="input-group mb-lg-0 mb-3">
                                <span className="input-group-text" id="from-icon"><i
                                    className="fa-solid fa-magnifying-glass"></i></span>
                                <select className="form-select from-location" value={selectedSpeciality} onChange={(e) => {
                                    setSelectedSpeciality(e.target.value);
                                    setSelectedDoctor("");
                                }}>
                                    <option value={""}>{staticTexts['Select Speciality']}</option>
                                    {
                                        allSpeciality?.map((splty, i) => {
                                            return <option value={splty.speciality?.slug} key={i}>{splty.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="banner-from-col-custom">
                            <div className="input-group mb-lg-0 mb-3">
                                <span className="input-group-text" id="from-icon"><i className="fa-solid fa-user-doctor"></i></span>
                                <select className="form-select from-location" value={selectedDoctor} onChange={(e) => {
                                    setSelectedDoctor(e.target.value)
                                }}>
                                    {!doctorLoading ? (
                                        <>
                                            <option value="">{staticTexts['Select a Doctor']}</option>
                                            {allDoctors.map((d, i) => (
                                                <option value={`${d?.salutation ? d?.salutation + " " : ""}${d?.name}`} key={i}>
                                                    {`${d?.salutation ? d?.salutation + " " : ""}${d?.name}`}
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <option value="">{staticTexts['Loading...'] || 'Loading...'}</option>
                                    )}

                                </select>
                            </div>
                        </div>
                        <div className="banner-from-col-custom">
                            <div className="from-btn">
                                <a
                                    href={
                                        basePath +
                                        '/book-an-appointment' +
                                        (selectedLocation || selectedSpeciality || selectedDoctor || selectedHospital
                                            ? '?' +
                                            [
                                                selectedLocation ? `location=${encodeURIComponent(selectedLocation)}` : null,
                                                selectedHospital ? `hospital=${encodeURIComponent(selectedHospital)}` : null,
                                                selectedSpeciality ? `speciality=${encodeURIComponent(selectedSpeciality)}` : null,
                                                selectedDoctor ? `doctor=${encodeURIComponent(selectedDoctor)}` : null,
                                            ]
                                                .filter(Boolean)
                                                .join('&')
                                            : '')
                                    }
                                    className="btn w-100"
                                >
                                    {staticTexts['Book An Appointment']}
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookAnAppoinmentShort;
