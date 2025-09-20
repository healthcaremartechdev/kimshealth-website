"use client"
import VisaMedicalForm from "./Forms/VisaMedicalForm"

const VisaMedicalTab = ({ pageContent }) => {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="sticky-left">
                            <div className="find-doctor-left-col">
                                <div className="row">
                                    <div className="tab-group d-md-block d-none text-center mb-3">
                                        <button type="button" className="btn-tab treat-tab active omega"
                                            onClick={() => showBox('omega')}>
                                            {pageContent[1]?.title}
                                        </button>

                                        <button type="button" className="btn-tab treat-tab omega1"
                                            onClick={() => showBox('omega1')}>
                                            {pageContent[2]?.title}
                                        </button>

                                        <button type="button" className="btn-tab treat-tab omega2"
                                            onClick={() => showBox('omega2')}>
                                            {pageContent[3]?.title}
                                        </button>

                                        <button type="button" className="btn-tab treat-tab omega3"
                                            onClick={() => showBox('omega3')}>
                                            {pageContent[4]?.title}
                                        </button>
                                    </div>
                                    <div className="visa-select d-md-none d-block">
                                        <select className="form-select" aria-label="Default select example" onChange={(e) => {
                                            showBox('omega' + e.target.value)
                                        }}>
                                            <option value="">{pageContent[1]?.title}</option>
                                            <option value="1">{pageContent[2]?.title}</option>
                                            <option value="2">{pageContent[3]?.title}</option>
                                            <option value="3">{pageContent[4]?.title}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="find-doc-box d-md-block d-none">
                                    <VisaMedicalForm title={pageContent[5]?.title} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 expert-section">
                        <div className="treat-box" id="omega" style={{ display: "block" }}>
                            <div
                                dangerouslySetInnerHTML={{ __html: pageContent[1]?.details }}
                                className="main-heading sub-heading main-list">
                            </div>
                        </div>

                        <div className="treat-box" id="omega1" style={{ display: "none" }}>
                            <div
                                dangerouslySetInnerHTML={{ __html: pageContent[2]?.details }}
                                className="main-heading sub-heading main-list">
                            </div>
                        </div>

                        <div className="treat-box" id="omega2" style={{ display: "none" }}>
                            <div
                                dangerouslySetInnerHTML={{ __html: pageContent[3]?.details }}
                                className="main-heading sub-heading main-list">
                            </div>
                        </div>

                        <div className="treat-box" id="omega3" style={{ display: "none" }}>
                            <div
                                dangerouslySetInnerHTML={{ __html: pageContent[4]?.details }}
                                className="main-heading sub-heading main-list">
                            </div>
                        </div>
                    </div>

                    <div className="find-doctor-left-col d-md-none d-block">
                        <div className="find-doc-box">
                            <VisaMedicalForm title={pageContent[5]?.title} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VisaMedicalTab