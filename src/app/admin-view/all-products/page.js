import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/service/product";

const AllProduct = async () => {
    const allAdminProducts = await getAllAdminProducts();

    return (
        <div className="">
            <CommonListing data={allAdminProducts?.data} />
        </div>
    );
};

export default AllProduct;
