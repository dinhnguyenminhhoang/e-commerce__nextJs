import { PulseLoader } from "react-spinners";

const PageLevelLoader = (pageLevelLoader) => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <PulseLoader
                color={"#000000"}
                loading={pageLevelLoader}
                size={30}
                data-testid="loader"
            />
        </div>
    );
};

export default PageLevelLoader;
