import getCurrentLangLoc from "./getCurrentLangLoc";
const locationData = {

    getSingleLocation: async ({slug}) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/locations/?filters[slug][$eq]=${slug}&populate[0]=metaSection`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },

    getCurrentLocation: async () => {

        const getLangLoc = await getCurrentLangLoc();
        const slug = getLangLoc.loc.slug;

        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/locations/?filters[slug][$eq]=${slug}&populate[0]=metaSection&populate[1]=logo`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },
}


export default locationData;