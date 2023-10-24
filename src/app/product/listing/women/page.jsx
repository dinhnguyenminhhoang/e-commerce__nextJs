import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/service/product";

const WomenAllProducts = async () => {
    const getAllProducts = await productByCategory("women");
    return <CommonListing data={getAllProducts?.data} />;
};

export default WomenAllProducts;
