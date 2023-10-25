const SlidePoster = ({ data }) => {
    return (
        <div className="cursor-pointer border rounded-md overflow-hidden">
            <img
                className="object-cover object-center w-full h-full"
                src={data?.imageUrl}
            />
        </div>
    );
};

export default SlidePoster;
