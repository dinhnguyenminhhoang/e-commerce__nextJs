import { AiOutlineCloseCircle } from "@react-icons/all-files/ai/AiOutlineCloseCircle";
const ContentComment = ({ user, handleReply, item, handleDeleteComment }) => {
    return (
        <div className="flex gap-2 bg-white p-4 rounded-xl shadow-md">
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
                        <button onClick={() => handleReply(item._id)}>
                            reply
                        </button>
                    </div>
                </div>

                <div className="flex-1 items-start text-start">
                    <span className="font-normal tetx-sm">{item.comment}</span>
                </div>
                {item.userID === user._id && (
                    <div
                        onClick={() => handleDeleteComment(item._id)}
                        className="flex items-center gap-1 text-[#4a4a4a] text-md cursor-pointer"
                    >
                        <AiOutlineCloseCircle />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentComment;
