import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
// TODO: Nikko

const JobsTab = (job) => {

  return (
    <>
      <InterestedPeople />
      <div className="relative bg-white rounded-lg p-4 ml-25 mt-4 mb-4 w-200 shadow-[0px_1px_5px_rgba(0,0,0,0.2)]">
        <div className="absolute top-1 right-2">
          <button className="btn btn-ghost btn-square btn-error btn-sm">
            <IoClose />
          </button>
        </div>
        <h3 className="font-semibold text-lg text-black">Learning Operation Specialist-Reporting (Mandarin Chinese Bilingual)</h3>
        <p className="text-gray-500 text-sm">IBM</p>
        <p className="text-gray-500 text-sm">Quezon City, NCR,  Philippines</p>
        <p className="mt-2 ml-5 text-gray-500 text-sm ">Role is to provide Learning Operations Support to the IBM Consulting Learning &
          Knowledge team in China. Ability to communicate fluently (both spoken & written)
          in Chinese is essential. </p>
        <div className="flex justify-end mt-2">
          <button type="button" className="btn btn-active
            bottom-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-lg "
            onClick={() => document.getElementById("view_Interested").showModal()}
          >
            View Interested
          </button>
        </div>

      </div>
    </>
  );
};

const InterestedPeople = () => {
  return (
    <>
      <dialog id="view_Interested" className="modal">
        <div className="modal-box">
          <h2>Number of Interested Users: 5</h2>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>


    </>
  )
}




export default JobsTab;
