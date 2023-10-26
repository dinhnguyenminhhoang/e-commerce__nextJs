import { useDebounce } from "@/app/hooks";
import { searchProduct } from "@/service/product";
import { AiFillFire } from "@react-icons/all-files/ai/AiFillFire";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const SearchModal = ({ value, handleSearchLoading }) => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const debounce = useDebounce(value, 500);
    const route = useRouter();
    const getData = async () => {
        if (value !== "") {
            setShowModal(true);
            handleSearchLoading(true);
            const res = await searchProduct(debounce);
            if (res) {
                setData(res.data);
                handleSearchLoading(false);
            }
        } else {
            setShowModal(false);
        }
    };
    useEffect(() => {
        getData();
    }, [debounce]);
    return data?.length && showModal ? (
        <div className="absolute rounded-b-xl top-12 right-0 left-0 h-100 shadow-md bg-white rounded-sm overflow-y-auto">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-md px-4 mt-4">
                    <span>result</span>
                    <button
                        className="border-none underline"
                        onClick={() => route.push(`/search/${debounce}`)}
                    >
                        show all
                    </button>
                </div>
                <div className="flex flex-col h-72 overflow-y-auto border-b">
                    {data?.length &&
                        data.map((product) => (
                            <div
                                onClick={() =>
                                    route.push(`/product/${product._id}`)
                                }
                                key={product._id}
                                className="flex justify-start gap-2 items-start p-4 cursor-pointer hover:bg-slate-200 transition-all duration-300 border-b"
                            >
                                <img
                                    alt=""
                                    src={product.imageUrl}
                                    className="w-16 h-16 object-top object-cover rounded-full"
                                />
                                <div className="flex flex-col items-start justify-between text-md text-[#444]">
                                    <span>{product.name}</span>
                                    <span>${product.price}</span>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="flex flex-wrap gap-2 px-2  pb-4 rounded-b-xl">
                    <div className="flex gap-1 justify-between items-center rounded-2xl px-4 py-2 sahdow-md border cursor-pointer hover:bg-slate-100 transition-all duration-300">
                        <span>Hot sale</span>
                        <span className="text-red-600 text-2xl">
                            <AiFillFire />
                        </span>
                    </div>
                    <div className="flex gap-1 justify-between items-center rounded-2xl px-4 py-2 sahdow-md border cursor-pointer hover:bg-slate-100 transition-all duration-300">
                        <span>Hot sale</span>
                        <span className="text-red-600 text-xl">
                            <AiFillFire />
                        </span>
                    </div>
                    <div className="flex gap-1 justify-between items-center rounded-2xl px-4 py-2 sahdow-md border cursor-pointer hover:bg-slate-100 transition-all duration-300">
                        <span>Hot sale</span>
                        <span className="text-red-600 text-xl">
                            <AiFillFire />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default SearchModal;
