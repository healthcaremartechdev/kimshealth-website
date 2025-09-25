"use client"
import getCurrentLangLocClient from "./getCurrentLangLocClient";

const getStaticPage = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;
    const getLangLoc = await getCurrentLangLocClient();
    const locId = getLangLoc.loc.id;

    // console.log(getLangLoc)

    let staticData = {};

    let start;
    const limit = 100;
    // Step 2: Get all static text in selected locale
    for (let i = 0; i < 2; i++) {
        start = i * limit;
        const url = `${baseUrl}/static-page-contents?populate[0]=pageCategory&pagination[start]=${start}&fpagination[limit]=${limit}&filters[locations][id][$eq]=${locId}`;
        const res = await fetch(url);
        const json = await res.json();

        // Build slug:true map from this batch
        const slugMap = Object.fromEntries(
            json.data.map(item => [item.pageCategory.slug, true])
        );

        // Merge into staticData
        staticData = { ...staticData, ...slugMap };
    }



    return staticData;
};


export default getStaticPage;
