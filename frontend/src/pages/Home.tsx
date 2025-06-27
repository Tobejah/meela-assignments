import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "/api/form";

export default function Home() {
  const navigate = useNavigate();
  const [resumeId, setResumeId] = useState("");

  const startNewForm = async () => {
    try {
      const res = await axios.post(API_BASE, {
        uuid: "",
        name: "",
        goal: "",
        symptom: "",
      });
      navigate(`/form/${res.data.uuid}`);
    } catch (err) {
      console.error("Error starting new form:", err);
      alert("Failed to start form");
    }
  };

  const resumeForm = () => {
    if (resumeId.trim()) {
      navigate(`/form/${resumeId.trim()}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#fff0f5", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#ffe6f0", 
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 4px 10px rgba(128, 0, 32, 0.2)",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#800020", marginBottom: "1.5rem" }}>
          Welcome to the Meela Intake Form
        </h1>

        <button
          onClick={startNewForm}
          style={{
            backgroundColor: "#800020",
            color: "#ffe6f0",
            fontWeight: "700",
            padding: "0.75rem 2rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1.1rem",
            marginBottom: "2rem",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#cc3366")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#800020")}
        >
          Start New Form
        </button>

        <div>
          <input
            placeholder="Enter your form ID from the URL"
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
            style={{
              padding: "0.6rem",
              width: "70%",
              maxWidth: "350px",
              borderRadius: "6px",
              border: "1px solid #cc3366",
              fontSize: "1rem",
              marginRight: "0.5rem",
            }}
          />
          <button
            onClick={resumeForm}
            style={{
              backgroundColor: "#800020",
              color: "#ffe6f0",
              fontWeight: "700",
              padding: "0.6rem 1.25rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#cc3366")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#800020")}
          >
            Resume Form
          </button>
        </div>
      </div>
    </div>
  );
}
