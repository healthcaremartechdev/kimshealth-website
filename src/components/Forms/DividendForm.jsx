"use client"
import dividendData from '@/app/lib/getDividend';
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState } from 'react';

const DividendForm = ({ basePath, URLParams }) => {
  const [staticTexts, setStaticTexts] = useState({});
  const [selectedFY, setSelectedFY] = useState(URLParams.fy || "");
  const [selectedFolio, setSelectedFolio] = useState(URLParams.folio || "");
  const [selectedName, setSelectedName] = useState(URLParams.name || "");
  const [selectedDividend, setSelectedDividend] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // NEW

  useEffect(() => {
    const fetchTexts = async () => {
      setStaticTexts({ ...(await getStaticText()) });
    };
    fetchTexts();
  }, []);

  const handleSearch = async () => {
    setHasSearched(true);   // mark that user searched
    setLoading(true);

    const data = await dividendData.getData({
      name: selectedName,
      folio: selectedFolio,
      fy: selectedFY
    });

    setSelectedDividend(data || null);
    setLoading(false);
  };

  return (
    <>
      <section className="section dividend-form">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 col-12 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={"Ex: KIM0000123"}
                value={selectedFolio}
                onChange={(e) => setSelectedFolio(e.target.value)}
              />
            </div>

            <div className="col-md-4 col-12 mb-3">
              <input
                type="text"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                className="form-control"
                placeholder={"Ex: name"}
              />
            </div>

            <div className="col-md-2 col-12 mb-3">
              <button
                type="button"
                onClick={handleSearch}
                className="form-btn w-auto px-5"
              >
                {staticTexts["Search"] || "Search"}
              </button>
            </div>
            <p className="text-danger text-center fw-bold">
              Note: "KIM0000123" (10 Digits) for Physical holders and DP ID+ Client ID (16 digits) for Demat holders
            </p>
          </div>
        </div>
      </section>

      {hasSearched && (
        <section className="section primary-table pt-0">
          <div className="container">

            {/* Show loader while fetching */}
            {loading && (
              <div className="alert alert-info text-center" role="alert">
                Loading...
              </div>
            )}

            {/* Show "No Data Found" only after searching */}
            {!loading && !selectedDividend && (
              <div className="alert alert-warning text-center" role="alert">
                No Data Found !!
              </div>
            )}

            {/* Show Table if data exists */}
            {!loading && selectedDividend && (
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <figure className="table">
                      <table className="table align-middle">
                        <thead>
                          <tr>
                            <th>Investor First Name</th>
                            <th>Investor Middle Name</th>
                            <th>Investor Last Name</th>
                            <th>Joint Holders</th>
                            <th>Address</th>
                            <th>State</th>
                            <th>District</th>
                            <th>PIN Code</th>
                            <th>Folio No. OR DP ID-Client ID</th>
                            <th>Amount to be transferred</th>
                            <th>Proposed date of transfer to IEPF</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{selectedDividend.name || ""}</td>
                            <td></td>
                            <td></td>
                            <td>{selectedDividend.jointHolder || ""}</td>
                            <td>{selectedDividend.address || ""}</td>
                            <td>{selectedDividend.state || ""}</td>
                            <td>{selectedDividend.district || ""}</td>
                            <td>{selectedDividend.pin || ""}</td>
                            <td>{selectedDividend.folioNo || ""}</td>
                            <td>{selectedDividend.amount || ""}</td>
                            <td>{selectedDividend.proposedDate || ""}</td>
                          </tr>
                        </tbody>
                      </table>
                    </figure>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default DividendForm;
