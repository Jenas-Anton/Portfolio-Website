"use client";
import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";

const EmailSection = () => {
  const [state, handleSubmit] = useForm("mgvadaka");

  if (state.succeeded) {
    return (
      <section className="text-center py-24">
        <p className="text-transparent bg-clip-text bg-gradient-to-r  from-gray-100 via-gray-200 to-gray-400 text-[40px]">
          Your message has been sent
        </p>
      </section>
    );
  }

  return (
    <section id="contact" className="py-28 px-6 max-w-2xl mx-auto">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500 mb-6">Let&apos;s Connect</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <label htmlFor="firstName" className="text-white text-xl block mb-2">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg w-full p-4"
              placeholder="John"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="lastName" className="text-white text-xl block mb-2">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg w-full p-4"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-white text-xl block mb-2">Your Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg w-full p-4"
            placeholder="youremail@company.com"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="message" className="text-white text-xl block mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            required
            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg w-full p-4"
            placeholder="Let's talk about..."
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-6 px-7 rounded-lg"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default EmailSection;
