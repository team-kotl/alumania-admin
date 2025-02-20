import React from "react";
// TODO: Freskkie
const JobForm = () => {
    return (
        <>
            <div className="ml-15 mr-5 mt-30 w-8/12">
                <fieldset className="fieldset mt-2">
                    <legend className="fieldset-legend text-lg text-primary">Title</legend>
                    <input type="text" className="w-11/12 input" placeholder="Insert title here" />
                </fieldset>

                <fieldset className="fieldset mt-2">
                    <legend className="fieldset-legend text-lg text-primary">Description</legend>
                    <textarea className="textarea h-24 w-11/12" placeholder="Insert description here"></textarea>
                </fieldset>

                <fieldset className="fieldset mt-2">
                    <legend className="fieldset-legend text-lg text-primary">Location</legend>
                    <input type="text" className="w-11/12 input" placeholder="Insert location here" />
                </fieldset>

                <fieldset className="fieldset mt-2">
                    <legend className="fieldset-legend text-lg text-primary">Company Name</legend>
                    <input type="text" className="w-11/12 input" placeholder="Insert company name here" />
                </fieldset>

                <div className="flex mr-23 mt-5 justify-end">
                    <button className="btn btn-primary hover:select-secondary">Publish</button>
                </div>
            </div>
    </>
    )
    
};

export default JobForm;
