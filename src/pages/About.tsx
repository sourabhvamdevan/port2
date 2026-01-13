import React from "react";

const skills = [
  { name: "C++", level: 90 },
  { name: "Generative AI", level: 42 },
  { name: "React", level: 79 },
  { name: "DSA", level: 65 },
  { name: "TypeScript", level: 52 },
  { name: "SQL", level: 70 },
  {name: "Flutter", level:60},
];

export default function About() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* LEFT */}
        <div data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            About me
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Undergraduate student and developer. I focus on building software
            applications, deploying models to edge, and building web
            applications that make research usable.
          </p>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
         I'm Azure and Oracle certified, with hands-on experience across 15+ projects—ranging from Machine Learning and Generative AI to Full-Stack and 3D web apps using Three.js. 
         My work blends creativity with performance, solving real-world problems through smart engineering.
          </p>
           <p className="mt-4 text-gray-600 dark:text-gray-400">
         Currently, I’m exploring the frontier of Generative AI—working with LLMs, RAG, and agentic AI systems to build intelligent, context-aware, human-like applications.
         I believe great tech is accessible, scalable, and impactful—and I’m always excited to collaborate and turn ideas into reality.
          </p>

        
      
        </div>
    

        {/* RIGHT */}
        <div data-aos="fade-up" data-aos-delay="150">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Skills
          </h3>

          <div className="mt-4 space-y-4">
            {skills.map((s, index) => (
              <div
                key={s.name}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>{s.name}</span>
                  <span>{s.level}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 mt-2">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{
                      width: `${s.level}%`,
                      background:
                        "linear-gradient(90deg,#7c3aed,#06b6d4)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* TOOLS */}
          <div
            className="mt-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h4 className="text-sm text-gray-700 dark:text-gray-300">
              Tools & Cloud
            </h4>

            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Git",
                "Docker",
                "Postgres",
                "AWS",
                "GCP",
                "Azure",
                "Figma",
              ].map((t) => (
                <span
                  key={t}
                  className="
                    px-3 py-1 rounded text-sm
                    bg-gray-100 dark:bg-gray-900
                    border border-gray-200 dark:border-white/10
                    text-gray-700 dark:text-gray-300
                  "
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


