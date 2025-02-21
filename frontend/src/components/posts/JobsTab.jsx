import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
// TODO: Nikko

const JobsTab = (job) => {

  return (
    <>
      <InterestedPeople />
      <div className="flex flex-row w-full justify-center">
        <div className="join join-vertical w-[55vw] h-[80vh] overflow-y-auto items-center shadow-[0px_1px_5px_rgba(0,0,0,0.05)] rounded-3xl">
          <div className="relative join-item bg-white p-4 w-full border-b border-gray-200">
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
                onClick={() => document.getElementById("view_Interested").showModal()}>
                View Interested
              </button>
            </div>
          </div>
          <div className="relative join-item bg-white p-4 w-full border-b border-gray-200">
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
          <div className="relative join-item bg-white p-4 w-full border-b border-gray-200">
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
          <div className="relative join-item bg-white p-4 w-full border-b border-gray-200">
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
          <div className="relative join-item bg-white p-4 w-full border-b border-gray-200">
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
        </div>
      </div>
    </>
  );
};

const InterestedPeople = () => {
  return (
    <>
      <dialog id="view_Interested" className="modal">
        <div className="modal-box ">
          <div className="flex justify-center mb-[2.5vh]">
            <h2 className="text-lg font-bold ">Number of Interested Users: 3</h2>
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div>
            <ul>
              <li className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center">
                  <img src="" alt="" className="w-8 h-8 rounded-full mr-2"/>
                  <span>Firstname Lasname</span>
                </div>
                <span className="text-gray-500 text-sm">Course</span>
              </li>
              <li className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center">
                  <img src="" alt="" className="w-8 h-8 rounded-full mr-2"/>
                  <span>Firstname Lasname</span>
                </div>
                <span className="text-gray-500 text-sm">Course</span>
              </li>
              <li className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center">
                  <img src="" alt="" className="w-8 h-8 rounded-full mr-2"/>
                  <span>Firstname Lasname</span>
                </div>
                <span className="text-gray-500 text-sm">Course</span>
              </li>
              
            </ul>
          </div>
        </div>
      </dialog>


    </>
  )
}




export default JobsTab;
