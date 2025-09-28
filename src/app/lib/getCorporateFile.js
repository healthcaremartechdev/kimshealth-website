const corporateFile = {
    getAll: async ({ langLoc, type }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/corporate-files?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&filters[type][$eq]=${type}&sort=title:asc`;

        
        const req = await fetch(url);
        const res = await req.json();

        return res.data;

    },

}


export default corporateFile;
