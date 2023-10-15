const TileComponent = ({ data, selected = [], onClick }) => {
    return data && data.length ? (
        <div className="mt-3 flex flex-wrap items-center gap-1">
            {data.map((dataItems) => (
                <label
                    onClick={() => onClick(dataItems)}
                    className={`cursor-pointer ${
                        selected?.length > 0 &&
                        selected
                            .map((item) => item.id)
                            .indexOf(dataItems.id) !== -1
                            ? "bg-black"
                            : ""
                    }`}
                    key={dataItems.id}
                >
                    <span
                        className={`rounded-lg border border-black px-6 py-2 font-bold ${
                            selected?.length > 0 &&
                            selected
                                .map((item) => item.id)
                                .indexOf(dataItems.id) !== -1
                                ? "text-white"
                                : ""
                        }`}
                    >
                        {dataItems.label}
                    </span>
                </label>
            ))}
        </div>
    ) : null;
};

export default TileComponent;
