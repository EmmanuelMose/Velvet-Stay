import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateTicketMutation } from "../../../Features/tickets/ticketAPI";
import type { RootState } from "../../../app/store";

const Tickets = () => {
  const userId = useSelector((state: RootState) => state.user.user?.userId);
  const [createTicket] = useCreateTicketMutation();

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject || !formData.description || !userId) return;

    try {
      await createTicket({
        ...formData,
        userId,
      }).unwrap();

      setFormData({ subject: "", description: "" });
      alert("Support ticket submitted successfully!");
    } catch (error) {
      console.error("Failed to create ticket:", error);
      alert("Failed to submit ticket. Try again.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit a Support Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Describe your issue..."
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default Tickets;
