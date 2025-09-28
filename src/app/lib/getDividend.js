// app/lib/getDividend.js
const dividendData = {
  getData: async (URLParams) => {
    const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL + `/dividends?populate=*`;

    let query = "";

    // Name filter
    if (URLParams.name) {
      query += `&filters[name][$eq]=${encodeURIComponent(URLParams.name)}`;
    } else {
      query += `&filters[name][$eq]=`; // match empty name if missing
    }

    // Folio filter
    if (URLParams.folio) {
      query += `&filters[folioNo][$eq]=${encodeURIComponent(URLParams.folio)}`;
    } else {
      query += `&filters[folioNo][$eq]=`; // match empty folio if missing
    }

    // Financial year filter
    if (URLParams.fy) {
      query += `&filters[financialYear][$eq]=${encodeURIComponent(URLParams.fy)}`;
    } else {
      query += `&filters[financialYear][$null]=true`; // match empty FY if missing
      // OR use: `&filters[financialYear][$null]=true` if your CMS stores null instead of ""
    }

    const apiUrl = baseUrl + query;

    try {
      const req = await fetch(apiUrl);
      const res = await req.json();
      return res.data?.[0] || null;
    } catch (err) {
      console.error("Error fetching dividend data:", err);
      return null;
    }
  },
};

export default dividendData;
