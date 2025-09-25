import getCurrentLangLoc from "./getCurrentLangLoc";

const getStaticPageChecker = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;
  const getLangLoc = await getCurrentLangLoc();
  const locId = getLangLoc.loc.id;

  let staticData = {};

  // Step 1: Get all static pages
  const initialRes = await fetch(`${baseUrl}/static-pages?pagination[limit]=100`);
  const pages = await initialRes.json();

  // Step 2: Build all requests in parallel
  const requests = pages.data.map((page) => {
    const url = `${baseUrl}/static-page-contents?filters[pageCategory][id][$eq]=${page.id}&filters[locations][id][$eq]=${locId}`;
    return fetch(url).then((res) => res.json().then((json) => [page.slug, json]));
  });

  // Step 3: Resolve them together
  const results = await Promise.all(requests);

  results.forEach(([slug, json]) => {
    staticData[slug] = json.data.length > 0;
  });

  return staticData;
};

export default getStaticPageChecker;

