


import React, { useState } from "react";

export default function Contact() {
  const email = "sourabhvamdevan2005@gmail.com";
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      {/* Heading */}
      <h2
        className="text-3xl font-bold text-gray-900 dark:text-gray-100"
        data-aos="fade-up"
      >
        Contact
      </h2>

      <p
        className="mt-4 text-gray-600 dark:text-gray-400"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Feel free to reach out for collaborations, opportunities, or questions.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {/* LEFT: Contact Info */}
        <div
          className="
            rounded-xl p-6
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-white/10
            shadow-sm
          "
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="space-y-5">
            {/* Email */}
            <div className="flex items-center justify-between gap-4">
              <a
                href={`mailto:${email}`}
                className="text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                📧 {email}
              </a>

              <button
                onClick={copyEmail}
                className="
                  text-xs px-3 py-1.5 rounded-md
                  border border-gray-300 dark:border-white/10
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-white/10
                  transition
                "
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

   

        {/* Socials */} 
        <div className="flex gap-4 pt-2"> 
          <a href="https://github.com/your-github-username" target="_blank" rel="noreferrer" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600" > GitHub </a> 
          <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noreferrer" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600" > Twitter </a> 
          </div> </div> </div>



        {/* RIGHT: Contact Form */}
        <form
          action="https://formspree.io/f/xkoonkoz"
          method="POST"
          className="
            rounded-xl p-6 space-y-4
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-white/10
            shadow-sm
          "
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="
                mt-1 w-full rounded-md
                border border-gray-300 dark:border-white/10
                bg-white dark:bg-black
                px-3 py-2 text-sm
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500/40
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="
                mt-1 w-full rounded-md
                border border-gray-300 dark:border-white/10
                bg-white dark:bg-black
                px-3 py-2 text-sm
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500/40
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              className="
                mt-1 w-full rounded-md
                border border-gray-300 dark:border-white/10
                bg-white dark:bg-black
                px-3 py-2 text-sm
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500/40
              "
            />
          </div>

          <button
            type="submit"
            className="
             px-5 py-3 rounded-md
      bg-gradient-to-r from-blue-500 to-emerald-500
      hover:from-blue-600 hover:to-emerald-600
      text-white font-medium
      shadow-sm hover:shadow-md
      transition-all
            "
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}



