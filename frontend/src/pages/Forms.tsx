import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "/api/form";

export default function Form() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uuid: id || "",
    name: "",
    goal: "",
    symptom: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_BASE}/${id}`)
        .then((res) => {
          setFormData(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load form. Please try again.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(API_BASE, formData);
      alert("Form saved!");
      navigate("/");
    } catch {
      alert("Error saving form. Please try again.");
    }
  };

  if (loading) return <p style={{ color: "#800020", fontWeight: "bold" }}>Loading...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",  
        width: "100vw",    
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff0f5", 
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          padding: "2rem",
          borderRadius: "12px",
          backgroundColor: "#ffe6f0",
          boxShadow: "0 4px 10px rgba(128, 0, 32, 0.2)",
        }}
      >
        <h2 style={{ color: "#800020", marginBottom: "1.5rem", textAlign: "center" }}>
          Meela Intake Form
        </h2>

        {error && <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <label style={{ color: "#800020", fontWeight: "600" }}>
            What would you like to work on?
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., anxiety, depression etc."
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "6px",
                border: "1px solid #cc3366",
                fontSize: "1rem",
                marginTop: "0.3rem",
              }}
              required
            />
          </label>

          <label style={{ color: "#800020", fontWeight: "600" }}>
            What would you like to work on or learn in therapy?
            <input
              type="text"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="e.g., coping strategies, self-care, etc."
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "6px",
                border: "1px solid #cc3366",
                fontSize: "1rem",
                marginTop: "0.3rem",
              }}
            />
          </label>

          <label style={{ color: "#800020", fontWeight: "600" }}>
            What gender do you identify with?
            <textarea
              name="symptom"
              value={formData.symptom}
              onChange={handleChange}
              placeholder="woman, man, non-binary, prefer not to say etc."
              rows={4}
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "6px",
                border: "1px solid #cc3366",
                fontSize: "1rem",
                marginTop: "0.3rem",
                resize: "vertical",
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              backgroundColor: "#800020",
              color: "#ffe6f0",
              fontWeight: "700",
              padding: "0.75rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1.1rem",
              marginTop: "1rem",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#cc3366")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#800020")}
          >
            Save Form
          </button>
        </form>
      </div>
    </div>
  );
}
