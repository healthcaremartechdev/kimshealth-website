import Cookies from "js-cookie";

export const getBaseUrl = (lang = false, loc = false) => {
  let langFromStorage;
  let locationFromStorage;

  // Always use current browser URL instead of env
  let baseUrl = `${window.location.protocol}//${window.location.host}`;

  try {
    langFromStorage = JSON.parse(Cookies.get("systemLang") || "{}");
    locationFromStorage = JSON.parse(Cookies.get("systemLocation") || "{}");
  } catch (e) {
    langFromStorage = {};
    locationFromStorage = {};
  }

  if (lang && langFromStorage.default === false && langFromStorage.slug) {
    baseUrl = `${baseUrl}/${langFromStorage.slug}`;
  }

  if (loc && locationFromStorage.default === false && locationFromStorage.slug) {
    baseUrl = `${baseUrl}/${locationFromStorage.slug}`;
  }

  return baseUrl;
};
