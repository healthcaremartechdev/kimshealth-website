import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import investorData from '@/app/lib/getInvestor';
import Breadcrumb from '@/components/Breadcrumb';
import getStaticText from '@/app/lib/getStaticTextServer';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import CorporateForm from '@/components/Forms/CorporateForm';
import corporateFile from '@/app/lib/getCorporateFile';


const Investor = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection&populate[5]=pageContent.journal&populate[6]=pageContent.journal.thumbnailImage&populate[7]=pageContent.journal.file&populate[8]=pageContent.file&populate[9]=pageContent.courseCategory&populate[10]=pageContent.socomer&populate[11]=pageContent.socomer.socomerItem&populate[12]=pageContent.socomer.socomerItem.file&populate[13]=pageContent.item&&populate[14]=pageContent.item.events";
    const data = await getStaticPageContent("corporate", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticTexts = await getStaticText();

    const getAllInvestorDirector = await investorData.getAll({ type: 'Directors & Advisory Board', langLoc: getLangLoc })
    const getAllInvestorPatrons = await investorData.getAll({ type: 'Patrons', langLoc: getLangLoc })

    const events = pageContent[4]?.item[0].events || [];
    const chunkSize = Math.ceil(events.length / 4);

    const parts = [];
    for (let i = 0; i < events.length; i += chunkSize) {
        parts.push(events.slice(i, i + chunkSize));
    }



    
    const corporateDataSet = {
        generalMeeting: await corporateFile.getAll({ langLoc: getLangLoc, type: 'Notice of General Meetings' }),
        annualReport: await corporateFile.getAll({ langLoc: getLangLoc, type: 'Download Annual Report' }),
        draftAnnualReturn: await corporateFile.getAll({ langLoc: getLangLoc, type: 'Download Draft Annual Return' }),
    };

    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="find-doctor-main-page">
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
                                        activeTitle={pageContent[0]?.title}
                                        middleTitle={''}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {pageContent[1].title && <section className="section expert-section">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{pageContent[1].title}</h2>
                            </div>

                            <div className="row">
                                {
                                    getAllInvestorDirector?.slice(0, 8).map((l, i) => {
                                        return <div className="col-md-3 col-6 mb-4" key={i}>
                                            <div className="expert-card" data-aos="fade-right">
                                                <div className="card border-0 p-lg-4 p-0">
                                                    <div className="card-top">
                                                        <img src={l.image ? process.env.NEXT_PUBLIC_IMAGE_URL + l?.image?.url : "/img/no-image.jpg"}
                                                            className="img-fluid w-100" alt={l.name} />
                                                    </div>
                                                    <div className="card-content">
                                                        <h4>{l.name}</h4>
                                                        <p>{l.designation}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </section>}

                    {pageContent[1].title && <div className="line-divider"></div>}

                    {pageContent[2].title && <section className="section expert-section">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{pageContent[2].title}</h2>
                            </div>

                            <div className="row">
                                {
                                    getAllInvestorPatrons.slice(0, 8).map((l, i) => {
                                        return <div className="col-md-3 col-6 mb-4" key={i}>
                                            <div className="expert-card" data-aos="fade-right">
                                                <div className="card border-0 p-lg-4 p-0">
                                                    <div className="card-top">
                                                        <img src={l.image ? process.env.NEXT_PUBLIC_IMAGE_URL + l?.image?.url : "/img/no-image.jpg"}
                                                            className="img-fluid w-100" alt={l.name} />
                                                    </div>
                                                    <div className="card-content">
                                                        <h4>{l.name}</h4>
                                                        <p>{l.designation}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </section>}

                </div>
                {pageContent[2].title && <div className="line-divider"> </div>}


                    <section className="section">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{pageContent[3].title}</h2>
                            </div>

                            {pageContent[3].title && (
                                <div className="row">
                                    {pageContent[3].socomer?.map((sp, i) => (
                                        <div className="col-md-6" key={i}>
                                            <div className="socomer-tab">
                                                <div className="procedure-acc-card mb-0">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button
                                                                className="accordion-button"
                                                                type="button"
                                                            >
                                                                <span>{sp.title}</span>
                                                            </button>
                                                        </h2>
                                                        <div
                                                            className="accordion-collapse collapse show"
                                                        >
                                                            <div className="accordion-body px-0 pt-0">
                                                                <ul>
                                                                    {sp.socomerItem.map((spI, j) => (
                                                                        <li key={j}>
                                                                            - {spI.title}
                                                                            <a
                                                                                href={
                                                                                    spI.file?.url
                                                                                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${spI.file.url}`
                                                                                        : spI.link
                                                                                }
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                <i className="custom-download"></i>
                                                                                {spI.buttonText}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <CorporateForm dataSet={corporateDataSet} />
                        </div>
                    </section>

                {pageContent[3].title && <div className="line-divider"> </div>}


                {pageContent[4]?.item[0]?.title && <section className="section journal-section">
                    <div className="container">
                        <div className="main-heading">
                            <h2>{pageContent[4]?.item[0]?.title}</h2>
                        </div>

                        <div className="row">
                            <div className="col-md-3 main-list">
                                <ul>
                                    {
                                        parts[0]?.map((data, _) => {
                                            return <li>{data.title}</li>
                                        })
                                    }
                                </ul>

                            </div>
                            <div className="col-md-3 main-list">
                                <ul>
                                    {
                                        parts[1]?.map((data, _) => {
                                            return <li>{data.title}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="col-md-3 main-list">
                                <ul>
                                    {
                                        parts[2]?.map((data, _) => {
                                            return <li>{data.title}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="col-md-3 main-list">
                                <ul>
                                    {
                                        parts[3]?.map((data, _) => {
                                            return <li>{data.title}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>}
                {pageContent[4]?.item[0]?.title && <div className="line-divider"> </div>}


                {pageContent[5].title && <section className="section journal-section">
                    <div className="container">
                        <div className="main-heading">
                            <h2>{pageContent[5]?.title}</h2>
                        </div>

                        <div className='main-heading sub-heading main-list'
                            dangerouslySetInnerHTML={{ __html: pageContent[5]?.details }}>
                        </div>
                    </div>
                </section>}

            </div>
            <Footer />
        </>
    )
}

export default Investor;
