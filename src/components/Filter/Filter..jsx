"use client";
import { useState } from "react";
const initFormData = {
    search: "",
    type: "ALL",
    sortPrice: "1",
};
const Filter = ({ handleFilter }) => {
    const [formData, setFormData] = useState(initFormData);
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleFilterChil = () => {
        handleFilter(formData);
    };
    return (
        <div className="rounded-lg  min-w-0 shadow-xs overflow-hidden bg-white rounded-t-lg rounded-0">
            <div className="p-1">
                <div className="py-1 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                    <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white  focus:border-gray-200 border-gray-200"
                            type="search"
                            name="search"
                            placeholder="Search Product"
                            onChange={handleOnChange}
                        />
                        <button className="absolute right-0 top-0 mt-5 mr-1"></button>
                    </div>
                    <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <select
                            name="type"
                            onChange={handleOnChange}
                            className="block w-full h-12 border uppercase bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md form-select focus:bg-white  focus:border-gray-200 border-gray-200  focus:shadow-non leading-5"
                        >
                            <option value="ALL">All</option>
                            <option value="shirt">áo</option>
                            <option value="trousers">quần</option>
                            <option value="accessory">phụ kiện</option>
                        </select>
                    </div>
                    <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <select
                            name="sortPrice"
                            onChange={handleOnChange}
                            className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md form-select focus:bg-white  focus:border-gray-200 border-gray-200  focus:shadow-non leading-5"
                        >
                            <option value="1">giá thấp - cao</option>
                            <option value="-1">giá cao - thap</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <div className="w-full mx-1">
                            <button
                                onClick={handleFilterChil}
                                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full bg-emerald-700"
                            >
                                Filter
                            </button>
                        </div>
                        <div className="w-full mx-1">
                            <button
                                onClick={() => {
                                    setFormData(initFormData);
                                    handleFilterChil();
                                }}
                                className="align-bottom  leading-5 transition-colors duration-150 font-medium  text-gray-600 dark:text-gray-400 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm"
                            >
                                <span className="text-black border">Reset</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
