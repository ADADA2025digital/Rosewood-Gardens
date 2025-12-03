import React, { useState, useEffect, useRef } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Logo from "../assets/logo-sm.png";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [fbLoaded, setFbLoaded] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hey there! How can we help you today?",
      isUser: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const messagesEndRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Facebook SDK and plugin
  useEffect(() => {
    if (!window.FB) {
      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: "v18.0",
        });
        setFbLoaded(true);

        // Listen for messages from Facebook plugin
        window.FB.Event.subscribe("customerchat.show", () => setOpen(true));
        window.FB.Event.subscribe("customerchat.hide", () => setOpen(false));
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    } else {
      setFbLoaded(true);
    }
  }, []);

  const handleChatOpen = () => {
    setOpen(true);
    if (window.FB && window.FB.CustomerChat) {
      window.FB.CustomerChat.showDialog();
    }
  };

  const handleCloseChat = () => {
    setOpen(false);
    if (window.FB && window.FB.CustomerChat) {
      window.FB.CustomerChat.hideDialog();
    }
  };

  // Function to send message to Facebook Messenger
  const sendToMessenger = (message) => {
    if (window.FB && window.FB.CustomerChat) {
      window.FB.CustomerChat.update({
        logged_in_greeting: message,
        logged_out_greeting: message,
      });

      // In a real implementation, you would use the Messenger API to send messages
      // This is a simplified version for demonstration
      console.log("Message sent to Messenger:", message);
    }
  };

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    // Add user message to UI
    const userMessage = {
      text: message,
      isUser: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Send message to Facebook Messenger
    sendToMessenger(message);

    // Simulate bot response (in real app, this would come from Messenger webhook)
    setTimeout(() => {
      const botMessage = {
        text: "Thanks for your message! We'll get back to you soon.",
        isUser: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    const picker = emojiPickerRef.current;
    if (!picker) return;

    picker.togglePicker(emojiIconRef.current);
  };

  return (
    <div className="position-fixed bottom-0 end-0 m-3 z-3">
      {/* Facebook Customer Chat Plugin - Hidden but functional */}
      <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id="100094257210108"
        theme_color="#20cef5"
        logged_in_greeting="Hi! How can we help you?"
        logged_out_greeting="Hi! How can we help you?"
      ></div>

      {!open && (
        <button
          className="chatBtn d-flex align-items-center justify-content-center rounded-circle border-0 position-relative text-decoration-none"
          onClick={handleChatOpen}
          aria-label="Chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height="1.6em"
            fill="white"
          >
            <path d="M256 0C114.84 0 0 106.04 0 236.8c0 73.28 35.27 139.03 91.2 183.67V512l83.59-45.82c25.4 7.04 52.45 10.87 81.21 10.87 141.16 0 256-106.03 256-236.8S397.16 0 256 0zm41.55 275.62l-61.58-65.33-117.18 65.33 140.49-149.09 63.15 65.33 116.02-65.33-141.9 149.09z" />
          </svg>
          <span className="tooltip d-flex justify-content-center px-2 py-1 fw-bold text-white position-absolute rounded">
            Chat
          </span>
        </button>
      )}

      {open && (
        <div
          className="chat-popup card border-0 shadow-lg"
          style={{ width: "350px" }}
        >
          <div className="chat-box card-header d-flex justify-content-between align-items-center text-white gap-3 p-2">
            <div className="d-flex align-items-center gap-2">
              <div className="position-relative">
                <img
                  src={Logo}
                  alt="Rosewood Gardens Logo"
                  className="img-fluid rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                />
                <div
                  className="position-absolute text-success"
                  style={{ right: "0px", bottom: "-5px" }}
                >
                  <i className="bi bi-record-fill"></i>
                </div>
              </div>

              {/* Name and Online Status */}
              <div className="text-start">
                <h6 className="fw-bold fs-5 d-block m-0">Rosewood Gardens</h6>
                <p className="small m-0">Online</p>
              </div>
            </div>

            <div
              className="position-relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <i className="bi bi-three-dots-vertical fs-5 text-white"></i>
              {showDropdown && (
                <div
                  className="position-absolute bg-white shadow rounded p-2"
                  style={{ top: "100%", right: 0, zIndex: 1000 }}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div
                    className="mb-2 text-dark"
                    onClick={handleCloseChat}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </div>
                  <div className="text-dark" style={{ cursor: "pointer" }}>
                    <i className="bi bi-question-circle"></i>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="card-body p-3 small"
            style={{ height: "300px", overflowY: "auto" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.isUser ? "text-end" : "text-start"}`}
              >
                <div
                  className={`rounded p-2 d-inline-block ${
                    msg.isUser
                      ? "chat-box text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-muted small">{msg.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="card-footer bg-white p-2">
            <div className="input-group  bg-white align-items-center">
              {/* File Upload Icon */}
              <label
                className="input-group-text bg-transparent border-0 px-1 m-0"
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-paperclip fs-5"></i>
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    console.log("Selected file:", e.target.files[0])
                  }
                />
              </label>

              {/* Message Input */}
              <input
                type="text"
                className="form-control border-0"
                placeholder="Enter Message"
                id="user-input"
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(message);
                    setMessage("");
                  }
                }}
                style={{ boxShadow: "none" }}
              />

              {/* Emoji Icon */}
              <span
                className="input-group-text bg-transparent border-0 px-2 m-0"
                style={{ cursor: "pointer" }}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <i className="bi bi-emoji-smile fs-5"></i>
              </span>

              {/* Send Button */}
              <span
                className="input-group-text bg-transparent border-0 px-2 m-0"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const input = document.getElementById("user-input");
                  handleSendMessage(input.value);
                  input.value = "";
                }}
              >
                <i className="bi bi-send-fill dark-text fs-5"></i>
              </span>
            </div>
            {showEmojiPicker && (
              <div
                className="emoji-picker-wrapper mt-2"
                style={{ maxHeight: "150px", width: '350px', overflowY: "scroll" }}
              >
                <Picker
                  data={data}
                  theme="light"
                  onEmojiSelect={(emoji) =>
                    setMessage((prev) => prev + emoji.native)
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
