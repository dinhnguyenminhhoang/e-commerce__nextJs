import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/service/product";

const MenAllProducts = async () => {
    const getAllProducts = await productByCategory("men");
    return <CommonListing data={getAllProducts?.data} />;
};

export default MenAllProducts;
