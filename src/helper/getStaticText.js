"use client"
import Cookies from "js-cookie";

const getStaticText = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;
    const getLang = JSON.parse(Cookies.get("systemLang"));
    const langId = getLang.id;

    const limit = 100;
    let allData = [];
    let staticData = {};

    // Step 1: Get total count
    const initialRes = await fetch(`${baseUrl}/static-texts?filters[locale][$eq]=${langId}`);
    const initialJson = await initialRes.json();
    const totalCount = initialJson.meta.pagination.total;
    const pages = Math.ceil(totalCount / limit);

    // Step 2: Get all static text in selected locale
    for (let i = 0; i < pages; i++) {
        const start = i * limit;
        const url = `${baseUrl}/static-texts?filters[locale][$eq]=${langId}&pagination[start]=${start}&pagination[limit]=${limit}`;
        const res = await fetch(url);
        const json = await res.json();
        allData = [...allData, ...json.data];
    }

    // Step 3: Construct staticData object
    allData.forEach(item => {
        staticData[item.text] = item.text; // both key and value as translated `text`
    });


    return staticData;
};


export default getStaticText;
