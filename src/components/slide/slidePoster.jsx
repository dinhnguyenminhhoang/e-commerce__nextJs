const SlidePoster = ({ data }) => {
    return (
        <div className="cursor-pointer border rounded-md overflow-hidden">
            <img
                className="object-fill w-full h-[450px]"
                src={data?.imageUrl}
            />
        </div>
    );
};

export default SlidePoster;
