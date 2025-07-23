import React, { useState } from "react";
import {
  RiWhatsappLine,
  RiFacebookFill,
  RiInstagramLine,
  RiTwitterXLine,
} from "react-icons/ri";

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
    <section className="bg-gradient-to-br from-blue-100 via-white to-green-100 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side - Contact Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you. Fill in the form below and we'll get
            back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Your message"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side - Social & Contact Info */}
        <div className="bg-gradient-to-b from-blue-700 to-green-600 text-white p-8 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">Connect with us</h3>
          <p className="mb-6 text-white/90">
            Follow us on social media or reach out directly:
          </p>
          <div className="flex space-x-4 text-2xl mb-6">
            <a
              href="https://wa.me/your-number"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <RiWhatsappLine className="hover:text-green-300 transition" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <RiFacebookFill className="hover:text-blue-300 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <RiInstagramLine className="hover:text-pink-300 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <RiTwitterXLine className="hover:text-sky-300 transition" />
            </a>
          </div>
          <div className="text-sm space-y-2">
            <p>
              <strong>Email:</strong> support@moflinks.com
            </p>
            <p>
              <strong>Phone:</strong> +254 712 345 678
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
