const testimonialData = {
    getAll: async ({ start, limit, langLoc, URLParams }) => {
        const specialityFilter = URLParams?.speciality
            ? `&filters[specialities][slug][$eq]=${URLParams.speciality}`
            : ``;

        const hospitalFilter = URLParams?.hospital
            ? `&filters[hospitals][slug][$eq]=${URLParams.hospital}`
            : ``;

        const procedureFilter = URLParams?.procedure
            ? `&filters[procedures][slug][$eq]=${URLParams.procedure}`
            : ``;

        const diseaseFilter = URLParams?.disease
            ? `&filters[diseases][slug][$eq]=${URLParams.disease}`
            : ``;

        const locationFilter = URLParams?.location
            ? `&filters[locations][slug][$eq]=${URLParams.location}`
            : `&filters[locations][id][$eq]=${langLoc.loc.id}`;

        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*${specialityFilter}${hospitalFilter}${procedureFilter}${diseaseFilter}${locationFilter}&pagination[start]=${start}&pagination[limit]=${limit}&filters[testimonialType][$contains]=Video&sort=date:desc,manageAppearance.orderInMasterList:asc,title:asc`;


        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getSingleTestimonaial: async ({slug, langLoc}) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials/?filters[slug][$eq]=${slug}&populate=*`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },

    getBySpeciality: async ({ id, langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*&filters[testimonialType][$contains]=Video&filters[specialities][id][$eq]=${id}&pagination[start]=0&pagination[limit]=4&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getBySpecialityWithDefault: async ({ id, langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*&filters[testimonialType][$contains]=Video&filters[specialities][id][$eq]=${id}&pagination[start]=0&pagination[limit]=4&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        if(res.data.length===0)
        {
            const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*&pagination[start]=0&pagination[limit]=4&filters[testimonialType][$contains]=Video&sort=manageAppearance.orderInFeaturedList:asc,title:asc`;

            const req = await fetch(url);
            const res = await req.json();

            return res.data;
        }
        else
            return res.data;
    },

    getByProcedure: async ({ id, langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*&filters[testimonialType][$contains]=Video&filters[procedures][id][$eq]=${id}&pagination[start]=0&pagination[limit]=4&sort=manageAppearance.orderInMasterList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getByDisease: async ({ id, langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*&filters[testimonialType][$contains]=Video&filters[diseases][id][$eq]=${id}&pagination[start]=0&pagination[limit]=4&sort=manageAppearance.orderInMasterList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getFeaturedAll: async ({ langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*&pagination[start]=0&pagination[limit]=4&filters[testimonialType][$contains]=Video&filters[locations][id][$eq]=${langLoc.loc.id}&filters[manageAppearance][showInFeaturedList][$eq]=true&sort=manageAppearance.orderInFeaturedList:asc,title:asc`;

        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getInternationalAll: async ({ langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*&pagination[start]=0&pagination[limit]=4&filters[testimonialType][$contains]=Video&filters[locations][slug][$eq]=ip&filters[manageAppearance][showInFeaturedList][$eq]=true&sort=manageAppearance.orderInFeaturedList:asc,title:asc`;

        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getTestimonialByHospital: async ({ langLoc, hospitalId }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*&filters[hospitals][$eq]=${hospitalId}&pagination[start]=0&pagination[limit]=4&filters[testimonialType][$contains]=Video&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;

        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getRecent: async ({ langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*&pagination[start]=0&pagination[limit]=4&filters[testimonialType][$contains]=Video&filters[locations][id][$eq]=${langLoc.loc.id}&sort=date:desc,manageAppearance.orderInMasterList:asc,title:asc`;

        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },


    getAllPatientStories: async ({ start, limit, langLoc, URLParams }) => {

        
        const specialityFilter = URLParams?.speciality
            ? `&filters[specialities][slug][$eq]=${URLParams.speciality}`
            : ``;

        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/testimonials?populate=*${specialityFilter}&filters[locations][id][$eq]=${langLoc.loc.id}&pagination[start]=${start}&pagination[limit]=${limit}&filters[testimonialType][$contains]=Text&sort=date:desc,manageAppearance.orderInMasterList:asc,title:asc`;

        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },


}

export default testimonialData;
