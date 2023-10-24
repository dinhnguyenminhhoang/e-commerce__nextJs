"use client";
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
const PreBtn = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute group-hover:opacity-50 -left-3 rounded-md top-1/2 -translate-y-1/2 z-10 bg-slate-600 opacity-0 py-3 px-1 rounded-r-search transition-opacity ease-in-out duration-300"
        >
            <FaAngleLeft className="text-3xl font-light text-white" />
        </button>
    );
};

export default PreBtn;
