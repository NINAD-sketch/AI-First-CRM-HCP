import Header from "./components/Header";
import InteractionForm from "./components/InteractionForm";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          padding: "30px",
          gap: "20px",
        }}
      >
        <InteractionForm />
        <ChatBox />
      </div>
    </div>
  );
}

export default App;