import React from 'react'
import { IoClose } from "react-icons/io5";
// TODO: Nikko
const ExperiencesTab = ({experiences}) => {
  return (
    <div className="relative bg-white rounded-lg p-4 ml-25 mt-4 mb-4 w-200 shadow-[0px_1px_5px_rgba(0,0,0,0.2)]">
      <div className="flex items-center mb-2">
        <img

          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <h3 className="font-semibold text-m">firstname lastname</h3>
          <p className="text-gray-500 text-sm">2024-12-09 17:42</p>
        </div>
        <div className="absolute top-1 right-2">
          <button className="btn btn-ghost btn-square btn-error btn-sm">
           <IoClose />
          </button>
        </div>
      </div>
      <div className="text-gray-500 text-sm ml-12 mt-6 mb-3">
          <p className="mb-1">content of post</p>
          <img src="" alt="" className="w-50 h-50"/>
      </div>
    </div>
  );
};


export default ExperiencesTab