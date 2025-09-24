import React, { useState } from 'react';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import { replace, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, authUser } = useAuthStore();
  const { users } = useChatStore();

  const [search, setSearch] = useState('');
  const [chats, setChats] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    document.getElementById('my-drawer-4').checked = true;
    setChats(users);
  };

  const filteredChats = chats.filter((chat) =>
    (chat.fullName || 'Unknown').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="navbar h-20 bg-base-100 shadow-sm z-50 fixed top-0 left-0 right-0 px-4">

      {/* 🟦 Left toggle (Open Chats) — only visible on mobile */}
      <label htmlFor="chat-drawer" className="btn btn-square btn-ghost lg:hidden mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>

      {/* 🖼️ Brand logo */}
      <div className="flex-1">
        <a onClick={() => navigate('/home')} className="cursor-pointer">
          <img src={logo} alt="MemeIt logo" className="h-25 w-auto" />
        </a>
      </div>

      {/* 🔍 Search + Chat Drawer + Profile */}
      <div className="flex gap-2 items-center">

        {/* 🔎 Right Chat Drawer */}
        <div className="drawer drawer-end z-40">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-primary p-2"
              onClick={handleSearch}
            >
              <img src="chat.svg" alt="New chats" className="w-5 h-5" />
            </label>
          </div>

          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-4" className="drawer-overlay" />
            <div className="bg-base-200 text-base-content w-80 p-4 pt-2 h-[calc(100vh-5rem)] mt-20 overflow-y-auto relative">

              {/* ❌ Close button */}
              <button
                onClick={() => (document.getElementById('my-drawer-4').checked = false)}
                className="btn btn-sm btn-circle absolute top-2 right-2 z-10"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-4 mt-8">Contacts</h2>
              {filteredChats.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {filteredChats.map((chat) => (
                    <li
                      key={chat._id}
                      className="p-3 rounded-lg bg-base-100 hover:bg-base-300 cursor-pointer transition-all"
                    >
                      <div className="font-medium">{chat.fullName || 'Unknown'}</div>
                      <div className="text-sm text-base-content/70 truncate">
                        {chat.lastMessage || 'No messages yet'}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-400 italic">No chats to show</div>
              )}
            </div>
          </div>
        </div>

        {/* 🔍 Input */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-24 md:w-auto"
          />
        </form>

        {/* 🧑 Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Display Picture" src={authUser?.profilePic || avatar} />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <button onClick={()=>navigate('/profile',{replace:true})}>Profile</button>
            </li>
            <li>
              <button onClick={()=>navigate('/setting',{replace:true})}>Settings</button>
            </li>
            <li>
              <button onClick={handleLogout} className="text-left w-full">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
