import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import the Email.js library

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your actual EmailJS service ID, template ID, and user ID
    const serviceId = "service_saq1vwc";
    const templateId = "template_1pimfza";
    const userId = "BGL4ne14TGrfRN8n3";

    const templateParams = {
      email: email,
    };

    // Use emailjs.send() to send the email
    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log("Success!", response.status, response.text);
        setEmail(""); // Reset the email input after successful submission
      })
      .catch((err) => {
        console.error("Error occurred:", err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h2 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className={`p-2 mb-4 rounded-md border ${
          email ? "bg-black text-white" : "bg-dark-900 text-white"
        }`} // Conditional class for color change
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
      >
        Subscribe
      </button>
    </form>
  );
};

export default Newsletter;
