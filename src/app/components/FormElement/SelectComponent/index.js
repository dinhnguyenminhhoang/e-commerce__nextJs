const SelectComponent = ({ lable }) => {
    return (
        <div className="relative">
            <p className="pt-0 pr-2 pb-0 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600">
                {lable}
            </p>
            <select
                value={value}
                onChange={onChange}
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 mr-0 mt-0 ml-0 text-base bg-white border-gray-300 rounded-md"
            >
                {op}
            </select>
        </div>
    );
};

export default SelectComponent;
