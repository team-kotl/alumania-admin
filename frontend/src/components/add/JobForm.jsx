import React from "react";
// TODO: Freskkie
const JobForm = () => {
    return (
        <>
            <div className="ml-15 mr-5 w-8/12">
                <fieldset className="fieldset mt-2">
                    <legend className="fieldset-legend text-lg text-primary">Title</legend>
                    <input type="text" className="w-11/12 input" placeholder="Insert job title here" />
                </fieldset>

                <fieldset className="fieldset mt-2">
                    <legend className="fieldset-legend text-lg text-primary">Description</legend>
                    <textarea className="textarea h-24 w-11/12" placeholder="Insert job description here"></textarea>
                </fieldset>

                <fieldset className="fieldset mt-2">
                    <legend className="fieldset-legend text-lg text-primary">Location</legend>
                    <input type="text" className="w-11/12 input" placeholder="Insert company location here" />
                </fieldset>

                <fieldset className="fieldset mt-2">
                    <legend className="fieldset-legend text-lg text-primary">Company Name</legend>
                    <input type="text" className="w-11/12 input" placeholder="Insert company name here" />
                </fieldset>
                
                <div className="flex flex-col lg:flex-row mt-2 space-x-5 mr-12">
                    <fieldset className="fieldset mt-2 w-1/2">
                        <legend className="fieldset-legend text-lg text-primary">Contact Name</legend>
                        <input type="text" className="w-11/12 input" placeholder="Insert contact name here" />
                    </fieldset>

                    <fieldset className="fieldset mt-2 w-1/2">
                        <legend className="fieldset-legend text-lg text-primary">Company Email</legend>
                        <input type="text" className="w-11/12 input" placeholder="Insert contact email here" />
                    </fieldset>
                </div>

                <div className="flex flex-col lg:flex-row mt-2 space-x-2 ">
                    <fieldset className="fieldset mt-2 w-1/2">
                        <legend className="fieldset-legend text-lg text-primary">Contact Number</legend>
                        <input type="text" className="w-11/12 input" placeholder="Insert contact number here" />
                    </fieldset>

                    <div className="w-1/2 mt-6 mr-12">
                    <p className="text-lg text-primary font-semibold">Work Type</p>
                    <select className="select validator" required>
                        <option value="">Select work type here</option>
                        <option>Onsite</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                    </select>
                    <p className="validator-hint">Required</p>
                    </div>
                </div>

                <div className="flex mr-23 mt-5 justify-end">
                    <button className="btn btn-primary hover:select-secondary">Publish</button>
                </div>
            </div>
    </>
    )
    
};

export default JobForm;
