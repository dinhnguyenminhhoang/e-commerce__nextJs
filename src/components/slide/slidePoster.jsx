const SlidePoster = ({ data }) => {
    return (
        <div className="cursor-pointer border rounded-md overflow-hidden">
            <img
                className="object-contain object-center"
                src={data?.imageUrl}
            />
        </div>
    );
};

export default SlidePoster;
