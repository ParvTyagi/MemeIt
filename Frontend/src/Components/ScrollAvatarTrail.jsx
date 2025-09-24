// ScrollAvatarTrail.jsx
import React from "react";
import defaultAvatar from "../assets/avatar.png";

const ScrollAvatarTrail = ({ users, onlineUsers, selectedUser, setSelectedUser }) => {
  return (
    <div className="w-full h-[500px] mx-auto max-w-xs relative">
      {/* Custom scrollbar styling */}
      <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent hover:scrollbar-thumb-base-200">
        <div className="space-y-1">
          {users.map((user, index) => {
            const isOnline = onlineUsers.includes(user._id);
            const isActive = selectedUser?._id === user._id;
            
            return (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`
                  group relative flex items-center p-4 gap-3 rounded-xl cursor-pointer 
                  transition-all duration-300 ease-out transform
                  hover:scale-[1.02] hover:shadow-lg hover:-translate-y-0.5
                  ${isActive 
                    ? "bg-gradient-to-r from-primary to-primary-focus text-primary-content shadow-xl scale-[1.01]" 
                    : "bg-base-100 hover:bg-base-200 hover:shadow-md"
                  }
                  ${index === 0 ? "mt-0" : ""}
                `}
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animation: "fadeInUp 0.4s ease-out forwards"
                }}
              >
                {/* Avatar with online indicator */}
                <div className="relative flex-shrink-0">
                  <div className="avatar transition-all duration-300">
                    <div className="w-12 h-12 rounded-full">
                      <img
                        src={user.profilePic || defaultAvatar}
                        alt={user.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Enhanced online indicator */}
                  {isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center">
                      <div className="w-4 h-4 bg-success rounded-full border-2 border-base-100 animate-pulse">
                        <div className="w-2 h-2 bg-success-content rounded-full mx-auto mt-0.5"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* User info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm truncate">
                      {user.fullName || user.username || "User"}
                    </h4>
                    
                    {/* Message time or unread indicator */}
                    {user.unreadCount > 0 && (
                      <div className="badge badge-error badge-xs text-white font-bold">
                        {user.unreadCount > 99 ? "99+" : user.unreadCount}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs truncate text-base-content/70">
                    {user.lastMessage || "No messages yet"}
                  </p>
                </div>

                {/* Subtle gradient overlay for active state */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl pointer-events-none"></div>
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
        
        {/* Empty state */}
        {users.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="avatar placeholder mb-4">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <h3 className="text-base-content/60 font-medium mb-2">No conversations yet</h3>
            <p className="text-base-content/40 text-sm">Start a new conversation to see it here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollAvatarTrail;