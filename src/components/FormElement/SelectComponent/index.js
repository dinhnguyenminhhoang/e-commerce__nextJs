const SelectComponent = ({ label, option = [], value, onChange }) => {
    return (
        <div className="relative">
            <p className="bg-white pt-0 absolute pr-2 pb-0 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600">
                {label}
            </p>
            <select
                value={value}
                onChange={onChange}
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 mr-0 mt-0 ml-0 text-base bg-white border-gray-300 rounded-md"
            >
                {option && option.length > 0 ? (
                    option.map((optionItem) => (
                        <option
                            key={optionItem.id}
                            id={optionItem.id}
                            value={optionItem.id}
                        >
                            {optionItem.label}
                        </option>
                    ))
                ) : (
                    <option id="" value={""}>
                        select
                    </option>
                )}
            </select>
        </div>
    );
};

export default SelectComponent;
