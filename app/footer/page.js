"use client"
import React, { useState } from "react";

export default function Footer(){
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent("");
  };

  const policies = {
    terms: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
        <p>Welcome to SHARE NEXT. By using our platform, you agree to abide by the following terms:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>You are responsible for ensuring that all information provided on the platform is accurate and up to date.</li>
          <li>Any unauthorized use or breach of our platform's security may result in suspension of services and legal action.</li>
          <li>All content, data, and intellectual property on the platform belong to SHARE NEXT unless stated otherwise.</li>
          <li>All disputes will be resolved under the jurisdiction of Kangra, Himachal Pradesh.</li>
          <li>By continuing to use our services, you agree to these terms and our policies.</li>
        </ul>
      </div>
    ),
    privacy: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p>SHARE NEXT is committed to protecting your privacy. Here's how we handle your data:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>We collect basic user information, including name, email, and usage data, to improve our services.</li>
          <li>Your data is used solely for enhancing user experience and facilitating seamless transactions.</li>
          <li>We do not sell, rent, or share your personal information with third parties without your explicit consent.</li>
          <li>You may request data deletion or updates by contacting sharenext.connect@gmail.com.</li>
          <li>Your trust is our priority, and we adhere to the best data protection practices.</li>
        </ul>
      </div>
    ),
    refund: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Refund & Cancellation Policy</h2>
        <p>Our refund and cancellation policy ensures a hassle-free experience for our users:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Refund requests can be initiated within 14 days of purchase through your account dashboard.</li>
          <li>Upon approval, refunds are processed within 7-10 business days to the original payment method.</li>
          <li>Orders can be canceled for a full refund before they are shipped or processed.</li>
          <li>For any issues, contact us at sharenext.connect@gmail.com with your order details.</li>
          <li>We strive to resolve all refund and cancellation queries promptly and fairly.</li>
        </ul>
      </div>
    ),
    shipping: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
        <p>SHARE NEXT aims to ensure reliable delivery of functionalities to all users:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>SHARE NEXT offers online services and functionality.</li>
          <li>No physical products are shipped to users.</li>
          <li>A shipping policy is not applicable to our platform.</li>
          <li>For queries, email us at sharenext.connect@gmail.com.</li>
        </ul>
      </div>
    ),
    contact: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p>We're here to help! Reach out to us for support or inquiries:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Phone: +91-7876202496 (Available Monday to Friday, 9 AM to 6 PM)</li>
          <li>Email: sharenext.connect@gmail.com (We respond within 24-48 hours)</li>
          <li>Address: SHARE NEXT, Kangra, Himachal Pradesh, India - 176201</li>
          <li>Social Media: Connect with us on our official platforms for the latest updates.</li>
        </ul>
      </div>
    ),
  };
  

  return (
    <div className="footer bg-gray-800 text-white py-6">
      <div className="text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} SHARE NEXT. All rights reserved.</p>
        <ul className="flex justify-center space-x-6 mt-4 text-sm">
          <li
            className="cursor-pointer hover:underline"
            onClick={() => openModal(policies.terms)}
          >
            Terms & Conditions
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => openModal(policies.privacy)}
          >
            Privacy Policy
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => openModal(policies.refund)}
          >
            Refund Policy
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => openModal(policies.shipping)}
          >
            Shipping Policy
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => openModal(policies.contact)}
          >
            Contact Us
          </li>
        </ul>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              ✕
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};

