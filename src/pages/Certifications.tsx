

import { useState } from "react";
import { certifications } from "../data/certifications";

export default function Certifications() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1
        data-aos="fade-up"
        className="text-3xl font-semibold text-gray-900 dark:text-gray-100"
      >
        Certifications
      </h1>

      <p
        data-aos="fade-up"
        data-aos-delay="100"
        className="mt-2 text-gray-600 dark:text-gray-400"
      >
        Professional certifications and verified credentials.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {certifications.map((cert, index) => {
          const isFlipped = flipped === index;

          return (
            <div
              key={cert.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="perspective"
            >
              <div
                onClick={() =>
                  setFlipped(isFlipped ? null : index)
                }
                className={`
                  relative h-48 w-full cursor-pointer
                  transition-transform duration-700
                  [transform-style:preserve-3d]
                  ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
                `}
              >
                {/* FRONT */}
               <div
  className="
    absolute inset-0
    rounded-lg
    border border-gray-200 dark:border-white/10
    bg-white dark:bg-gray-900
    p-6 shadow-sm
    [backface-visibility:hidden]
  "
>
      


  {/* Image Preview */}
  {cert.image && (
    <div className="h-24 w-full overflow-hidden">
      <img
        src={cert.image}
        alt={cert.title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  )}

      




 

  <h3 className="text-xl font-semibold heading-accent">
    {cert.title}
  </h3>

  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
    {cert.issuer} · {cert.year}
  </p>

  <p className="mt-6 text-xs text-gray-500 dark:text-gray-500">
    Click to view
  </p>
</div>


                {/* BACK */}
                <div
                  className="
                    absolute inset-0
                    rounded-lg
                    border border-gray-200 dark:border-white/10
                    bg-gray-100 dark:bg-black
                    p-6 shadow-sm
                    flex flex-col justify-center items-center
                    [transform:rotateY(180deg)]
                    [backface-visibility:hidden]
                  "
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Open certificate
                  </p>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="
                      px-4 py-2 rounded-md
                      bg-gradient-to-r from-blue-500 to-emerald-500
                      hover:from-blue-600 hover:to-emerald-600
                      text-white text-sm font-medium
                      transition
                    "
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* local utility */}
      <style>
        {`
          .perspective {
            perspective: 1200px;
          }
        `}
      </style>
    </section>
  );
}



