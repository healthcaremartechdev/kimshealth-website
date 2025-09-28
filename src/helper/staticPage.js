"use client"
import getCurrentLangLocClient from "./getCurrentLangLocClient";

const getStaticPage = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;
    const getLangLoc = await getCurrentLangLocClient();
    const locId = getLangLoc.loc.id;

    let staticData = {};

    let start;
    const limit = 100; // ✅ Fetch 100 per call
    const iterations = 2; // adjust this depending on total count (example: 200 records)

    for (let i = 0; i < iterations; i++) {
        start = i * limit;
        const url = `${baseUrl}/static-page-contents?populate[0]=pageCategory&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${locId}`;
        const res = await fetch(url);
        const json = await res.json();


        const slugMap = Object.fromEntries(
            json.data.map(item => [item.pageCategory.slug, true])
        );

        staticData = { ...staticData, ...slugMap };
    }

    return staticData;
}

export default getStaticPage;
