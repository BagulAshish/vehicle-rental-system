import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800 dark:text-gray-200 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to Wheels On Demand. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data.
      </p>
      
      <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
      <p>We collect personal data such as name, email, phone number, and booking details when you use our services.</p>

      <h2 className="text-xl font-semibold mt-6">2. How We Use Your Information</h2>
      <p>We use your data for processing rentals, customer support, and service improvements.</p>

      <h2 className="text-xl font-semibold mt-6">3. Data Protection</h2>
      <p>We implement security measures to protect your information from unauthorized access.</p>

      <h2 className="text-xl font-semibold mt-6">4. Third-Party Sharing</h2>
      <p>We do not sell or share your personal data with third parties except as required by law.</p>

      <h2 className="text-xl font-semibold mt-6">5. Contact Us</h2>
      <p>If you have any questions, contact us at <a href="mailto:support@wheelsondemand.com" className="text-blue-500 dark:text-blue-400">support@wheelsondemand.com</a>.</p>
    </div>
  );
}