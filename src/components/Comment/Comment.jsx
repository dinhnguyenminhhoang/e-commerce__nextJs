"use client";
import { GlobalContext } from "@/context";
import {
    addToComment,
    deleteFromComment,
    getAllComment,
    updatedComment,
} from "@/service/comment";
import { AiOutlineCloseCircle } from "@react-icons/all-files/ai/AiOutlineCloseCircle";
import { AiOutlineSend } from "@react-icons/all-files/ai/AiOutlineSend";
import { useParams } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import CommentInput from "./commentInput";
import AddCommet from "./addComment";
import ContentComment from "./contentComment";
const Comment = () => {
    const { user } = useContext(GlobalContext);
    const [commentValue, setCommentValue] = useState("");
    const [commentValueReply, setCommentValueReply] = useState("");
    const [commentReply, setCommentReply] = useState("");
    const [listComment, setListComment] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const [commentId, setCommentId] = useState();
    const [showReply, setShowReply] = useState("");
    const params = useParams();
    const getListComment = async () => {
        const res = await getAllComment(params.details);
        if (res.success) {
            setListComment(res.data);
        }
    };
    const handleSendComment = async () => {
        const res = await addToComment({
            comment: commentValue,
            userID: user._id,
            productID: params.details,
        });
        setCommentValue("");
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
    const handleReply = (id) => {
        setCommentId(id);
    };
    const handleAddReplyComment = async (item, commentReplyNew) => {
        const cpReplies = [...item.replies];
        if (!commentReplyNew) {
            cpReplies.push({
                commentID: item._id,
                commentReply: commentReply,
                userID: user._id,
            });
        } else {
            cpReplies.push({
                commentID: commentReplyNew._id,
                commentReply: commentValueReply,
                userID: user._id,
            });
        }
        const res = await updatedComment({
            _id: item._id,
            replies: cpReplies,
        });
        if (res.success) {
            getListComment();
        }
        setCommentReply("");
        setCommentValueReply("");
    };
    const handleDeleteCommentreply = async (item, commentReply) => {
        const cpReplies = [];
        for (const iterator of item.replies) {
            if (iterator._id !== commentReply._id) {
                cpReplies.push(iterator);
            }
        }
        const res = await updatedComment({
            _id: item._id,
            replies: cpReplies,
        });
        if (res.success) {
            getListComment();
        }
    };
    return (
        <div className="flex flex-col gap-4 bg-slate-100 p-4 mt-6 rounded-sm">
            <CommentInput
                listComment={listComment}
                setShowComment={setShowComment}
                showComment={showComment}
            />
            {user && (
                <AddCommet
                    user={user}
                    commentValue={commentValue}
                    setCommentValue={setCommentValue}
                    handleSendComment={handleSendComment}
                />
            )}
            {listComment &&
                showComment &&
                listComment.map((item) => {
                    return (
                        <div className="flex flex-col gap-2" key={item._id}>
                            <div className="flex flex-col gap-2">
                                <ContentComment
                                    user={user}
                                    handleReply={handleReply}
                                    item={item}
                                    handleDeleteComment={handleDeleteComment}
                                />
                                <div className="flex flex-col gap-2">
                                    {item.replies.length
                                        ? item.replies.map((commentReply) => (
                                              <div className="w-full flex justify-end items-end">
                                                  <div className="flex flex-col gap-2 w-full items-end">
                                                      <div
                                                          className="w-[96%] flex-col gap-2 bg-white p-4 rounded-xl shadow-md"
                                                          key={commentReply._id}
                                                      >
                                                          {commentReply.commentID ===
                                                          item._id ? (
                                                              <div className="flex gap-2">
                                                                  <img
                                                                      src="https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-a8235.appspot.com/o/ecommerce%2Fimg_2_1bdf4af2-0b94-4b1f-43fa-e46df8a691d3_1024x1024.webp-1698196112694-wuf4ogqfd3?alt=media&token=19f47b81-758e-48b5-b040-326ca3e6c754"
                                                                      alt=""
                                                                      className="rounded-full object-cover object-top w-10 h-10"
                                                                  />
                                                                  <div className="flex-1 gap-2 flex justify-between">
                                                                      <div className="flex flex-col items-start">
                                                                          <span className="text-md font-bold text-blue-500">
                                                                              {
                                                                                  user?.name
                                                                              }
                                                                          </span>
                                                                          <div className="flex gap-1 text-xs font-medium border-none  text-[#afafaf]">
                                                                              <button
                                                                                  onClick={() =>
                                                                                      handleReply(
                                                                                          commentReply._id
                                                                                      )
                                                                                  }
                                                                              >
                                                                                  reply
                                                                              </button>
                                                                          </div>
                                                                      </div>
                                                                      <div className="flex-1 items-start text-start">
                                                                          <span className="font-normal tetx-sm">
                                                                              {
                                                                                  commentReply.commentReply
                                                                              }
                                                                          </span>
                                                                      </div>
                                                                      {commentReply.userID ===
                                                                          user._id && (
                                                                          <div
                                                                              onClick={() =>
                                                                                  handleDeleteCommentreply(
                                                                                      item,
                                                                                      commentReply
                                                                                  )
                                                                              }
                                                                              className="flex items-center gap-1 text-[#4a4a4a] text-md cursor-pointer"
                                                                          >
                                                                              <AiOutlineCloseCircle />
                                                                          </div>
                                                                      )}
                                                                  </div>
                                                              </div>
                                                          ) : (
                                                              <div className="hidden"></div>
                                                          )}
                                                          {item.replies.map(
                                                              (level) => {
                                                                  if (
                                                                      level.commentID ===
                                                                      commentReply._id
                                                                  ) {
                                                                      return (
                                                                          <div
                                                                              className="w-[90%] border mt-2 flex gap-2 bg-white p-4 rounded-xl shadow-md"
                                                                              key={
                                                                                  level._id
                                                                              }
                                                                          >
                                                                              <img
                                                                                  src="https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-a8235.appspot.com/o/ecommerce%2Fimg_2_1bdf4af2-0b94-4b1f-43fa-e46df8a691d3_1024x1024.webp-1698196112694-wuf4ogqfd3?alt=media&token=19f47b81-758e-48b5-b040-326ca3e6c754"
                                                                                  alt=""
                                                                                  className="rounded-full object-cover object-top w-10 h-10"
                                                                              />
                                                                              <div className="flex-1 gap-2 flex justify-between">
                                                                                  <div className="flex flex-col items-start">
                                                                                      <span className="text-md font-bold text-blue-500">
                                                                                          {
                                                                                              user?.name
                                                                                          }
                                                                                      </span>
                                                                                      <div className="flex gap-1 text-xs font-medium border-none  text-[#afafaf]">
                                                                                          <button
                                                                                              onClick={() =>
                                                                                                  handleReply(
                                                                                                      level._id
                                                                                                  )
                                                                                              }
                                                                                          >
                                                                                              reply
                                                                                          </button>
                                                                                      </div>
                                                                                  </div>
                                                                                  <div className="flex-1 items-start text-start">
                                                                                      <span className="font-normal tetx-sm">
                                                                                          {
                                                                                              level.commentReply
                                                                                          }
                                                                                      </span>
                                                                                  </div>
                                                                                  {level.userID ===
                                                                                      user._id && (
                                                                                      <div
                                                                                          onClick={() =>
                                                                                              handleDeleteCommentreply(
                                                                                                  item,
                                                                                                  level
                                                                                              )
                                                                                          }
                                                                                          className="flex items-center gap-1 text-[#4a4a4a] text-md cursor-pointer"
                                                                                      >
                                                                                          <AiOutlineCloseCircle />
                                                                                      </div>
                                                                                  )}
                                                                              </div>
                                                                          </div>
                                                                      );
                                                                  }
                                                              }
                                                          )}
                                                      </div>
                                                      {commentId ===
                                                          commentReply._id && (
                                                          <div className="flex items-end justify-end w-full mt-2">
                                                              <div className="relative flex  w-[96%] gap-2 bg-white p-4 rounded-xl shadow-md">
                                                                  <img
                                                                      src="https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-a8235.appspot.com/o/ecommerce%2Fimg_2_1bdf4af2-0b94-4b1f-43fa-e46df8a691d3_1024x1024.webp-1698196112694-wuf4ogqfd3?alt=media&token=19f47b81-758e-48b5-b040-326ca3e6c754"
                                                                      alt=""
                                                                      className="rounded-full object-cover object-top w-10 h-10"
                                                                  />
                                                                  <div className="flex-1 gap-2 flex justify-between">
                                                                      <div className="flex flex-col items-start">
                                                                          <span className="text-md font-bold text-blue-500">
                                                                              {
                                                                                  user?.name
                                                                              }
                                                                          </span>
                                                                      </div>
                                                                      <div className="flex-1 items-start text-start">
                                                                          <div
                                                                              class="relative mb-3"
                                                                              data-te-input-wrapper-init
                                                                          >
                                                                              <input
                                                                                  onChange={(
                                                                                      e
                                                                                  ) =>
                                                                                      setCommentValueReply(
                                                                                          e
                                                                                              .target
                                                                                              .value
                                                                                      )
                                                                                  }
                                                                                  value={
                                                                                      commentValueReply
                                                                                  }
                                                                                  className="md:h-12 py-2 peer block w-full rounded border bg-transparent px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                                                  id="search-input"
                                                                                  rows="3"
                                                                                  placeholder="Your message"
                                                                              />
                                                                              <label
                                                                                  for="search-input"
                                                                                  className=" text-black pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:bg-white peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-blue-400"
                                                                              >
                                                                                  reply
                                                                                  comment
                                                                              </label>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  <div
                                                                      onClick={() =>
                                                                          handleAddReplyComment(
                                                                              item,
                                                                              commentReply
                                                                          )
                                                                      }
                                                                      className="cursor-pointer absolute bottom-2 right-4 flex items-center text-red-500 font-bold gap-1"
                                                                  >
                                                                      <button>
                                                                          Send
                                                                      </button>
                                                                      <AiOutlineSend />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      )}
                                                  </div>
                                              </div>
                                          ))
                                        : null}
                                </div>
                            </div>
                            {commentId === item._id && (
                                <div className="flex items-end justify-end w-full mt-2">
                                    <div className="relative flex  w-[96%] gap-2 bg-white p-4 rounded-xl shadow-md">
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
                                                    <input
                                                        onChange={(e) =>
                                                            setCommentReply(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={commentReply}
                                                        className="md:h-12 py-2 peer block w-full rounded border bg-transparent px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="search-input"
                                                        rows="3"
                                                        placeholder="Your message"
                                                    />
                                                    <label
                                                        for="search-input"
                                                        className=" text-black pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:bg-white peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-blue-400"
                                                    >
                                                        reply comment
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleAddReplyComment(item)
                                            }
                                            className="cursor-pointer absolute bottom-2 right-4 flex items-center text-red-500 font-bold gap-1"
                                        >
                                            <button>Send</button>
                                            <AiOutlineSend />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
        </div>
    );
};

export default Comment;
