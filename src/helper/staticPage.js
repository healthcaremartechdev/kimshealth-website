"use client"
import getCurrentLangLocClient from "./getCurrentLangLocClient";

const getStaticPage = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;
    const getLangLoc = await getCurrentLangLocClient();
    const locId = getLangLoc.loc.id;

    // console.log(getLangLoc)

    let staticData = {};

    // Step 1: Get total count
    const initialRes = await fetch(`${baseUrl}/static-pages?pagination[limit]=100`);
    const pages = await initialRes.json();

    // Step 2: Get all static text in selected locale
    for (let i = 0; i < pages.data.length; i++) {
        const url = `${baseUrl}/static-page-contents?filters[pageCategory][id][$eq]=${pages.data[i]['id']}&filters[locations][id][$eq]=${locId}`;
        const res = await fetch(url);
        const json = await res.json();

        staticData[pages.data[i]['slug']] = json.data.length > 0 ? true : false;
    }


    return staticData;
};


export default getStaticPage;
