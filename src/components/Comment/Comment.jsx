"use client";
import { GlobalContext } from "@/context";
import {
    addToComment,
    deleteFromComment,
    getAllComment,
} from "@/service/comment";
import { AiOutlineCloseCircle } from "@react-icons/all-files/ai/AiOutlineCloseCircle";
import { AiOutlineSend } from "@react-icons/all-files/ai/AiOutlineSend";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
const Comment = () => {
    const { user } = useContext(GlobalContext);
    const [comment, setComment] = useState("");
    const [listComment, setListComment] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const params = useParams();
    const getListComment = async () => {
        const res = await getAllComment(params.details);
        if (res.success) {
            setListComment(res.data);
        }
    };
    const handleSendComment = async () => {
        const res = await addToComment({
            comment: comment,
            userID: user._id,
            productID: params.details,
        });
        setComment("");
        if (res) {
            getListComment();
        }
    };
    useEffect(() => {
        if (showComment) getListComment();
    }, [showComment]);
    const handleDeleteComment = async (id) => {
        const res = await deleteFromComment(id);
        if (res.success) {
            getListComment();
        }
    };
    return (
        <div className="flex flex-col gap-4 bg-slate-100 p-4 mt-6 rounded-sm">
            <div className="flex justify-between items-center">
                <span>Ubread comment({listComment.length})</span>
                <div className="flex items-center gap-2">
                    <span className="text-xl">Comments</span>
                    <input
                        onChange={() => setShowComment(!showComment)}
                        class="bg-blue-500 mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem]  before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                    />
                </div>
            </div>
            {user && (
                <div className="relative flex gap-2 bg-white p-4 rounded-xl shadow-md pb-8">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-a8235.appspot.com/o/ecommerce%2Fimg_2_1bdf4af2-0b94-4b1f-43fa-e46df8a691d3_1024x1024.webp-1698196112694-wuf4ogqfd3?alt=media&token=19f47b81-758e-48b5-b040-326ca3e6c754"
                        alt=""
                        className="rounded-full object-cover object-top w-10 h-10"
                    />
                    <div className="flex-1 gap-2 flex justify-between">
                        <div className="flex flex-col items-start">
                            <span className="text-md font-bold text-blue-500">
                                {user?.name}
                            </span>
                        </div>
                        <div className="flex-1 items-start text-start">
                            <div
                                class="relative mb-3"
                                data-te-input-wrapper-init
                            >
                                <textarea
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    className="md:h-16 py-2 peer block w-full rounded border bg-transparent px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="search-input"
                                    rows="3"
                                    placeholder="Your message"
                                ></textarea>
                                <label
                                    for="search-input"
                                    className=" text-black pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:bg-white peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-blue-400"
                                >
                                    your comment
                                </label>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={handleSendComment}
                        className="cursor-pointer absolute bottom-2 right-4 flex items-center text-red-500 font-bold gap-1"
                    >
                        <button>Send</button>
                        <AiOutlineSend />
                    </div>
                </div>
            )}
            {listComment &&
                showComment &&
                listComment.map((item) => {
                    const date = new Date(item.createdAt);
                    return (
                        <div
                            className="flex gap-2 bg-white p-4 rounded-xl shadow-md"
                            key={item._id}
                        >
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-a8235.appspot.com/o/ecommerce%2Fimg_2_1bdf4af2-0b94-4b1f-43fa-e46df8a691d3_1024x1024.webp-1698196112694-wuf4ogqfd3?alt=media&token=19f47b81-758e-48b5-b040-326ca3e6c754"
                                alt=""
                                className="rounded-full object-cover object-top w-10 h-10"
                            />
                            <div className="flex-1 gap-2 flex justify-between">
                                <div className="flex flex-col items-start">
                                    <span className="text-md font-bold text-blue-500">
                                        {user?.name}
                                    </span>
                                    <div className="flex gap-1 text-xs font-medium border-none  text-[#afafaf]">
                                        <button>reply</button>
                                    </div>
                                </div>
                                <div className="flex-1 items-start text-start">
                                    <span className="font-normal tetx-sm">
                                        {item.comment}
                                    </span>
                                </div>
                                {item.userID === user._id && (
                                    <div
                                        onClick={() =>
                                            handleDeleteComment(item._id)
                                        }
                                        className="flex items-center gap-1 text-[#4a4a4a] text-md cursor-pointer"
                                    >
                                        <AiOutlineCloseCircle />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Comment;
