import React, { useEffect } from "react";

const ChatWidget = () => {
  useEffect(() => {
    // Check if the chat container exists
    let chatContainer = document.getElementById("chat-container");
    // If the chat container doesn't exist, create it
    if (!chatContainer) {
      chatContainer = document.createElement("div");
      chatContainer.id = "chat-container";
      document.body.appendChild(chatContainer);
    }
    // Initialize the Chat component
    if (window.ChatComponent) {
      ChatComponent.init(
        process.env.REACT_APP_CHATBOT_API_KEY,
        "#chat-container"
      );
    } else {
      console.error("ChatComponent is not available");
    }
  }, []);

  return null;
};

export default ChatWidget;
