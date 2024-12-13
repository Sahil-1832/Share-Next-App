"use client"
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { app } from '/firebaseConfig'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { PanelRightClose } from 'lucide';
function Upgrade() {
  const { user } = useUser();
  const db = getFirestore(app);
  const date = new Date();
  const today = date.toISOString().slice(0, 10);

  const updatePlan = async (price) => {
    const data = {
      userName: user.fullName,
      plan: (price === 60) ? "pro" : "premium",
      date: today,
    }
    console.log("user name:", user.fullName);
    await setDoc(doc(db, "upgrade", user.fullName), data);
    window.location.reload();
  }

  const handlePayment = async (price) => {
    console.log("Amount:",price);
    try {
      console.log("Initiating payment...");

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: price * 100 }),
      });

      const data = await response.json();
      console.log("Order API Response:", data);


      if (!data.orderId) {
        throw new Error("Failed to create order");
      }

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: price * 100,
        currency: "INR",
        order_id: data.orderId,
        name: "SHARE NEXT",
        description: `Upgrade your plan for ₹${price}`,
        handler: function (response) {
          console.log("Payment successful:", response);
          updatePlan(price);
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (typeof window.Razorpay !== "function")
        throw new Error("Razorpay SDK not  loaded");

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay SDK loaded manually");
    script.onerror = () => console.error("Failed to load Razorpay SDK manually");
    document.body.appendChild(script);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className='hover:shadow-blue-500/50 bg-white rounded-2xl shadow-lg p-8 transition hover:scale-105'>
          <h3 className='text-2xl font-semibold text-primary mb-4'>Basic</h3>
          <p className="text-4xl font-bold text-gray-900 mb-6">
            Free
          </p>
          <ul className='space-y-4 mb-6'>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Upload upto 5MB file
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Access to last 10 files
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Expiry after 1 month
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Email Support
            </li>
          </ul>
          <button className="w-full mt-10 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500">Get Started</button>
        </div>   
        <div className='hover:shadow-blue-500/50 bg-white rounded-2xl shadow-lg p-8 transition hover:scale-105'>
          <h3 className='text-2xl font-semibold text-primary mb-4'>Pro</h3>
          <p className="text-4xl font-bold text-gray-900 mb-6">
            ₹60 <span className="text-gray-500 text-lg">/month</span>
          </p>
          <ul className='space-y-4 mb-6'>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Upload upto 15MB file
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Access to last 15 files
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Expiry after 1.5 month
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Email Support
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Phone Support
            </li>
          </ul>
          <button onClick={()=>{handlePayment(60)}} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500">Get Started</button>
        </div>
        <div className='hover:shadow-blue-500/50 bg-white rounded-2xl shadow-lg p-8 transition hover:scale-105'>
          <h3 className='text-2xl font-semibold text-primary mb-4'>Premium</h3>
          <p className="text-4xl font-bold text-gray-900 mb-6">
            ₹100 <span className="text-gray-500 text-lg">/month</span>
          </p>
          <ul className='space-y-4 mb-6'>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Upload upto 25MB file
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Access to all files
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Expiry after 2 month
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Email Support
            </li>
            <li className='flex items-center gap-2 text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Phone Support
            </li>
          </ul>
          <button onClick={()=>{handlePayment(100)}} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500">Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Upgrade