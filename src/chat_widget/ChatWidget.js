/* global ChatComponent */
import React, { useEffect } from "react";
import "./ChatWidget.css";

const ChatWidget = () => {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      // Check if the chat container exists
      let chatContainer = document.getElementById("chat-container");

      const handleReload = () => {
        // This will hard reload the page
        window.location.reload(true);
      };

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
        <button onClick={handleReload} className="reload-button">
          Reload Page
        </button>;
      }
    });
  }, []);

  return null;
};

export default ChatWidget;
