import React from 'react'

const InternationalMenu = () => {

    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <h3>Bahrain</h3>
                    <ul className='location-menu-red-color'>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.kimshealth.bh/bahrain/ummalhassam-2/">Umm Al Hassam (Hospital)</a></li>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.royalbahrainhospital.com/">Salmaniya (Hospital)</a></li>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.kimshealth.bh/bahrain/ummalhassam">Umm Al Hassam (Medical Center)</a></li>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.kimshealth.bh/bahrain/muharraq/">Muharraq (Medical Center)</a></li>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.kimshealth.bh/bahrain/ummalhassam-2/">Askar (Medical Center)</a></li>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.royalbahrainhospital.com/rbhmc/">Janabiyah (Medical Center)</a></li>
                    </ul>
                    <h3 className='mt-2'>Oman</h3>
                    <ul>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.kimshealth.om/">Darsait, Muscat (Hospital)</a></li>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.kimshealth.om/about-us/al-khuwair/">Al Khuwair, Muscat (Medical Center)</a></li>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.kimshealth.om/about-us/duqm/">Duqm (Medical Complex)</a></li>
                    </ul>
                </div>

                <div className="col-md-6 mb-3">
                    <h3>Qatar</h3>
                    <ul>
                        <li><a target='_blank' href="https://www.kimshealth.qa/alwakra/">Al-Wakra (Medical Center)</a></li>
                        <li><a target='_blank' href="https://www.kimshealth.qa/almashaf/">Al-Mashaf (Medical Center)</a></li>
                        <li><a target='_blank' href="https://www.kimshealth.qa/barwacity/">Barwa City (Medical Center)</a></li>
                    </ul>
                    <h3>Saudi Arabia</h3>
                    <ul>
                        <li><a target='_blank' href="https://kimshealth.sa/">Jubail (Medical Center)</a></li>
                        <li><a target='_blank' href="https://kimshealth.sa/riyadh/">Riyadh (Medical Center)</a></li>
                    </ul>
                    <h3 className='mt-2'>UAE</h3>
                    <ul>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.kimshealth.ae/">Deira (Medical Center)</a></li>
                        <li><a target='_blank' rel="nofollow noopener noreferrer" href="https://www.kimshealth.ae/burdubai/">Bur Dubai (Medical Center)</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default InternationalMenu