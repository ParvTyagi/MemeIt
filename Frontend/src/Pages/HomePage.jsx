import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatContainer from "../Components/ChatContainer";
import MessageInput from "../Components/MessageInput";
import ScrollAvatarTrail from "../Components/ScrollAvatarTrail";
import PlaceHolderGrid from "../Components/PlaceHolderGrid";

const HomePage = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-info w-12 h-12"></span>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Sidebar + Chat Layout */}
      <div className="drawer lg:drawer-open pt-20 h-[calc(100vh-5rem)] flex">
        <input id="chat-drawer" type="checkbox" className="drawer-toggle" />

        {/* Sidebar */}
        <div className="drawer-side z-40">
          <label htmlFor="chat-drawer" className="drawer-overlay" />
          <div className="menu bg-base-200 w-80 h-full p-4 overflow-y-auto">
            <div className="lg:hidden flex justify-end mb-2">
              <button
                onClick={() =>
                  (document.getElementById("chat-drawer").checked = false)
                }
                className="btn btn-sm btn-circle"
              >
                ✕
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-center">Chats</h2>

            {users.length > 0 ? (
              <ScrollAvatarTrail
                users={users}
                onlineUsers={onlineUsers}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            ) : (
              <p className="text-sm text-center italic text-gray-400">
                No users available
              </p>
            )}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="relative flex flex-col flex-1">
          {selectedUser?._id ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-hidden">
                <ChatContainer />
              </div>

              {/* Message Input Fixed at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-700 bg-base-100 z-50 h-3.5">
                <MessageInput />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <div className="text-zinc-500 text-center">
                <PlaceHolderGrid/>
                Select a user to start chatting
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;