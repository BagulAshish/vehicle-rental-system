import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactUs() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_bgeg54v", 
        "template_qj74ldh", 
        {
          email: formData.email,
          message: formData.message,
          to_email: "asbagul04@gmail.com", 
        },
        "FxO5i760O0IB7aVS-" 
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ email: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send message. Try again.");
          console.error("Email error:", error);
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Contact Us</h2>

        <form onSubmit={sendEmail} className="mt-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Your Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              name="message"
              required
              rows="4"
              className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Enter your message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Send Message
          </button>
        </form>

        {status && <p className="mt-3 text-center text-sm text-green-500">{status}</p>}
      </div>
    </div>
  );
}