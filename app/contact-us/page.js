import React from "react";
import Header from '../_components/Header';
import Footer from '../footer/page';

const ContactUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <section
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage:"url(/contact-hero.jpg)"}}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white"><span className='text-primary'>Let's Connect, </span>We Are Here For You</h1>
          <p className="text-white mt-4 px-5">Have any questions, suggestions, or just want to chat? We're always here to help and support you. Get in touch with us, and let's make something great together.</p>
        </div>
      </section>

      <section className="container mx-auto px-6 mb-12 mt-6">
        <div className="grid md:grid-cols-2 gap-12 px-24">
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800">Working Hours</h3>
            <p className="text-gray-600 mt-2">
              Our team is available to assist you during the following hours. We strive to respond as quickly as possible to ensure you receive the support you need.
            </p>
          </div>

          <div>
            <ul className="text-gray-600">
              <li className="mb-2">
                <strong>Weekdays:</strong> Monday - Friday: 9 AM - 6 PM
              </li>
              <li className="mb-2">
                <strong>Saturday:</strong> 10 AM - 4 PM
              </li>
              <li className="mb-2">
                <strong>Closed:</strong> Sunday & Public Holidays
              </li>
            </ul>
            <p className="text-gray-500 mt-4">
              For urgent queries, please email us, and we will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow-lg px-20 py-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mt-3">Email Us</h3>
          <p className="text-gray-600 mt-6">
            Have any questions or need support? Feel free to email us directly, and our team will respond promptly.
          </p>
          <a
            href="mailto:sharmasahil1832@gmail.com"
            className="mt-6 inline-block rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white transition"
          >
            Send an Email
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-lg px-20 py-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mt-3">Connect on LinkedIn</h3>
          <p className="text-gray-600 mt-6">
            Stay connected and follow us on LinkedIn for updates, articles, and job opportunities.
          </p>
          <a
            href="https://www.linkedin.com/in/sahil1832"
            className="mt-6 inline-block rounded-md border border-blue-700 px-4 py-2 text-blue-700 hover:bg-blue-700 hover:text-white transition"
          >
            Visit LinkedIn
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-lg px-20 py-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 nt-3">Follow us on GitHub</h2>
          <p className="text-gray-600 mt-6">
            Explore our projects and collaborate with us on GitHub. We welcome contributions and feedback.
          </p>
          <a
            href="https://github.com/Sahil-1832"
            className="mt-6 inline-block rounded-md border border-blue-700 px-4 py-2 text-blue-700 hover:bg-blue-700 hover:text-white transition"
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="text-center py-8 bg-blue-500 mt-4">
        <p className="text-white">
          We value your feedback and are here to help. Thank you for reaching out!
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
