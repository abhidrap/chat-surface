import React from "react";
import Sidebar from "../Components/Sidebar";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../Components/NoChatSelected";
import ChatWindow from "../Components/ChatWindow";

const HomePage = () => {
  const { selectedUsers } = useChatStore();
  return (
    <div className="container">
      <div className="row">
        <Sidebar />
        {!selectedUsers ? <NoChatSelected /> : <ChatWindow />}
      </div>
    </div>
  );
};

export default HomePage;
