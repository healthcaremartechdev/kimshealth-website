"use client"
import getStaticText from '@/helper/getStaticText';
import { no } from 'intl-tel-input/i18n';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const CorporateForm = ({ dataSet }) => {
    const [staticTexts, setStaticTexts] = useState({});
    const [loading, setLoading] = useState({notice: false, annual: false, draft: false});


    // separate states for each block
    const [noticeForm, setNoticeForm] = useState({ email: "", report_notice_type: "", type: "Notice of General Meetings" });
    const [annualForm, setAnnualForm] = useState({ email: "", report_notice_type: "", type: "Download Annual Report" });
    const [draftForm, setDraftForm] = useState({ email: "", report_notice_type: "", type: "Download Draft Annual Return" });

    const sendMail = async (formData) => {

        if ([formData.email, formData.report_notice_type].some((field) => !field || field === "")) {
            toast("Fill the required fields", { theme: 'light', type: 'error', closeOnClick: true });
            return;
        }

        let getFile = null;
        if (formData.type === "Download Annual Report") {
            setLoading((prev) => ({...prev, annual: true}));
            let geFileArr = dataSet.annualReport.filter((item, _) => item.title === formData.report_notice_type);
            getFile = geFileArr?.[0]?.file?.[0]?.url;
        }
        else if (formData.type === "Notice of General Meetings") {
            setLoading((prev) => ({...prev, notice: true}));
            
            let geFileArr = dataSet.generalMeeting.filter((item, _) => item.title === formData.report_notice_type);
            
            getFile = geFileArr?.[0]?.file?.[0]?.url;
        }
        else if (formData.type === "Download Draft Annual Return") {
            setLoading((prev) => ({...prev, draft: true}));
            let geFileArr = dataSet.draftAnnualReturn.filter((item, _) => item.title === formData.report_notice_type);
            getFile = geFileArr?.[0]?.file?.[0]?.url;
        }

        try {
            const htmlMsg = `
                <ul>
                    <li><strong> Subject: </strong> ${formData.type}</li>
                    <li><strong> Email: </strong> ${formData.email}</li>
                    <li><strong> Report/Notice: </strong> ${formData.report_notice_type}</li>
                    <li><strong> Page URL: </strong> ${document.location.href}</li>
                </ul>`;

            const req = await fetch("/api/send-mail", {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ data: htmlMsg, formType: "Corporate" }),
            });

            const res = await req.json();
            setLoading({notice: false, annual: false, draft: false});
            if (req.status !== 200) {
                toast(res.err, { theme: 'light', type: 'error', closeOnClick: true });
            } else {
                openOrDownload(getFile)

                toast("Successfully sent", { theme: 'light', type: 'success', closeOnClick: true });
            }

            // reset the specific form
            if (formData.type === "Notice of General Meetings") setNoticeForm({ email: "", report_notice_type: "", type: formData.type });
            if (formData.type === "Download Annual Report") setAnnualForm({ email: "", report_notice_type: "", type: formData.type });
            if (formData.type === "Download Draft Annual Return") setDraftForm({ email: "", report_notice_type: "", type: formData.type });

        } catch (error) {
            
            toast("Something went wrong", { theme: 'light', type: 'error', closeOnClick: true });
        }

        setLoading(false);
    }

    useEffect(() => {
        const fetchTexts = async () => setStaticTexts({ ...await getStaticText() });
        fetchTexts();
    }, []);



    function openOrDownload(getFile) {
        if (!getFile) return;

        const url = process.env.NEXT_PUBLIC_IMAGE_URL + getFile;

        // Try opening in a new tab
        const newWin = window.open(url, "_blank");

        // If blocked, fallback to download
        // if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
        //     const a = document.createElement("a");
        //     a.href = url;
        //     a.target = "_blank";
        //     a.download = getFile; // force download with filename
        //     document.body.appendChild(a);
        //     a.click();
        //     document.body.removeChild(a);
        // }
    }




    return (
        <div className="row">

            {/* Notice Form */}
            <div className="col-md-4 mb-3">
                <div className="corporate-notice-form association-form-card">
                    <h3>{staticTexts['Notice of General Meetings']}</h3>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="input-group mb-lg-0 mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-envelope"></i></span>
                                <input type="text" className="form-control" placeholder={staticTexts['Email']}
                                    value={noticeForm.email}
                                    onChange={(e) => setNoticeForm({ ...noticeForm, email: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="input-group mb-lg-0 mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-pen-to-square"></i></span>
                                <select className="form-select from-location"
                                    value={noticeForm.report_notice_type}
                                    onChange={(e) => setNoticeForm({ ...noticeForm, report_notice_type: e.target.value })}>
                                    <option value="">{staticTexts['Select Notice']}</option>
                                    {
                                        dataSet?.generalMeeting?.map((item) => (
                                            <option key={item.id} value={item.title}>
                                                {item.title}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3 text-start">
                            <button className="btn hospital-primarybtn px-5 py-2"
                                disabled={loading.notice}
                                onClick={() => sendMail(noticeForm)}>
                                {staticTexts['Submit']}
                                {loading.notice && <i className="fas fa-spinner fa-spin ms-1"></i>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Annual Report Form */}
            <div className="col-md-4 mb-3">
                <div className="corporate-notice-form association-form-card">
                    <h3>{staticTexts['Download Annual Report']}</h3>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="input-group mb-lg-0 mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-envelope"></i></span>
                                <input type="text" className="form-control" placeholder={staticTexts['Email']}
                                    value={annualForm.email}
                                    onChange={(e) => setAnnualForm({ ...annualForm, email: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="input-group mb-lg-0 mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-pen-to-square"></i></span>
                                <select className="form-select from-location"
                                    value={annualForm.report_notice_type}
                                    onChange={(e) => setAnnualForm({ ...annualForm, report_notice_type: e.target.value })}>
                                    <option value="">{staticTexts['Select Report']}</option>
                                    {
                                        dataSet?.annualReport?.map((item) => (
                                            <option key={item.id} value={item.title}>{item.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3 text-start">
                            <button className="btn hospital-primarybtn px-5 py-2"
                                disabled={loading.annual}
                                onClick={() => sendMail(annualForm)}>
                                {staticTexts['Submit']}
                                {loading.annual && <i className="fas fa-spinner fa-spin ms-1"></i>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Draft Annual Return Form */}
            <div className="col-md-4 mb-3">
                <div className="corporate-notice-form association-form-card">
                    <h3>{staticTexts['Download Draft Annual Return']}</h3>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="input-group mb-lg-0 mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-envelope"></i></span>
                                <input type="text" className="form-control" placeholder={staticTexts['Email']}
                                    value={draftForm.email}
                                    onChange={(e) => setDraftForm({ ...draftForm, email: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="input-group mb-lg-0 mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-pen-to-square"></i></span>
                                <select className="form-select from-location"
                                    value={draftForm.report_notice_type}
                                    onChange={(e) => setDraftForm({ ...draftForm, report_notice_type: e.target.value })}>
                                    <option value="">{staticTexts['Select Report']}</option>
                                    {
                                        dataSet?.draftAnnualReturn?.map((item) => (
                                            <option key={item.id} value={item.title}>{item.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3 text-start">
                            <button className="btn hospital-primarybtn px-5 py-2"
                                disabled={loading.draft}
                                onClick={() => sendMail(draftForm)}>
                                {staticTexts['Submit']}
                                {loading.draft && <i className="fas fa-spinner fa-spin ms-1"></i>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CorporateForm;
