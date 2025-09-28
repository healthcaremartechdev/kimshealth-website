const mediaCoverData = {
    getAll: async ({ start = 0, limit = 12, all = false, langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;

        if (!all) {
            let url = baseUrl + `/media-coverages?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=date:desc,manageAppearance.orderInMasterList:asc,title:asc`;
            const req = await fetch(url);
            const res = await req.json();

            return res.data;
        }
        else {
            // Get total count
            const initialReq = await fetch(`${baseUrl}/media-coverages`);
            const initialRes = await initialReq.json();
            const totalCount = initialRes.meta.pagination.total;

            const limit = 100;
            const pages = Math.ceil(totalCount / limit);
            let data = [];

            // Actual Data
            for (let i = 0; i < pages; i++) {
                const start = i * limit;
                const url = `${baseUrl}/media-coverages?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=date:desc,manageAppearance.orderInMasterList:asc,title:asc`;
                const res = await fetch(url);
                const json = await res.json();
                data = [...data, ...json.data];
            }

            

            return data;
        }
    },

    getSingleMedia: async ({slug, langLoc}) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/media-coverages/?filters[slug][$eq]=${slug}&populate[1]=featuredImage&populate[2]=mediaSection`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },

    getRecentMedia: async ({ langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/media-coverages?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&sort=date:desc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },


}


export default mediaCoverData;