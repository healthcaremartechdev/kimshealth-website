import Script from "next/script";
import { getStaticPageContent } from "./lib/getStaticPageContent";
import { headers } from "next/headers";
import parse from "html-react-parser";
import getMetadata from "./lib/getMetaData";


// *******************************
// JAY JAGANNATH O!O JAY JAGANNATH
// *******************************
// *******************************
// Developed by Techinnovator team
// *******************************

// export async function generateMetadata() {
//   const metaData = await getMetadata();

//   return {
//     title: metaData?.metaTitle || "KIMSHEALTH",
//     description: metaData?.metaDescription || "KIMSHEALTH",
//     keywords: metaData?.metaKeyword || "KIMSHEALTH",
//     icons: {
//       icon: "/img/favicon.ico",
//     },
//     other: metaData?.extraHeaderCode ? parse(metaData.extraHeaderCode) : undefined,
//   };
// }

export default async function RootLayout({ children }) {
  let metaData = await getMetadata();


  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metaData?.metaTitle || "KIMSHEALTH"}</title>
        <meta name="description" content={metaData?.metaDescription || "KIMSHEALTH"}/>
        <meta name="keywords" content={metaData?.metaKeyword || "KIMSHEALTH"}/>
        {metaData?.extraHeaderCode &&<>{parse(metaData?.extraHeaderCode)}</>}
        <link rel="icon" href="/img/favicon.ico" sizes="any" />
        {/* <!-- bootstrap cdn --> */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
        {/* <!-- font-awasome cdn --> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
        {/* <!-- owl-carousel --> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
        <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" />

        {/* <!-- simple line-icon --> */}
        {/* <!-- <link rel="stylesheet" href="simple-line-icons/css/simple-line-icons.min.css"> --> */}
        <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css" />

        <link rel="stylesheet" href="/css/custom.css" />
        <link rel="stylesheet" href="/css/responsive.css" />

        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/css/bootstrap-datepicker.standalone.min.css" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/css/intlTelInput.css" />
        <link rel="stylesheet" href="/css/multislider.css" />


        {/* All Scripts */}
        <Script strategy="beforeInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></Script>
        <Script strategy="beforeInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></Script>
        <Script strategy="beforeInteractive" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script>
        <Script strategy="beforeInteractive" src="https://unpkg.com/aos@next/dist/aos.js"></Script>
        <Script strategy="beforeInteractive" src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></Script>
        <Script strategy="beforeInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/js/bootstrap-datepicker.min.js"></Script>
        <Script strategy="beforeInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js"></Script>
        <Script strategy="beforeInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/Counter-Up/1.0.0/jquery.counterup.min.js"></Script>
        <Script strategy="beforeInteractive" src="https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/intlTelInput.min.js"></Script>
        <Script src="/js/multislider.min.js" strategy="afterInteractive"></Script>
        <Script src="/js/custom.js" strategy="afterInteractive"></Script>
        <Script src="/js/script.js" strategy="afterInteractive"></Script>
      </head>

      <body>
        {children}
      </body>
    </html>

  );
}
