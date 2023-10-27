import { AiOutlineSend } from "@react-icons/all-files/ai/AiOutlineSend";
const AddCommet = ({
    user,
    commentValue,
    setCommentValue,
    handleSendComment,
}) => {
    return (
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
                    <div class="relative mb-3" data-te-input-wrapper-init>
                        <textarea
                            onChange={(e) => setCommentValue(e.target.value)}
                            value={commentValue}
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
    );
};

export default AddCommet;
