"use client";
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight";
const NextBtn = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="rounded-md absolute -right-3 top-1/2 -translate-y-1/2 z-10 group-hover:opacity-50 opacity-0 bg-slate-600 py-3 px-1 rounded-l-search   transition-opacity ease-in-out duration-300"
        >
            <FaChevronRight className="text-3xl font-light text-white" />
        </button>
    );
};

export default NextBtn;
