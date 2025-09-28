import { NextResponse } from 'next/server';
import redirects from './redirect';


export async function middleware(request) {
    // // Redirection:::::::::::::::::::::::::
    const redirectUrl = request.nextUrl.clone();

    // build full URL (pathname + search)
    const fullPath = redirectUrl.pathname + redirectUrl.search;

    // ensure redirects is an array (in case of default export from JSON)
    const list = Array.isArray(redirects) ? redirects : redirects.default;

    // match either full path (with query) or just pathname
    const match =
        list.find((r) => fullPath === r.source) ||
        list.find((r) => redirectUrl.pathname === r.source);

    

    if (match && match.source !== match.destination) {
        redirectUrl.pathname = match.destination;
        redirectUrl.search = ""; // ✅ remove all query params

        

        return NextResponse.redirect(redirectUrl, 301);
    }
    // // End redirection:::::::::::::::::::::







    // Lang/Location detection :::::::::::::::::::::::::::::::::::::::::::::

    const { nextUrl } = request;
    const url = nextUrl.pathname;
    const segments = url.split('/').filter(Boolean);


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

    // Set Which page;
    response.headers.set("x-meta-page", url)

    // Set cookies
    response.cookies.set("systemLang", JSON.stringify(lang), { path: "/", maxAge: 60 * 60 * 24 * 365 });
    response.cookies.set("systemLocation", JSON.stringify(loc), { path: "/", maxAge: 60 * 60 * 24 * 365 });



    return response;

    // End Lang/Location detection :::::::::::::::::::::::::::::::::::::::::::::
}

export const config = {
    matcher: [
        // Match everything except static files, images, fonts, and APIs
        "/((?!_next/|api/|js/|css/|img/|fonts/|.well-known/|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};

