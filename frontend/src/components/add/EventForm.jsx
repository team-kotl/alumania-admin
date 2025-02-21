import React from "react";

// TODO: Freskkie
const EventForm = () => {
    return (
        <>
            <div className="ml-15 mr-5 w-8/12">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg text-primary">Upload a picture</legend>
                        <input type="file" className="w-11/12 file-input" />
                        <label className="fieldset-label">Max size 2MB</label>
                </fieldset>

                <fieldset className="fieldset mt-2">
                    <legend className="fieldset-legend text-lg text-primary">Title</legend>
                    <input type="text" className="w-11/12 input" placeholder="Insert event title here" />
                </fieldset>

                <fieldset className="fieldset mt-2">
                    <legend className="fieldset-legend text-lg text-primary">Description</legend>
                    <textarea className="textarea h-24 w-11/12" placeholder="Insert event description here"></textarea>
                </fieldset>

                <div className="flex w-full flex-col lg:flex-row mt-4">
                    <div className="w-full">
                        <form>
                        <p className="text-lg text-primary font-semibold">Location</p>
                            <select className="select validator" required>
                                <option disabled selected value="">Select region</option>
                                <option>Luzon</option>
                                <option>Visayas</option>
                                <option>Mindanao</option>
                            </select>
                            <p className="validator-hint">Required</p>
                        </form>
                    </div>

                    <div className="w-full">
                        <form>
                        <p className="text-lg text-white font-semibold">.</p>
                            <select className="select validator" required>
                                <option disabled selected value="">Select province</option>
                                <option>SAMCIS</option>
                                <option>SONAHBS</option>
                                <option>STELA</option>
                                <option>SAS</option>
                                <option>SEA</option>
                                <option>SOM</option>
                            </select>
                            <p className="validator-hint">Required</p>
                        </form>
                    </div>

                    <div className="w-full mr-18">
                        <form>
                        <p className="text-lg text-white font-semibold">.</p>
                            <select className="select validator" required>
                                <option disabled selected value="">Select city</option>
                                <option>SAMCIS</option>
                                <option>SONAHBS</option>
                                <option>STELA</option>
                                <option>SAS</option>
                                <option>SEA</option>
                                <option>SOM</option>
                            </select>
                            <p className="validator-hint">Required</p>
                        </form>
                    </div>
                </div>

                <fieldset className="fieldset">
                    <input type="text" className="w-11/12 input" placeholder="Insert street number and barangay here" />
                </fieldset>

                <div className="flex w-full flex-col lg:flex-row mt-4 space-x-64">
                <div className="w-full">
                    <form>
                    <p className="text-lg text-primary font-semibold">School</p>
                        <select className="select validator" required>
                            <option disabled selected value="">Select school here</option>
                            <option>SAMCIS</option>
                            <option>SONAHBS</option>
                            <option>STELA</option>
                            <option>SAS</option>
                            <option>SEA</option>
                            <option>SOM</option>
                        </select>
                        <p className="validator-hint">Required</p>
                    </form>
                    </div>
                    <div className="w-full">
                        <form>
                        <p className="text-lg text-primary font-semibold">Batch</p>
                            <select className="select validator" required>
                                <option disabled selected value="">Select batch here</option>
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                            </select>
                            <p className="validator-hint">Required</p>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row mt-2 space-x-64">
                    <div className="w-full">
                    <form>
                    <p className="text-lg text-primary font-semibold">Category</p>
                        <select className="select validator" required>
                            <option disabled selected value="">Select category here</option>
                            <option>Reunion</option>
                            <option>Seminar</option>
                            <option>Thanksgiving</option>
                        </select>
                        <p className="validator-hint">Required</p>
                    </form>
                    </div>
                    
                    <div className="w-full">
                        <p className="text-lg text-primary font-semibold">Schedule</p>
                        <input type="datetime-local" className="input"/>
                    </div>
                </div>

                <div className="flex mr-23 mt-5 justify-end">
                    <button className="btn btn-primary hover:select-secondary">Publish</button>
                </div>
            </div>
        </>
    );
};
export default EventForm;
