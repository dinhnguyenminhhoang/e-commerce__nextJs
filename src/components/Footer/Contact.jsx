"use client";

const Contact = ({ data }) => {
    return (
        <div>
            <span>kết nối với chung tôi</span>
            <div className="flex items-center">
                {data?.length > 0 &&
                    data.map((item, index) => (
                        <img
                            src={item.src}
                            alt=""
                            className="w-[44px] h-[36px] rounded-full object-cover p-2 mr-2 cursor-pointer hover:bg-backgroundRgba border-[1px] border-solid"
                            key={index}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Contact;
