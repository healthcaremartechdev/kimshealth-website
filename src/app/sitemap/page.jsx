import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import urlList from '@/app/lib/getURLList';



const SiteMapPage = async ({ searchParams }) => {
    const URLParams = await searchParams;
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const data = await getStaticPageContent("sitemap");
    const pageContent = data?.data[0]?.pageContent;
    const staticText = await getStaticText();

    const allPages = await urlList.getPages({ langLoc: getLangLoc });
    const allHospital = await urlList.getHospital({ langLoc: getLangLoc });
    const allSpeciality = await urlList.getSpeciality({ langLoc: getLangLoc });
    const allDoctor = await urlList.getDoctor({ langLoc: getLangLoc });
    const allBlog = await urlList.allBlog({ langLoc: getLangLoc });
    const allTestimonial = await urlList.getTestimonial({ langLoc: getLangLoc });
    const allDoctorTalk = await urlList.getDoctorTalk({ langLoc: getLangLoc });
    const allAtHomeServices = await urlList.getAtHomeService({ langLoc: getLangLoc });



    if (URLParams.view === "list") {
        return (
            <div role="main" className="main">
                <div className="ethics-committee-main-page">

                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>All Data</h2>

                                <button className="btn btn-primary mb-3" id='sitemap-copy-button'>
                                    Copy Data
                                </button>
                                <div>
                                    <table className="table table-bordered" id='sitemap-table'> 
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>URL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Static Pages */}
                                            {allPages.length > 0 && (
                                                <>
                                                    <tr>
                                                        <td colSpan="2"><strong>{staticText['Pages']}</strong></td>
                                                    </tr>
                                                    {allPages.map((data, index) => {
                                                        const url = basePath + "/" + data.pageCategory.slug;
                                                        return (
                                                            <tr key={"pages" + index}>
                                                                <td><a href={url}>{data.pageCategory.title}</a></td>
                                                                <td>{url}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            )}

                                            {/* Hospitals */}
                                            {allHospital.length > 0 && (
                                                <>
                                                    <tr>
                                                        <td colSpan="2"><strong>{staticText['Hospitals']}</strong></td>
                                                    </tr>
                                                    {allHospital.map((data, index) => {
                                                        const url = basePath + "/hospital/" + data.slug;
                                                        return (
                                                            <tr key={"hospital" + index}>
                                                                <td><a href={url}>{data.title}</a></td>
                                                                <td>{url}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            )}

                                            {/* Speciality */}
                                            {allSpeciality.length > 0 && (
                                                <>
                                                    <tr>
                                                        <td colSpan="2"><strong>{staticText['Speciality']}</strong></td>
                                                    </tr>
                                                    {allSpeciality.map((data, index) => {
                                                        const url = basePath + "/speciality/" + data.speciality?.slug;
                                                        return (
                                                            <tr key={"speciality" + index}>
                                                                <td><a href={url}>{data.speciality?.title}</a></td>
                                                                <td>{url}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            )}

                                            {/* Doctors */}
                                            {allDoctor.length > 0 && (
                                                <>
                                                    <tr>
                                                        <td colSpan="2"><strong>{staticText['Doctors']}</strong></td>
                                                    </tr>
                                                    {allDoctor.map((data, index) => {
                                                        const title = `${data.salutation ? data.salutation + " " : ""}${data.name}`;
                                                        const url = basePath + "/doctor/" + data.slug;
                                                        return (
                                                            <tr key={"doctor" + index}>
                                                                <td><a href={url}>{title}</a></td>
                                                                <td>{url}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            )}

                                            {/* Blogs */}
                                            {allBlog.length > 0 && (
                                                <>
                                                    <tr>
                                                        <td colSpan="2"><strong>{staticText['Blogs']}</strong></td>
                                                    </tr>
                                                    {allBlog.map((data, index) => {
                                                        const url = basePath + "/blog/" + data.slug;
                                                        return (
                                                            <tr key={"blog" + index}>
                                                                <td><a href={url}>{data.title}</a></td>
                                                                <td>{url}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            )}

                                            {/* Testimonial */}
                                            {allTestimonial.length > 0 && (
                                                <>
                                                    <tr>
                                                        <td colSpan="2"><strong>{staticText['Testimonial']}</strong></td>
                                                    </tr>
                                                    {allTestimonial.map((data, index) => {
                                                        const url = basePath + "/testimonial/" + data.slug;
                                                        return (
                                                            <tr key={"testimonial" + index}>
                                                                <td><a href={url}>{data.title}</a></td>
                                                                <td>{url}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            )}

                                            {/* Doctor Talk */}
                                            {allDoctorTalk.length > 0 && (
                                                <>
                                                    <tr>
                                                        <td colSpan="2"><strong>{staticText['Expert Talks']}</strong></td>
                                                    </tr>
                                                    {allDoctorTalk.map((data, index) => {
                                                        const url = basePath + "/doctor-talk/" + data.slug;
                                                        return (
                                                            <tr key={"doctortalk" + index}>
                                                                <td><a href={url}>{data.title}</a></td>
                                                                <td>{url}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            )}

                                            {/* At Home Services */}
                                            {allAtHomeServices.length > 0 && (
                                                <>
                                                    <tr>
                                                        <td colSpan="2"><strong>{staticText['At Home Services']}</strong></td>
                                                    </tr>
                                                    {allAtHomeServices.map((data, index) => {
                                                        const url = basePath + "/at-home-services/" + data.slug;
                                                        return (
                                                            <tr key={"athomeservices" + index}>
                                                                <td><a href={url}>{data.title}</a></td>
                                                                <td>{url}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>


        )
    }

    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="ethics-committee-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent[0]?.title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={pageContent[0]?.title}
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
                                        <h2 className="mb-0">{pageContent[0]?.title}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Static page  */}
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

                    {/* All Hospitals */}
                    {allHospital.length > 0 && <>
                        <section className="section">
                            <div className="container">
                                <div className="main-heading main-list sub-heading">
                                    <h2>{staticText['Hospitals']}</h2>
                                    <div>
                                        <ul>
                                            {
                                                allHospital.map((data, index) => {
                                                    return <li key={"hospital" + index}>
                                                        <a href={basePath + "/hospital/" + data.slug}>{data.title}</a>
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

                    {/* All speciality */}
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

                    {/* All Doctors */}
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

                    {/* All Blogs */}
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
                        <div className="line-divider"></div>
                    </>
                    }

                    {/* All Testimonial */}
                    {allTestimonial.length > 0 && <>
                        <section className="section">
                            <div className="container">
                                <div className="main-heading main-list sub-heading">
                                    <h2>{staticText['Testimonial']}</h2>
                                    <div>
                                        <ul>
                                            {
                                                allTestimonial.map((data, index) => {
                                                    return <li key={"testimonial" + index}>
                                                        <a href={basePath + "/testimonial/" + data.slug}>{data.title}</a>
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

                    {/* All Doctor Talk */}
                    {allDoctorTalk.length > 0 && <>
                        <section className="section">
                            <div className="container">
                                <div className="main-heading main-list sub-heading">
                                    <h2>{staticText['Expert Talks']}</h2>
                                    <div>
                                        <ul>
                                            {
                                                allDoctorTalk.map((data, index) => {
                                                    return <li key={"doctortalk" + index}>
                                                        <a href={basePath + "/doctor-talk/" + data.slug}>{data.title}</a>
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

                    {/* All At Home Services*/}
                    {allAtHomeServices.length > 0 && <>
                        <section className="section">
                            <div className="container">
                                <div className="main-heading main-list sub-heading">
                                    <h2>{staticText['At Home Services']}</h2>
                                    <div>
                                        <ul>
                                            {
                                                allAtHomeServices.map((data, index) => {
                                                    return <li key={"athomeservices" + index}>
                                                        <a href={basePath + "/at-home-services/" + data.slug}>{data.title}</a>
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

                </div>
            </div>
            <Footer />
        </>
    )
}

export default SiteMapPage;
