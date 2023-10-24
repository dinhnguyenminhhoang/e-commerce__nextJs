"use client";

const FooterItem = ({ data, heading }) => {
    return (
        <div className="col-span-4">
            <span className="text-[#363636] text-lg">{heading}</span>
            <div>
                <ul className="list-none">
                    {data?.length > 0 &&
                        data.map((item, index) => (
                            <li
                                key={index}
                                className="text-xs px-2 leading-7 text-[#4a4a4a] cursor-pointer hover:text-black"
                            >
                                {item.title}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default FooterItem;
