const langLoc = {
    //Get all locations
    getLocations: async (isHeader = false) => {
        let response;
        try {
            if (isHeader) {
                response = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/locations?filters[isDefault][$eq]=false&sort=manageAppearance.orderInMasterList:asc,title:asc`)
            } else {
                response = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/locations?filters[showInCMS][$eq]=true&sort=manageAppearance.orderInMasterList:asc,title:asc`)
            }

            const res = await response.json();

            return res.data;

        } catch (error) {
            console.log("Err:", error)
        }
    },


    //Get all locations
    getLocationsOnlyCMS: async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/locations?filters[showInCMS][$eq]=true&sort=manageAppearance.orderInMasterList:asc,title:asc`)
            const res = await response.json();

            return res.data;

        } catch (error) {
            console.log("Err:", error)
        }
    },


    // Get all languages;
    getLanguages: async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/i18n/locales`);
            const res = await response.json();

            return res;

        } catch (error) {
            console.log("Err:", error);
        }
    },

}


export default langLoc;
