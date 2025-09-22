import { cookies, headers } from 'next/headers';

export const getBaseUrl = async (lang = false, loc = false) => {
  const cookieStore = await cookies();
  const headersList = await headers();

  // Build base URL dynamically from request
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const host = headersList.get("x-forwarded-host") || headersList.get("host");
  let baseUrl = `${protocol}://${host}`;
  

  // Get language/location cookies
  let langFromStorage;
  let locationFromStorage;

  try {
    langFromStorage = JSON.parse(cookieStore.get("systemLang")?.value || "{}");
    locationFromStorage = JSON.parse(cookieStore.get("systemLocation")?.value || "{}");
  } catch (e) {
    // fallback if cookie parsing fails
    langFromStorage = {};
    locationFromStorage = {};
  }

  // Append language slug if needed
  if (lang && langFromStorage.default === false && langFromStorage.slug) {
    baseUrl = `${baseUrl}/${langFromStorage.slug}`;
  }

  // Append location slug if needed
  if (loc && locationFromStorage.default === false && locationFromStorage.slug) {
    baseUrl = `${baseUrl}/${locationFromStorage.slug}`;
  }

  return baseUrl;
};
