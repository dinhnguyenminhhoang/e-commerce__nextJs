import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/service/product";

const KidsAllProducts = async () => {
    const getAllProducts = await productByCategory("kids");
    return <CommonListing data={getAllProducts?.data} />;
};

export default KidsAllProducts;
