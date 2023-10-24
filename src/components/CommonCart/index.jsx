"use client";

import ComponentLevelLoader from "../Loader/componentlevel";

const CommonCart = ({
    cartItems = [],
    handleDeleteCartItem,
    componentLevelLoader,
}) => {
    return (
        <section className="rounded-lg min-h-screen bg-gray-100">
            {cartItems?.length > 0 ? (
                <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-6 sm:px-8 sm:py-10">
                                <div className="flow-root">
                                    {cartItems?.length ? (
                                        <ul className="-my-8">
                                            {cartItems.map((cartItem) => (
                                                <li
                                                    key={cartItem.id}
                                                    className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                                                >
                                                    <div className="shrink-0">
                                                        <img
                                                            src={
                                                                cartItem
                                                                    ?.productID
                                                                    ?.imageUrl
                                                            }
                                                            alt="product cart"
                                                            className="h-24 max-w-full rounded-lg object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-between">
                                                        <div className="sm:col-gap-5 sm:grid-cols-2">
                                                            <div className="pr-8 sm:pr-4">
                                                                <p className="text-base font-semibold text-gray-900">
                                                                    {
                                                                        cartItem
                                                                            ?.productID
                                                                            ?.name
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex mt-4 gap-3 items-end justify-between sm:mt-0 sm:justify-end">
                                                                <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-1 sm:ml-8 sm:text-right">
                                                                    $
                                                                    {
                                                                        cartItem
                                                                            ?.productID
                                                                            ?.price
                                                                    }
                                                                </p>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteCartItem(
                                                                            cartItem._id
                                                                        )
                                                                    }
                                                                    className="font-medium text-yellow-700 sm:order-2"
                                                                >
                                                                    {componentLevelLoader?.loading &&
                                                                    componentLevelLoader?.id ===
                                                                        cartItem._id ? (
                                                                        <ComponentLevelLoader
                                                                            text={
                                                                                "removing "
                                                                            }
                                                                            color={
                                                                                "#000"
                                                                            }
                                                                            loading={
                                                                                componentLevelLoader &&
                                                                                componentLevelLoader.loading
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        "remove"
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </div>
                                <div className="mt-6 flex gap-2 flex-col border-b border-t py-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">
                                            subtotal
                                        </p>
                                        <p className="text-lg text-black font-semibold">
                                            $
                                            {cartItems?.length
                                                ? cartItems.reduce(
                                                      (total, item) =>
                                                          item?.productID
                                                              ?.price + total,
                                                      0
                                                  )
                                                : "0"}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">
                                            shiping
                                        </p>
                                        <p className="text-lg text-black font-semibold">
                                            $0
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">
                                            total
                                        </p>
                                        <p className="text-lg text-black font-semibold">
                                            $
                                            {cartItems?.length
                                                ? cartItems.reduce(
                                                      (total, item) =>
                                                          item?.productID
                                                              ?.price + total,
                                                      0
                                                  )
                                                : "0"}
                                        </p>
                                    </div>
                                    <div className="mt-5 text-center">
                                        <button
                                            disabled={cartItems?.length < 1}
                                            className="disabled:opacity-50 group inline-flex w-full justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                                        >
                                            checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full min-h-screen flex justify-center items-center">
                    <p className="text-3xl font-bold text-gray-900">
                        cart is empaty
                    </p>
                </div>
            )}
        </section>
    );
};

export default CommonCart;
