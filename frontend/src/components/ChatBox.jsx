import axios from "axios";
import { useState } from "react";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message: message,
      });

      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
      setResponse("Error communicating with AI.");
    }

    setLoading(false);
    setMessage("");
  };

  return (
    <div
      style={{
        width: "45%",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h2>AI Chat</h2>

      <textarea
        rows="8"
        placeholder="Ask AI anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          width: "100%",
          padding: "12px",
          background: "#4caf50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Thinking..." : "Send to AI"}
      </button>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
          minHeight: "120px",
          background: "#f8f8f8",
        }}
      >
        <strong>AI Response</strong>

        <p>{response}</p>
      </div>
    </div>
  );
}

export default ChatBox;