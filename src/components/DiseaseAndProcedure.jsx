"use client"
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState } from 'react'
import Popup from './Popup';

const DiseaseAndProcedure = ({ dataSet }) => {
    const [staticTexts, setStaticTexts] = useState({});


    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();
    }, []);

    return; //Removable
    if (dataSet.dataDiseas.length < 1 && dataSet.dataProcedure.length < 1) {
        return;
    }

    return (
        <>

            <section className="section"
                style={{ background: "linear-gradient(180deg,rgba(255, 255, 255, 1) 45%, rgba(248, 248, 248, 1) 74%)" }}>
                <div className="container">

                    <div className="detsils-key-procedures">
                        <div className="main-heading text-center mb-5">
                            <h2>{dataSet.sectionTitle}</h2>
                        </div>

                        <div className="details-key-row">
                            <div className="row justify-content-between">

                                {dataSet.dataDiseas.length > 0 &&
                                    <>
                                        <div className="col-md-4 mb-lg-0 mb-3">
                                            {
                                                dataSet.dataDiseas?.slice(0, Math.ceil(dataSet.dataDiseas.length / 2)).map((d, index) => {
                                                    return <a href={dataSet.baseUrlLangOnly + "/disease/" + d.disease.slug} key={index}>
                                                        <div className="details-key-box">
                                                            <div className="details-key-left-col">
                                                                <h5>{d.title}</h5>
                                                            </div>
                                                            <div className="details-key-right-col">
                                                                <span>C</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                })
                                            }

                                            <div className="over-all-btn text-start mt-3 ms-2 ps-1 d-lg-block d-none">
                                                <a href={dataSet.buttonURLDisease}>{staticTexts[dataSet.buttonTextDiseas]} <span><img src="/img/slider-right-arrow.svg"
                                                    className="img-fluid" alt="" /></span></a>
                                            </div>
                                        </div>


                                        <div className="col-md-4 mb-lg-0 mb-3">
                                            {
                                                dataSet.dataDiseas?.slice(Math.ceil(dataSet.dataDiseas.length / 2),).map((d, index) => {
                                                    return <a href={dataSet.baseUrlLangOnly + "/disease/" + d.disease.slug} key={index}>
                                                        <div className="details-key-box">
                                                            <div className="details-key-left-col">
                                                                <h5>{d.title}</h5>
                                                            </div>
                                                            <div className="details-key-right-col">
                                                                <span>C</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                })
                                            }
                                        </div>
                                        <div className="over-all-btn text-start mb-3 ms-2 ps-1 d-lg-none d-block">
                                            <a href={dataSet.buttonURLDisease}>{staticTexts[dataSet.buttonTextDiseas]} <span><img src="/img/slider-right-arrow.svg"
                                                className="img-fluid" alt="" /></span></a>
                                        </div>
                                    </>
                                }





                                {dataSet.dataProcedure.length > 0 && <div className="col-md-4 mb-lg-0 mb-3">
                                    {
                                        dataSet.dataProcedure?.map((p, index) => {
                                            return <a href={dataSet.baseUrlLangOnly + "/procedure/" + p.procedure.slug} key={index}>
                                                <div className="details-key-box">
                                                    <div className="details-key-left-col">
                                                        <h5>{p.title}</h5>
                                                    </div>
                                                    <div className="details-key-right-col">
                                                        <span>T</span>
                                                    </div>
                                                </div>
                                            </a>
                                        })
                                    }

                                    <div className="over-all-btn text-start mt-3 ms-2 ps-1">
                                        <a href={dataSet.buttonURLProcedure}>{staticTexts[dataSet.buttonTextProcedure]}<span><img src="/img/slider-right-arrow.svg"
                                            className="img-fluid" alt="" /></span></a>
                                    </div>

                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* <section className="section"
                    style={{ background: "linear-gradient(180deg,rgba(255, 255, 255, 1) 45%, rgba(248, 248, 248, 1) 74%)" }}>
                    <div className="container">
                        <div className="main-heading text-center">
                            <h2>Treatments</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-lg-0 mb-3">
                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                                    <span>Coronary Artery Disease (CAD)</span>
                                                </button>
                                            </h2>
                                            <div id="collapse1" className="accordion-collapse collapse show">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse105" aria-expanded="true" aria-controls="collapse105">
                                                    <span>Severe Left Main Coronary Artery Disease</span>
                                                </button>
                                            </h2>
                                            <div id="collapse105" className="accordion-collapse collapse">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse106" aria-expanded="true" aria-controls="collapse106">
                                                    <span>Post-Myocardial Infarction Complications</span>
                                                </button>
                                            </h2>
                                            <div id="collapse106" className="accordion-collapse collapse">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="col-md-4 mb-lg-0 mb-3">
                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
                                                    <span>Myocardial Ischemia</span>
                                                </button>
                                            </h2>
                                            <div id="collapse2" className="accordion-collapse collapse show">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Myocardial ischemia occurs when reduced blood flow to the heart deprives it
                                                        of oxygen, causing chest pain (angina), shortness . . . .<span> Read
                                                            More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse107" aria-expanded="true" aria-controls="collapse107">
                                                    <span>Multi-Vessel Coronary Artery Disease</span>
                                                </button>
                                            </h2>
                                            <div id="collapse107" className="accordion-collapse collapse">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse108" aria-expanded="true" aria-controls="collapse108">
                                                    <span>Heart Failure</span>
                                                </button>
                                            </h2>
                                            <div id="collapse108" className="accordion-collapse collapse">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>



                            </div>

                            <div className="col-md-4 mb-lg-0 mb-3">
                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse3" aria-expanded="true" aria-controls="collapse3">
                                                    <span>Chronic Stable Angina</span>
                                                </button>
                                            </h2>
                                            <div id="collapse3" className="accordion-collapse collapse show">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Chronic Stable Angina is chest pain or discomfort due to reduced blood flow
                                                        to the heart. It occurs during exertion or stress and is. . . .<span> Read
                                                            More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="procedure-acc-card mb-3">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapse109" aria-expanded="true" aria-controls="collapse109">
                                                    <span>Acute Coronary Syndrome (ACS)</span>
                                                </button>
                                            </h2>
                                            <div id="collapse109" className="accordion-collapse collapse">
                                                <div className="accordion-body px-0 pt-0">
                                                    <p>Coronary Artery Disease (CAD) occurs when plaque buildup narrows coronary
                                                        arteries, reducing blood flow to the . . . . <span> Read More</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </section> */}



        </>
    )
}

export default DiseaseAndProcedure;
