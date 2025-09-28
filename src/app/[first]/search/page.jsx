import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import serachData from '@/app/lib/getSearchData';
import SearchBox from '@/components/Forms/SearchBox';



const SearchPage = async ({ searchParams }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const data = await getStaticPageContent("search");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();
    const URLParams = await searchParams;

    const allPages = await serachData.getPages({ langLoc: getLangLoc, URLParams: URLParams });
    const allSpeciality = await serachData.getSpeciality({ langLoc: getLangLoc, URLParams: URLParams });
    const allDoctor = await serachData.getDoctor({ langLoc: getLangLoc, URLParams: URLParams });
    const allBlog = await serachData.allBlog({ langLoc: getLangLoc, URLParams: URLParams });

    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="ethics-committee-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{`${pageContent[0]?.title}'${URLParams.query}'`}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={pageContent[0]?.title + URLParams.query}
                                        middleTitle={''}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section pb-0">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-md-4 mb-3">
                                    <div className="main-heading">
                                        <h2 className="mb-0">{staticText["Search Result"]}</h2>
                                    </div>
                                    <div className="details-key-row rounded-field-form">
                                        <div className="input-group p-0 my-lg-3 my-3">
                                            <SearchBox query={URLParams.query ? URLParams.query : ""} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {allPages.length > 0 && <>
                        <section className="section">
                            <div className="container">
                                <div className="main-heading main-list sub-heading">
                                    <h2>{staticText['Pages']}</h2>
                                    <div>
                                        <ul>
                                            {
                                                allPages.map((data, index) => {
                                                    return <li key={"pages" + index}>
                                                        <a href={basePath + "/" + data.pageCategory.slug}>{data.pageCategory.title}</a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="line-divider"></div>
                    </>
                    }


                    {allSpeciality.length > 0 && <>
                        <section className="section">
                            <div className="container">
                                <div className="main-heading main-list sub-heading">
                                    <h2>{staticText['Speciality']}</h2>
                                    <div>
                                        <ul>
                                            {
                                                allSpeciality.map((data, index) => {
                                                    return <li key={"speciality" + index}>
                                                        <a href={basePath + "/speciality/" + data.speciality?.slug}>{data.speciality?.title}</a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="line-divider"></div>
                    </>
                    }


                    {allDoctor.length > 0 && <>
                        <section className="section">
                            <div className="container">
                                <div className="main-heading main-list sub-heading">
                                    <h2>{staticText['Doctors']}</h2>
                                    <div>
                                        <ul>
                                            {
                                                allDoctor.map((data, index) => {
                                                    return <li key={"doctor" + index}>
                                                        <a href={basePath + "/doctor/" + data.slug}>{`${data.salutation ? data.salutation + " " : ""}${data.name}`}</a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="line-divider"></div>
                    </>
                    }


                    {allBlog.length > 0 && <>
                        <section className="section">
                            <div className="container">
                                <div className="main-heading main-list sub-heading">
                                    <h2>{staticText['Blogs']}</h2>
                                    <div>
                                        <ul>
                                            {
                                                allBlog.map((data, index) => {
                                                    return <li key={"blog" + index}>
                                                        <a href={basePath + "/blog/" + data.slug}>{data.title}</a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                    }

                </div>
            </div>
            <Footer />
        </>
    )
}

export default SearchPage;
