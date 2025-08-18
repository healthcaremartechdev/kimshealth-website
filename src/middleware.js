import { NextResponse } from 'next/server';


export async function middleware(request) {
    const { nextUrl } = request;
    const url = nextUrl.pathname;
    const segments = url.split('/').filter(Boolean);
    //console.log(url)

    const first = segments[0];
    const second = segments[1];

    const CMS_API = process.env.NEXT_PUBLIC_CMS_API_URL;

    let defaultLang = null;
    let defaultLoc = null;

    let lang = { id: "", slug: "", default: false };
    let loc = { id: "", slug: "", default: false };

    // Fetch default lang
    try {
        const res = await fetch(`${CMS_API}/i18n/locales`);
        const data = await res.json();
        defaultLang = data.find((l) => l.isDefault === true);
    } catch (err) {
        console.error("Lang fetch error", err);
    }

    // Fetch default location
    try {
        const res = await fetch(`${CMS_API}/locations?filters[isDefault][$eq]=true`);
        const data = await res.json();
        defaultLoc = data.data[0];
    } catch (err) {
        console.error("Loc fetch error", err);
    }

    // Lang/loc check helper
    const checkLang = async (param) => {
        try {
            const res = await fetch(`${CMS_API}/i18n/locales`);
            const data = await res.json();
            return data.find((l) => l.code === param) || false;
        } catch {
            return false;
        }
    }

    const checkLoc = async (param) => {
        try {
            const res = await fetch(`${CMS_API}/locations?filters[slug][$eq]=${param}`);
            const data = await res.json();
            return data.data.length ? data.data[0] : false;
        } catch {
            return false;
        }
    }

    // Logic
    if (!first) {
        lang = { id: defaultLang.code, slug: defaultLang.code, default: defaultLang.isDefault };
        loc = { id: defaultLoc.id, slug: defaultLoc.slug, default: defaultLoc.isDefault };
    } else if (!second) {
        const langMatch = await checkLang(first);
        if (langMatch) {
            lang = { id: langMatch.code, slug: langMatch.code, default: langMatch.isDefault };
            loc = { id: defaultLoc.id, slug: defaultLoc.slug, default: defaultLoc.isDefault };
        } else {
            const locMatch = await checkLoc(first);
            if (locMatch) {
                lang = { id: defaultLang.code, slug: defaultLang.code, default: defaultLang.isDefault };
                loc = { id: locMatch.id, slug: locMatch.slug, default: locMatch.isDefault };
            } else {
                lang = { id: defaultLang.code, slug: defaultLang.code, default: defaultLang.isDefault };
                loc = { id: defaultLoc.id, slug: defaultLoc.slug, default: defaultLoc.isDefault };
            }
        }
    } else {
        const langMatch = await checkLang(first);
        if (langMatch) {
            lang = { id: langMatch.code, slug: langMatch.code, default: langMatch.isDefault };
            loc = { id: defaultLoc.id, slug: defaultLoc.slug, default: defaultLoc.isDefault };
        } else {
            const locMatch = await checkLoc(first);
            if (locMatch) {
                lang = { id: defaultLang.code, slug: defaultLang.code, default: defaultLang.isDefault };
                loc = { id: locMatch.id, slug: locMatch.slug, default: locMatch.isDefault };
            } else {
                lang = { id: defaultLang.code, slug: defaultLang.code, default: defaultLang.isDefault };
                loc = { id: defaultLoc.id, slug: defaultLoc.slug, default: defaultLoc.isDefault };
            }
        }

        const secondLoc = await checkLoc(second);
        if (secondLoc) {
            loc = { id: secondLoc.id, slug: secondLoc.slug, default: secondLoc.isDefault };
        }
    }

    const response = NextResponse.next();

    // Set cookies
    response.cookies.set("systemLang", JSON.stringify(lang), { path: "/", maxAge: 60 * 60 * 24 * 365 });
    response.cookies.set("systemLocation", JSON.stringify(loc), { path: "/", maxAge: 60 * 60 * 24 * 365 });


    //console.log(lang, loc)

    return response;
}

export const config = {
  matcher: [
    // Match everything except static files, images, fonts, and APIs
    "/((?!_next/|api/|js/|css/|img/|fonts/|.well-known/|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

