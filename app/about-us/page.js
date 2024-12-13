import Image from 'next/image';
import Header from '../_components/Header';

export default function AboutUsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <section
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/about-us-hero.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white">Changing the Way You<span className='text-primary'> Share Files</span></h1>
          <p className="text-white mt-4">Fast, secure, and reliable file sharing for everyone.</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600">
            We envision a world where sharing files is effortless, secure, and accessible to everyone.
            Our platform aims to simplify the process of transferring data, ensuring a seamless experience.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Image src="/story.jpg" alt="Our Story" width={500} height={300} className="rounded-lg shadow-lg" />
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Our journey started with a commitment to solving these challenges. We brainstormed, designed, and 
              developed Share Next with the user in mind. Along the way, we focused on incorporating features like 
              generating secure links, password-protected files, and email notifications—all packed into a clean and intuitive interface.
            </p>
            <p className="text-gray-600">
            Share Next is more than just a file-sharing app. It’s a promise to our users—a promise to provide a reliable, secure, and 
            user-friendly platform that evolves with your needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Share Together</h2>
          <p className="mb-6">
            Join us in our mission to make file sharing simple and secure. Whether you’re sharing memories, work files, or creative
            projects, we’ve got you covered. Let’s make sharing easier, together.
          </p>
          <a
            href="/upload"
            className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-md shadow-md hover:bg-blue-100"
          >
            Start Sharing Now
          </a>
        </div>
      </section>

      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>© 2024 Share Next. All rights reserved.</p>
      </footer>
    </div>
  );
}
