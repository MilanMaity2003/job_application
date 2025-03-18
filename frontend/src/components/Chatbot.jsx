import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, IconButton, TextField } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY";
const SEARCH_ENGINE_ID = "YOUR_SEARCH_ENGINE_ID";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    const userMessage = input;
    setChatHistory([...chatHistory, { sender: "user", message: userMessage }]);
    setInput("");

    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(userMessage)}&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}`
      );
      const items = response.data.items;
      if (items && items.length > 0) {
        const topResult = items[0];
        const botResponse = topResult.title + " - " + topResult.snippet;
        setChatHistory([...chatHistory, { sender: "user", message: userMessage }, { sender: "bot", message: botResponse }]);
      } else {
        setChatHistory([...chatHistory, { sender: "user", message: userMessage }, { sender: "bot", message: "No results found." }]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setChatHistory([...chatHistory, { sender: "user", message: userMessage }, { sender: "bot", message: "Sorry, there was an error processing your request." }]);
    }
  };

  return (
    <div>
      <IconButton onClick={handleToggle} sx={{ zIndex: 150000 }}>
        <ChatIcon />
      </IconButton>
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            width: 300,
            height: 400,
            bgcolor: "white",
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
            zIndex: 150000,
          }}
        >
          <Typography variant="h6">Chatbot</Typography>
          <Box
            sx={{
              height: "calc(100% - 80px)",
              overflowY: "auto",
              mb: 2,
            }}
          >
            {chatHistory.map((chat, index) => (
              <Typography
                key={index}
                align={chat.sender === "user" ? "right" : "left"}
                sx={{ mt: 1 }}
              >
                {chat.message}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSend}>
              Send
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Chatbot;
