const urlList = {

    getPages: async ({langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Get total count
        const countURL =baseUrl + `/static-page-contents?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}`;
        const initialReq = await fetch(countURL);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/static-page-contents?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}sort=pageCategory.title:asc`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },
    
    getHospital: async ({langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Get total count
        const countURL =baseUrl + `/hospitals?populate=*&filters[location][id][$eq]=${langLoc.loc.id}`;
        const initialReq = await fetch(countURL);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/hospitals?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[location][id][$eq]=${langLoc.loc.id}`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },

    getSpeciality: async ({ langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Get total count
        const initialReq = await fetch(`${baseUrl}/specialty-details?filters[locations][id][$eq]=${langLoc.loc.id}`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/specialty-details/?populate[0]=overviewSection&populate[1]=manageAppearance&populate[2]=speciality&&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },

    getDoctor: async ({langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Get total count
        const countURL =baseUrl + `/doctor-details?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}`;
        const initialReq = await fetch(countURL);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/doctor-details?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}sort=manageAppearance.orderInMasterList:asc,name:asc`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },

    allBlog: async ({langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Get total count
        const countURL =baseUrl + `/blog-posts?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}`;
        const initialReq = await fetch(countURL);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/blog-posts?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&pagination[start]=${start}&pagination[limit]=${limit}&sort=date:desc,title:asc`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },

    getTestimonial: async ({langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Get total count
        const countURL =baseUrl + `/testimonials?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}`;
        const initialReq = await fetch(countURL);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/testimonials?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },

    getDoctorTalk: async ({langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Get total count
        const countURL =baseUrl + `/doctor-talks?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}`;
        const initialReq = await fetch(countURL);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/doctor-talks?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },
    
    getAtHomeService: async ({langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Get total count
        const countURL =baseUrl + `/home-service-details?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}`;
        const initialReq = await fetch(countURL);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/home-service-details?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },
}


export default urlList;
