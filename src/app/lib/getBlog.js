const blogData = {
    allBlog: async ({ start = 0, limit = 12, speciality, langLoc, URLParams }) => {

        const specialityFilter = URLParams?.speciality
            ? `&filters[specialities][slug][$eq]=${URLParams.speciality}`
            : ``;

        const doctorFilter = URLParams?.doctor
            ? `&filters[doctor][slug][$eq]=${URLParams.doctor}`
            : ``;

        const categoryFilter = URLParams?.category
            ? `&filters[blogCategories][slug][$eq]=${URLParams.category}`
            : ``;

        const url = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL + `/blog-posts?populate=*${specialityFilter}${doctorFilter}${categoryFilter}&filters[locations][id][$eq]=${langLoc.loc.id}&pagination[start]=${start}&pagination[limit]=${limit} ${speciality ? `filters[specialities][slug][$eq]=${speciality}` : ''}&sort=date:desc,title:asc`;

        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getSingleBlog: async ({slug, langLoc}) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/blog-posts/?filters[slug][$eq]=${slug}&populate=*`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },

    getByDoctor: async ({ id, langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/blog-posts?populate=*&filters[doctor][id][$eq]=${id}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=date:desc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getBySpeciality: async ({ id, langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/blog-posts?populate=*&filters[specialities][id][$eq]=${id}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=date:desc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getRecentBlog: async ({ langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/blog-posts?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&sort=date:desc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getCategory: async ({ langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL + `/blog-categories?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&sort=title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

}


export default blogData;
