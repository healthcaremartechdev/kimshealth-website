const hospitalData = {
    getAll: async ({ langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;
        let url = baseUrl + `/hospitals?populate=*&pagination[limit]=100&filters[location][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;

    },


    getAllByType: async ({ type, langLoc }) => {
        let baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Get total count
        const initialReq = await fetch(`${baseUrl}/hospitals${!langLoc.loc.default ? `?filters[location][id][$eq]=${langLoc.loc.id}` : ''}`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;
        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/hospitals?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[type][$eq]=${type}${!langLoc.loc.default ? `&filters[location][id][$eq]=${langLoc.loc.id}` : ''}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }


        return data;

    },

    getSingleHospital: async ({slug, langLoc}) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/hospitals/?filters[slug][$eq]=${slug}&populate[0]=featuredImage&populate[1]=manageAppearance&populate[2]=USPSection&populate[3]=USPSection.uspItem&populate[4]=hospitalsSection&populate[5]=specialitySection&populate[6]=pageBanner&populate[7]=pageBanner.bannerImageDesktop&populate[8]=pageBanner.bannerImageMobile&populate[9]=metaSection&populate[10]=overviewSection&populate[11]=blog&populate[12]=doctorTalk&populate[13]=testimonialSection&populate[14]=expertSection&populate[15]=overviewSection.thumbnail&populate[16]=location`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },

    getSingleHospitalClient: async ({slug, langLoc}) => {
        let url = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL + `/hospitals/?filters[slug][$eq]=${slug}&populate[0]=featuredImage&populate[1]=manageAppearance&populate[2]=USPSection&populate[3]=USPSection.uspItem&populate[4]=hospitalsSection&populate[5]=specialitySection&populate[6]=pageBanner&populate[7]=pageBanner.bannerImageDesktop&populate[8]=pageBanner.bannerImageMobile&populate[9]=metaSection&populate[10]=overviewSection&populate[11]=blog&populate[12]=doctorTalk&populate[13]=testimonialSection&populate[14]=expertSection&populate[15]=overviewSection.thumbnail&populate[16]=location`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },

    getFooterHospital: async ({langLoc}) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;
        // Get total count
        const initialReq = await fetch(`${baseUrl}/hospitals`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/hospitals?fields=title&fields=slug&fields=type&filters[manageAppearance][showingFooter][$eq]=true&populate[0]=manageAppearance&populate[1]=location&pagination[start]=${start}&pagination[limit]=${limit}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },


    getAllHospitalAndMedicalCenter: async () => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;
        // Get total count
        const initialReq = await fetch(`${baseUrl}/hospitals`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/hospitals?fields=title&fields=slug&fields=type&filters[manageAppearance][showingHeader][$eq]=true&pagination[start]=${start}&pagination[limit]=${limit}&populate[0]=location&sort=manageAppearance.orderInMasterList:asc,title:asc`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }


        return data;
    }







}


export default hospitalData;