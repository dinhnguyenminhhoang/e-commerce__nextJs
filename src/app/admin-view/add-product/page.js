"use client";
import { useContext, useEffect, useState } from "react";
import {
    AvailableSizes,
    adminAddProductformControls,
    firebaseConfig,
    firebaseStroageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/TileComponent";
import { addNewProduct, updateAProduct } from "@/service/product";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { usePathname, useRouter } from "next/navigation";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);

    return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `ecommerce/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
        uploadImage.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
                console.log(error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadImage.snapshot.ref)
                    .then((downloadUrl) => resolve(downloadUrl))
                    .catch((error) => reject(error));
            }
        );
    });
}

const initialFormData = {
    name: "",
    price: 0,
    description: "",
    category: "men",
    sizes: [],
    colors: [],
    type: "shirt",
    deliveryInfo: "",
    onSale: "no",
    imageUrl: "",
    thumbnailUrl: "",
    priceDrop: 0,
};

const AdminAddNewProduct = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [fullScreen, setFullScreen] = useState(false);
    const {
        componentLevelLoader,
        setComponentLevelLoader,
        setCurrentUpdatedProduct,
        currentUpdatedProduct,
    } = useContext(GlobalContext);
    const router = useRouter();
    async function handleImage(event) {
        const extractImageUrl = await helperForUPloadingImageToFirebase(
            event.target.files[0]
        );

        if (extractImageUrl !== "") {
            setFormData({
                ...formData,
                imageUrl: extractImageUrl,
            });
        }
    }
    async function handleThumb(event) {
        const extractImageUrl = await helperForUPloadingImageToFirebase(
            event.target.files[0]
        );

        if (extractImageUrl !== "") {
            setFormData({
                ...formData,
                thumbnailUrl: extractImageUrl,
            });
        }
    }
    const handleTileClick = (getCurrentitem) => {
        let copySizes = [...formData.sizes];
        const index = copySizes.findIndex(
            (item) => item.id === getCurrentitem.id
        );
        if (index === -1) {
            copySizes.push(getCurrentitem);
        } else {
            copySizes = copySizes.filter(
                (item) => item.id !== getCurrentitem.id
            );
        }
        setFormData({ ...formData, sizes: copySizes });
    };
    const AvailableColors = [
        {
            id: "#fff",
            label: " #fff",
        },
        {
            id: "#000",
            label: "#000",
        },
    ];
    const handleColor = (getCurrentitem) => {
        let copyColors = [...formData.colors];
        const index = copyColors.findIndex(
            (item) => item.id === getCurrentitem.id
        );
        if (index === -1) {
            copyColors.push(getCurrentitem);
        } else {
            copyColors = copyColors.filter(
                (item) => item.id !== getCurrentitem.id
            );
        }
        setFormData({ ...formData, sizes: copyColors });
    };
    const handleAddMore = () => {};
    const handleAddProduct = async () => {
        setComponentLevelLoader({ loading: true, id: "" });

        const res = await addNewProduct(formData);
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message), { position: toast.POSITION.TOP_RIGHT };
            setFormData(initialFormData);
            setTimeout(() => {
                router.push("/admin-view/all-products");
            }, 1000);
        } else {
            setComponentLevelLoader({ loading: true, id: "" });
            toast.error(res.message), { position: toast.POSITION.TOP_RIGHT };
            setFormData(initialFormData);
        }
    };
    const handleFullScreenImage = () => {
        setFullScreen(!fullScreen);
    };
    useEffect(() => {
        const checkImg = setTimeout(() => {
            setFullScreen(false);
        }, 5000);
        () => clearTimeout(checkImg);
    });
    // update
    useEffect(() => {
        if (currentUpdatedProduct) setFormData(currentUpdatedProduct);
    }, [currentUpdatedProduct]);
    const handleUpdateProduct = async () => {
        setComponentLevelLoader({ loading: true, id: "" });

        const res = await updateAProduct(formData);
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message), { position: toast.POSITION.TOP_RIGHT };
            setFormData(initialFormData);
            setTimeout(() => {
                router.push("/admin-view/all-products");
            }, 1000);
            setCurrentUpdatedProduct(null);
        } else {
            setComponentLevelLoader({ loading: true, id: "" });
            toast.error(res.message), { position: toast.POSITION.TOP_RIGHT };
            setFormData(initialFormData);
        }
    };
    return (
        <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mr-0 mb-0 space-y-8">
                    <div
                        className={`flex flex-col gap-4 ${
                            fullScreen ? "fullscreen-image-container" : null
                        }`}
                    >
                        <div className="flex flex-col gap-2 items-start">
                            <span>imageURL</span>
                            <input
                                accept="image/*"
                                max="100000"
                                type="file"
                                onChange={handleImage}
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <span>thumbnailUrl</span>
                            <input
                                accept="image/*"
                                max="100000"
                                type="file"
                                onChange={handleThumb}
                            />
                        </div>
                        {formData.imageUrl && formData.thumbnailUrl && (
                            <div className="flex gap-2">
                                <img
                                    src={formData.imageUrl}
                                    onClick={handleFullScreenImage}
                                    alt=""
                                    className={`${
                                        fullScreen
                                            ? "fullscreen-image w-full h-full"
                                            : " w-[200px] h-[200px]"
                                    } object-contain cursor-pointer`}
                                />
                                <img
                                    src={formData.thumbnailUrl}
                                    onClick={handleFullScreenImage}
                                    alt=""
                                    className={`${
                                        fullScreen
                                            ? "fullscreen-image w-full h-full"
                                            : " w-[200px] h-[200px]"
                                    } object-contain cursor-pointer`}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 flex-col">
                        <lable>Available sizes</lable>
                        <TileComponent
                            selected={formData.sizes}
                            onClick={handleTileClick}
                            data={AvailableSizes}
                        />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <lable>Colors</lable>
                        <div className="flex gap-4 items-center">
                            <TileComponent
                                selected={formData.sizes}
                                onClick={handleTileClick}
                                data={AvailableColors}
                                handleAddMore={handleAddMore}
                            />
                        </div>
                    </div>
                    {adminAddProductformControls.map((controlItem) =>
                        controlItem.componentType === "input" ? (
                            <InputComponent
                                key={controlItem.id}
                                placeholder={controlItem.placeholder}
                                lable={controlItem.label}
                                value={formData[controlItem.id]}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: e.target.value,
                                    });
                                }}
                            />
                        ) : controlItem.componentType === "select" ? (
                            <SelectComponent
                                key={controlItem.id}
                                options={controlItem.options}
                                label={controlItem.label}
                                value={formData[controlItem.id]}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: e.target.value,
                                    });
                                }}
                            />
                        ) : null
                    )}
                    {currentUpdatedProduct ? (
                        <button
                            onClick={handleUpdateProduct}
                            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-white font-medium uppercase tracking-wide"
                        >
                            {componentLevelLoader &&
                            componentLevelLoader.loading ? (
                                <ComponentLevelLoader
                                    text={"Update In"}
                                    color={"#ffffff"}
                                    loading={
                                        componentLevelLoader &&
                                        componentLevelLoader.loading
                                    }
                                />
                            ) : (
                                "Update product"
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={handleAddProduct}
                            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-white font-medium uppercase tracking-wide"
                        >
                            {componentLevelLoader &&
                            componentLevelLoader.loading ? (
                                <ComponentLevelLoader
                                    text={"Adding In"}
                                    color={"#ffffff"}
                                    loading={
                                        componentLevelLoader &&
                                        componentLevelLoader.loading
                                    }
                                />
                            ) : (
                                "add product"
                            )}
                        </button>
                    )}
                </div>
            </div>
            <Notification />
        </div>
    );
};

export default AdminAddNewProduct;
