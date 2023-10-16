import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/service/product";

const AllProducts = async () => {
    const getAllProducts = await getAllAdminProducts();
    return <CommonListing data={getAllProducts?.data} />;
};

export default AllProducts;
