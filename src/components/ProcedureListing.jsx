"use client"
import React, { useState, useEffect } from 'react';

const ProcedureListing = ({ allProcedure, baseUrlOnlyLang, allSpeciality, URLParams }) => {
    const [procedures, setProcedures] = useState(allProcedure);
    const [speciality, setSpeciality] = useState(allSpeciality);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');

    const searchFilter = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredProcedures = allProcedure.filter(procedure =>
            procedure.title.toLowerCase().includes(searchValue)
        );
        setProcedures(filteredProcedures); // ✅ update state
    };

    const mid = Math.ceil(procedures.length / 2);
    const firstHalf = procedures.slice(0, mid);
    const secondHalf = procedures.slice(mid);


    


    return (
        <div className="speciality-masterpage-card key-procedures-master-page">
            <div className="details-key-row">
                    <div className="row justify-content-between">
                        <div className="col-md-6 mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Procedure Name"
                                onChange={searchFilter}
                            />
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="input-group p-0 mt-lg-0 mt-2 position-relative justify-content-center">
                                <select name="" className="form-select rounded-from" value={URLParams.speciality} onChange={(e) => {
                                    location.href = `${baseUrlOnlyLang}/procedure?speciality=${e.target.value.trim()}`;
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
                    {firstHalf.map((p) => (
                        <div className="speciality-masterpage-card-content" key={p.id}>
                            <a href={`${baseUrlOnlyLang}/procedure/${p.procedure?.slug}`}>
                                <div className="key-master-row">
                                    <div className="key-master-image">
                                        <img
                                            src={process.env.NEXT_PUBLIC_IMAGE_URL + p.procedure?.iconImage?.url}
                                            alt={p.title}
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="key-master-content">
                                        <h5>{p.title}</h5>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="col-md-6">
                    {secondHalf.map((p) => (
                        <div className="speciality-masterpage-card-content" key={p.id}>
                            <a href={`${baseUrlOnlyLang}/procedure/${p.procedure?.slug}`}>
                                <div className="key-master-row">
                                    <div className="key-master-image">
                                        <img
                                            src={process.env.NEXT_PUBLIC_IMAGE_URL + p.procedure?.iconImage?.url}
                                            alt={p.title}
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="key-master-content">
                                        <h5>{p.title}</h5>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProcedureListing;
