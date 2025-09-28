const diseaseData = {
    // FOR LISTING PAGE;
    getAll: async ({langLoc, URLParams}) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        const specialityFilter = URLParams?.speciality
            ? `&filters[disease][specialities][slug][$eq]=${URLParams.speciality}`
            : ``;

        const limit = 100;

        // Step 1: Get total count
        const initialReq = await fetch(`${baseUrl}/disease-details?populate=*${specialityFilter}`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta?.pagination?.total;

        const pages = Math.ceil(totalCount / limit);
        let allData = [];


        // Step 2: Paginated fetch
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/disease-details?populate[0]=disease&populate[1]=disease.specialities&pagination[start]=${start}&pagination[limit]=${limit}&populate[2]=disease.iconImage&${specialityFilter}&sort=manageAppearance.orderInMasterList:asc,title:asc`;

            const res = await fetch(url);
            const json = await res.json();
            allData = [...allData, ...json.data];
        }

        return allData;
    },

    
    getDiseaseBySpeciality: async ({speciality,langLoc}) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;
        const limit = 100;

        // Step 1: Get total count
        const initialReq = await fetch(
            `${baseUrl}/disease-details?populate=*&filters[disease][specialities][slug][$eq]=${speciality}&pagination[limit]=5&sort=manageAppearance.orderInMasterList:asc,title:asc`
        );
        const initialRes = await initialReq.json();

        return initialRes.data;
    },

    getFeturedDisease: async ({langLoc}) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/disease-details?populate=*&filters[manageAppearance][showInFeaturedList]=true&sort=manageAppearance.orderInFeaturedList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },


    // FOR DETAILS PAGE;
    getSingleDisease: async ({ slug, langLoc }) => {
        // get speciality id;
        const getIdReq = await fetch(process.env.NEXT_PUBLIC_CMS_API_URL + `/diseases?filters[slug][$eq]=${slug}`);
        const getIdRes = await getIdReq.json();
        const id = getIdRes.data[0].id;

        // Get speciality data using id;
        const req = await fetch(process.env.NEXT_PUBLIC_CMS_API_URL + `/disease-details?populate[0]=overviewSection&populate[1]=metaSection&populate[2]=manageAppearance&populate[3]=expertSection&populate[4]=testimonialSection&populate[5]=doctorTalk&populate[6]=disease&populate[7]=disease.featuredImage&populate[8]=disease.iconImage&populate[9]=overviewSection.thumbnail&filters[disease][$eq]=${id}`);
        const res = await req.json();

        return res.data[0];
    },



}


export default diseaseData;
