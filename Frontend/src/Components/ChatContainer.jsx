import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "../Skeleton/MessageSkeleton";
import MessageInput from "./MessageInput";
import avatar from "../assets/avatar.png";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const scrollRef = useRef(null);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      <ChatHeader />

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 pb-28 bg-base-100 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          const profilePic = isOwnMessage
            ? authUser.profilePic || avatar
            : selectedUser.profilePic || avatar;

          return (
            <div
              key={message._id}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={profilePic} alt="avatar" />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </time>
              </div>
              <div className="chat-bubble max-w-[90%]">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>
    </div>
  );
};

export default ChatContainer;
