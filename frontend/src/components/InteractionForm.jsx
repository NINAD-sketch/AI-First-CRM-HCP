import { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addInteraction } from "../store/store";

function InteractionForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    doctorName: "",
    interactionType: "",
    product: "",
    notes: "",
    followUp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/log-interaction",
        formData
      );

      dispatch(addInteraction(formData));

      alert(response.data.message);

      setFormData({
        doctorName: "",
        interactionType: "",
        product: "",
        notes: "",
        followUp: "",
      });
    } catch (error) {
      console.error(error);
      alert("Backend connection failed.");
    }
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
      <h2>Log Interaction</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          value={formData.doctorName}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="text"
          name="interactionType"
          placeholder="Interaction Type"
          value={formData.interactionType}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="text"
          name="product"
          placeholder="Product Discussed"
          value={formData.product}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="text"
          name="followUp"
          placeholder="Follow Up"
          value={formData.followUp}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#1976d2",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Log Interaction
        </button>
      </form>
    </div>
  );
}

export default InteractionForm;