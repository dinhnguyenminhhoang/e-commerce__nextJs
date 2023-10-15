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
import { addNewProduct } from "@/service/product";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { useRouter } from "next/navigation";

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
    deliveryInfo: "",
    onSale: "no",
    imageUrl: "",
    priceDrop: 0,
};

const AdminAddNewProduct = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [fullScreen, setFullScreen] = useState(false);
    const { componentLevelLoader, setComponentLevelLoader } =
        useContext(GlobalContext);
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
    return (
        <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mr-0 mb-0 space-y-8">
                    <div
                        className={`flex flex-col gap-4 ${
                            fullScreen ? "fullscreen-image-container" : null
                        }`}
                    >
                        <input
                            accept="image/*"
                            max="100000"
                            type="file"
                            onChange={handleImage}
                        />
                        {formData.imageUrl && (
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
                </div>
            </div>
            <Notification />
        </div>
    );
};

export default AdminAddNewProduct;
