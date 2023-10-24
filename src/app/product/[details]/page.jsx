import CommonDetail from "@/components/CommonDetail";
import { productById } from "@/service/product";

const DetailProduct = async ({ params }) => {
    const productDetailData = await productById(params.details);
    return productDetailData && <CommonDetail item={productDetailData?.data} />;
};

export default DetailProduct;
