const doctorData = {
    getDoctorAll: async (start = 0, limit = 12, langLoc, URLParams) => {
        const base = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Determine the correct filter
        const hospitalFilter = URLParams?.hospital
            ? `&filters[hospitals][slug][$eq]=${URLParams.hospital}`
            : ``;

        let locationFilter = URLParams?.location
            ? `&filters[locations][slug][$eq]=${URLParams.location}`
            : `&filters[locations][id][$eq]=${langLoc.loc.id}`;

        if (hospitalFilter) {
            locationFilter = ``;
        }


        const specialityFilter = URLParams?.speciality
            ? `&filters[specialities][slug][$eq]=${URLParams.speciality}`
            : ``;

        const genderFilter = URLParams?.gender
            ? `&filters[doctorGender][$eq]=${URLParams.gender}`
            : ``;



        const procedureFilter = URLParams?.procedure
            ? `&filters[procedures][slug][$eq]=${URLParams.procedure}`
            : ``;

        const diseaseFilter = URLParams?.disease
            ? `&filters[diseases][slug][$eq]=${URLParams.disease}`
            : ``;

        const url = `${base}/doctor-details?populate=*${locationFilter}${specialityFilter}${genderFilter}${hospitalFilter}${procedureFilter}${diseaseFilter}&pagination[start]=${start}&pagination[limit]=${limit}&sort=name:asc,manageAppearance.orderInMasterList:asc`;

        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },


    getDoctorAllOnFindDoctor: async (start = 0, limit = 12, langLoc, hospital, searchText, URLParams) => {
        const base = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Determine the correct filter
        const locationFilter = hospital
            ? `&filters[hospitals][slug][$eq]=${hospital}`
            : `&filters[locations][id][$eq]=${langLoc.loc.id}`;

        const textFilter = searchText
            ? `&filters[$or][0][name][$contains]=${searchText}&filters[$or][1][specialities][title][$contains]=${searchText}`
            : ``;

        const specialityFilter = URLParams?.speciality
            ? `&filters[specialities][slug][$eq]=${URLParams.speciality}`
            : ``;


        const url = `${base}/doctor-details?populate=*${locationFilter}${textFilter}${specialityFilter}&pagination[start]=${start}&pagination[limit]=${limit}&sort=name:asc,manageAppearance.orderInMasterList:asc`;


        const req = await fetch(url);
        const res = await req.json();
        console.log(url)
        return res.data;
    },


    getSingleDoctor: async ({ slug, langLoc }) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/doctor-details/?filters[slug][$eq]=${slug}&populate[0]=doctorImage&populate[1]=hospitals&populate[2]=diseases&populate[3]=locations&populate[4]=procedures&populate[5]=specialities&populate[6]=manageAppearance&populate[7]=metaSection&populate[8]=blogSection&populate[9]=doctorTalk`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },

    // USE IN DOCTOR LISTING
    allDoctorCount: async ({ langLoc, URLParams }) => {
        const base = process.env.NEXT_PUBLIC_CMS_API_URL;

        // Determine the correct filter
        const locationFilter = URLParams?.location
            ? `&filters[locations][slug][$eq]=${URLParams.location}`
            : `&filters[locations][id][$eq]=${langLoc.loc.id}`;

        const specialityFilter = URLParams?.speciality
            ? `&filters[specialities][slug][$eq]=${URLParams.speciality}`
            : ``;

        const genderFilter = URLParams?.gender
            ? `&filters[doctorGender][$eq]=${URLParams.gender}`
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

        const url = `${base}/doctor-details?populate=*${locationFilter}${specialityFilter}${genderFilter}${hospitalFilter}${procedureFilter}${diseaseFilter}`;
        const req = await fetch(url)
        const initialRes = await req.json();
        const totalCount = initialRes.meta.pagination.total;

        // const limit = 100;
        // const pages = Math.ceil(totalCount / limit);
        // let data = [];

        // // Actual Data
        // for (let i = 0; i < pages; i++) {
        //     const start = i * limit;
        //     const url = `${baseUrl}/doctor-details?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,name:asc`;
        //     const res = await fetch(url);
        //     const json = await res.json();
        //     data = [...data, ...json.data];
        // }


        return totalCount;
    },


    getBySpeciality: async ({ id, langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/doctor-details?populate=*&filters[specialities][id][$eq]=${id}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,name:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },


    getBySpecialityAndHospital: async ({ id, hospital, langLoc }) => {

        const hospitalFilter = hospital
            ? `&filters[hospitals][slug][$eq]=${hospital}`
            : ``

        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/doctor-details?populate=*&filters[specialities][id][$eq]=${id}${hospitalFilter}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,name:asc`;
        const req = await fetch(url);
        const res = await req.json();

        console.log(url)
        return res.data;
    },

    getByProcedure: async ({ id, langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/doctor-details?populate=*&filters[procedures][id][$eq]=${id}&sort=manageAppearance.orderInMasterList:asc,name:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getByDisease: async ({ id, langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/doctor-details?populate=*&filters[diseases][id][$eq]=${id}&sort=manageAppearance.orderInMasterList:asc,name:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },


    getFeturedDoctor: async ({ langLoc }) => {
        let baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;
        const url = baseUrl + `/doctor-details?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&filters[manageAppearance][showInFeaturedList][$eq]=true&sort=manageAppearance.orderInFeaturedList:asc,name:asc`;

        const req = await fetch(url);
        const res = await req.json();
        return res.data;

    },

    getDoctorByHospital: async ({ langLoc, hospitalId }) => {
        let baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;
        const url = baseUrl + `/doctor-details?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&filters[hospitals][$eq]=${hospitalId}&sort=manageAppearance.orderInMasterList:asc,name:asc`;

        const req = await fetch(url);
        const res = await req.json();
        return res.data;

    }


};






export default doctorData;
