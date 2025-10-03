"use client"
import React, { useState } from 'react'

const DiseaseListing = ({ allDisease, allSpeciality, URLParams, baseUrlOnlyLang }) => {
    const [diseases, setDiseases] = useState(allDisease);
    const [speciality, setSpeciality] = useState(allSpeciality);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');

    const searchFilter = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filterDisease = allDisease.filter(disease =>
            disease.title.toLowerCase().includes(searchValue)
        );
        setDiseases(filterDisease); // ✅ update state
    };

    const mid = Math.ceil(diseases?.length / 2);
    const firstHalf = diseases?.slice(0, mid);
    const secondHalf = diseases?.slice(mid);

    return (
        <div className="col-md-9 mb-3">
            <div className="speciality-masterpage-card key-procedures-master-page">
                <div className="details-key-row">
                    <div className="row justify-content-between">
                        <div className="col-md-6 mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Disease Name"
                                onChange={searchFilter}
                            />
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="input-group p-0 mt-lg-0 mt-2 position-relative justify-content-center">
                                <select name="" className="form-select rounded-from" value={URLParams.speciality} onChange={(e) => {
                                    location.href = `${baseUrlOnlyLang}/disease?speciality=${e.target.value.trim()}`;
                                    setSelectedSpeciality(e.target.value);
                                }}>
                                    <option value="">Select by Speciality</option>
                                    {
                                        speciality.map((splty) => (
                                            <option
                                                key={splty.id}
                                                value={splty?.slug}
                                            >
                                                {splty.title}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-6">
                        {
                            firstHalf?.map((d, index) => {
                                return <div className="speciality-masterpage-card-content" key={index}>
                                    <a href={baseUrlOnlyLang + "/disease/" + d.disease?.slug}>
                                        <div className="key-master-row">
                                            <div className="key-master-image">
                                                <img
                                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + d.disease?.iconImage?.url}
                                                    alt={d.title}
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="key-master-content">
                                                <h5>{d.title}</h5>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            })
                        }

                    </div>

                    <div className="col-md-6">
                        {
                            secondHalf?.map((d, index) => {
                                return <div className="speciality-masterpage-card-content" key={index}>
                                    <a href={baseUrlOnlyLang + "/disease/" + d.disease?.slug}>
                                        <div className="key-master-row">
                                            <div className="key-master-image">
                                                <img
                                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + d.disease?.iconImage?.url}
                                                    alt={d.title}
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="key-master-content">
                                                <h5>{d.title}</h5>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default DiseaseListing