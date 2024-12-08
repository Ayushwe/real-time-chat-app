import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src="data:image/jpeg;base64,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" />
          </div>
        </div>
        <div>
          <h1 className=" font-bold">{user.name}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
