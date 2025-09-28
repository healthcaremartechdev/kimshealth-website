import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';


const removeLastLi = (html) => {
  if (!html || typeof html !== 'string') return html;

  // operate on lowercase copy to find indices case-insensitively
  const lower = html.toLowerCase();

  // find last closing </ul>
  const ulCloseIdx = lower.lastIndexOf('</ul>');
  if (ulCloseIdx === -1) return html; // no ul found

  // find last </li> that occurs before the closing </ul>
  const liCloseIdx = lower.lastIndexOf('</li>', ulCloseIdx);
  if (liCloseIdx === -1) return html; // no li close found

  // find last opening <li ...> that occurs before that closing </li>
  const liOpenIdx = lower.lastIndexOf('<li', liCloseIdx);
  if (liOpenIdx === -1) return html; // no li open found

  // remove from liOpenIdx up to (and including) the </li>
  const afterLiClose = html.slice(liCloseIdx + '</li>'.length);
  return html.slice(0, liOpenIdx) + afterLiClose;
};

const ThankYou = async ({ searchParams }) => {
  const URLParams = await searchParams;
  const getLangLoc = await getCurrentLangLoc()
  const basePath = await getBaseUrl()
  const data = await getStaticPageContent("thank-you");
  const pageContent = data?.data[0]?.pageContent;
  const pageMeta = data?.data[0]?.metaSection;
  let staticTexts = await getStaticText();

  // handle case where searchParams.msg may be an array
  const rawMsgValue = Array.isArray(URLParams?.msg) ? URLParams.msg[0] : (URLParams?.msg || '');
  const decoded = typeof rawMsgValue === 'string' ? decodeURIComponent(rawMsgValue) : '';

  // primary, safe removal (string-scan)
  let updatedMsg = removeLastLi(decoded);

  // fallback: if nothing changed, try a robust regex (handles newlines)
  if (updatedMsg === decoded) {
    updatedMsg = decoded.replace(/<li[\s\S]*?<\/li>\s*<\/ul>$/i, "</ul>");
  }


  return (
    <>
      <Header />
      <div role="main" className="main">
        <div className="home-service-main-page">
          <div className="page-header">
            <div className="container">
              <h2>{pageContent[0].title}</h2>
            </div>
          </div>
          <section className="breadcrumb-wrapper py-2">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Breadcrumb
                    activeTitle={pageContent[0].title}
                    middleTitle={''}
                    middleURL={''}
                  />
                </div>
              </div>
            </div>
          </section>

          {pageContent[0]?.title && <section className="section">
            <div className="container">
              <div className="row">
                <div className="col-md-6 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                  <div className='main-heading sub-heading main-list'>
                    <div className="alert alert-success" role="alert">
                      <strong>Thank you!</strong> Your form has been submitted successfully.
                    </div>
                  </div>
                </div>
                <div className="col-md-6 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                  <div
                    dangerouslySetInnerHTML={{ __html: updatedMsg || "" }}
                    className="main-heading main-list sub-heading"
                  />
                </div>
              </div>
            </div>
          </section>}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ThankYou
