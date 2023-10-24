import CommonListing from "@/components/CommonListing";
import { getAllPoster } from "@/service/poster";

const AllProduct = async () => {
    const allAdminPoster = await getAllPoster();

    return (
        <div className="">
            <CommonListing data={allAdminPoster?.data} />
        </div>
    );
};

export default AllProduct;
