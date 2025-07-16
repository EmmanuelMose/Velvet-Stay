import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent by ${form.name}`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex items-center justify-center bg-blue-100 py-10 px-4">
      <div className="w-full max-w-sm bg-blue-100 shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-center text-black-600 transition duration-300 hover:bg-gradient-to-r hover:from-blue-700 hover:to-green-700 hover:bg-clip-text hover:text-transparent">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
