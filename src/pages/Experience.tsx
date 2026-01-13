


import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h2
        className="text-3xl font-bold text-gray-900 dark:text-gray-100"
        data-aos="fade-up"
      >
        Experience
      </h2>

      <p
        className="mt-4 text-gray-600 dark:text-gray-400"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        My academic journey and professional internship experience.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {experience.map((item, index) => (
          <div
            key={item.title}
            data-aos="fade-up"
            data-aos-delay={index * 120}
            className="
              rounded-xl
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-white/10
              p-6
              shadow-sm
            "
          >
            <span className="text-xs uppercase tracking-wide text-blue-600 dark:text-emerald-400">
              {item.type}
            </span>

            <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.organization}
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              {item.duration}
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {item.description.map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
