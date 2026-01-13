

import { achievements } from "../data/achievements";

export default function Achievements() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1
        data-aos="fade-up"
        className="text-3xl font-semibold text-gray-900 dark:text-gray-100"
      >
        Achievements
      </h1>

      <p
        data-aos="fade-up"
        data-aos-delay="100"
        className="mt-2 text-gray-600 dark:text-gray-400"
      >
        Key milestones and recognitions.
      </p>

      <div className="mt-10 space-y-6">
        {achievements.map((item, index) => (
          <div
            key={item.title}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="
              rounded-lg
              border border-gray-200 dark:border-white/10
              bg-white dark:bg-gray-900
              p-6
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.year}
              </span>
            </div>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
