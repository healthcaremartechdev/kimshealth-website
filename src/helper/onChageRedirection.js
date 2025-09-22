const checkLang = async (param) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/i18n/locales`);
        const data = await response.json();

        const res = data.find(locale => locale.code === param);

        return res ? true : false;

    } catch (error) {
        console.log("Err:", error)
    }
}

const checkLoc = async (param) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/locations?filters[slug][$eq]=${param}`);
        const res = await response.json();

        return res.data.length > 0 ? true : false;

    } catch (error) {
        console.log("Err:", error)
    }
}

const onLangChangeRedirection = async (e) => {
    const data = JSON.parse(e.target.options[e.target.selectedIndex].dataset.fulldata);
    const cookieData = JSON.stringify({id: data.code, slug: data.code, default: data.isDefault});
    const mainUrl = new URL(window.location.href);
    const segments = mainUrl.pathname.split('/').filter(Boolean)
    const first = segments[0]
    let redirectUrl;
    let isLang;

    isLang = await checkLang(first);

    if (first === undefined && data.isDefault) {
        redirectUrl = location.href;
    }
    else if (first === undefined && data.isDefault === false) {
        redirectUrl = location.href + "/" + data.code;
    }
    else if (isLang && data.isDefault) {
        redirectUrl = location.href.replace("/" + first, "");
    }
    else if (isLang && data.isDefault === false) {
        redirectUrl = location.href.replace(first, data.code);
    }
    else if (!isLang && data.isDefault) {
        redirectUrl = location.href;
    }
    else if (!isLang && data.isDefault === false) {
        redirectUrl = location.href.replace(location.origin, location.origin + "/" + data.code);
    }


    document.cookie = `systemLang=${cookieData}; path=/; max-age=31536000`;
    window.open(redirectUrl, '_self', 'noreferrer');
    
}


const onLocChangeRedirection = async (e) => {
    const data = e;
    const cookieData = JSON.stringify({id: data.id, slug: data.slug, default: data.isDefault});
    const mainUrl = new URL(window.location.href);
    const segments = mainUrl.pathname.split('/').filter(Boolean)
    const first = segments[0];
    const second = segments[1];
    let redirectUrl;
    let isLang;
    let isLocFirst;
    let isLocSecond;


    isLang = await checkLang(first);

    isLocFirst = await checkLoc(first);
    isLocSecond = await checkLoc(second);


    if (!first && !data) {
        redirectUrl = location.href;
    }
    else if (!first && data) {
        redirectUrl = location.href + "/" + data.slug;
    }
    else if (isLocFirst && !data) {
        redirectUrl = location.href.replace("/" + first, "");
    }
    else if (isLocFirst && data) {
        redirectUrl = location.href.replace(first, data.slug);
    }
    else if (isLocSecond && !data) {
        redirectUrl = location.href.replace("/" + second, "");
    }
    else if (isLocSecond && data) {
        redirectUrl = location.href.replace(second, data.slug);
    }
    else if (!isLocFirst && !isLocSecond && !data) {
        redirectUrl = location.href
    }
    else if (!isLocFirst && !isLocSecond && data) {
        if (isLang)
            redirectUrl = location.href.replace(location.origin + "/" + first, location.origin + "/" + first + "/" + data.slug);
        else
            redirectUrl = location.href.replace(location.origin, location.origin + "/" + data.slug);
    }



    document.cookie = `systemLocation=${cookieData}; path=/; max-age=31536000`;
    window.open(redirectUrl, '_self', 'noreferrer');

}



export {
    onLocChangeRedirection, onLangChangeRedirection
};
