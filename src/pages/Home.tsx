// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const roles = [
//   "aspiring software engineer.",
//   "full-stack developer.",
//   "AI & ML enthusiast.",
// ];

// export default function Home() {
//   const [text, setText] = useState("");
//   const [roleIndex, setRoleIndex] = useState(0);
//   const [charIndex, setCharIndex] = useState(0);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     const current = roles[roleIndex];
//     const speed = deleting ? 40 : 80;

//     const timer = setTimeout(() => {
//       if (!deleting && charIndex < current.length) {
//         setText(current.slice(0, charIndex + 1));
//         setCharIndex(charIndex + 1);
//       } else if (deleting && charIndex > 0) {
//         setText(current.slice(0, charIndex - 1));
//         setCharIndex(charIndex - 1);
//       } else if (!deleting && charIndex === current.length) {
//         setTimeout(() => setDeleting(true), 1000);
//       } else if (deleting && charIndex === 0) {
//         setDeleting(false);
//         setRoleIndex((roleIndex + 1) % roles.length);
//       }
//     }, speed);

//     return () => clearTimeout(timer);
//   }, [charIndex, deleting, roleIndex]);

//   return (
//     <section className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
//       {/* Left content */}
//       <div className="flex-1">
//         {/* TYPEWRITER HEADING */}
//         <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
//           Hi, I’m Sourabh Vamdevan.
//           <br />
//           <span className="text-blue-600 dark:text-emerald-400">
//             {text}
//             <span className="animate-pulse">|</span>
//           </span>
//         </h2>

//         <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
//           Hey there! I'm Sourabh Vamdevan, a Computer Science student passionate
//           about Full-Stack Web Development, Generative AI, and automation. I love
//           transforming ideas into impactful, intelligent, and beautifully
//           designed digital experiences.
//           <br />
//           <br />
//           I'm Azure and Oracle certified, with hands-on experience across 9+
//           projects—ranging from Machine Learning and Generative AI to Full-Stack
//           and 3D web apps using Three.js. My work blends creativity with
//           performance, solving real-world problems through smart engineering.
//           <br />
//           <br />
//           Currently, I’m exploring Generative AI—working with LLMs, RAG, and
//           agentic AI systems to build intelligent, context-aware applications.
//         </p>

//         <div className="mt-8 flex gap-4">
//           <Link
//             to="/projects"
//             className="
//               px-5 py-3 rounded-md
//               bg-gradient-to-r from-blue-500 to-emerald-500
//               hover:from-blue-600 hover:to-emerald-600
//               text-white font-medium
//               shadow-sm hover:shadow-md
//               transition-all
//             "
//           >
//             View Projects
//           </Link>

//           <Link
//             to="/contact"
//             className="
//               px-5 py-3 rounded-md
//               border border-gray-300 dark:border-white/10
//               text-gray-800 dark:text-gray-200
//               hover:bg-gray-100 dark:hover:bg-white/10
//               transition
//             "
//           >
//             Contact
//           </Link>
//         </div>
//       </div>

//       {/* Right card */}
//       <div
//         className="
//           w-full max-w-sm p-6 rounded-2xl
//           bg-white dark:bg-gray-900
//           border border-gray-200 dark:border-white/10
//           shadow-sm
//         "
//       >
//         <h4 className="text-sm text-gray-700 dark:text-gray-300">
//           Quick stats
//         </h4>

//         <div className="mt-4 grid grid-cols-2 gap-4">
//           <div className="p-3 rounded-lg bg-gray-100 dark:bg-white/5 text-center">
//             <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
//               3+
//             </div>
//             <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
//               Production projects
//             </div>
//           </div>

//           <div className="p-3 rounded-lg bg-gray-100 dark:bg-white/5 text-center">
//             <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
//               5+
//             </div>
//             <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
//               Research & prototypes
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lightning from "../components/Lightning";

const roles = [
  "aspiring software engineer.",
  "full-stack developer.",
  "AI & ML enthusiast.",
];

export default function Home() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section className="relative z-0 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 overflow-hidden rounded-2xl min-h-[720px] sm:min-h-0">
      {/* <div className="absolute inset-0 z-0 pointer-events-none">
        <Lightning hue={260} xOffset={0} speed={1} intensity={2.8} size={1.25} />

      </div> */
    <div className="absolute inset-0 z-0 pointer-events-none">
  {/* Light theme */}
 
{/* Light theme */}
<div className="absolute inset-0 z-0 pointer-events-none hidden dark:block">
  <Lightning
    hue={187}
    xOffset={0}
    speed={1}
    intensity={2.4}
    size={1.2}
  />
</div>




  {/* Dark theme */}
 <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block">
  <Lightning hue={270} xOffset={0} speed={1} intensity={2.4} size={1.2} />
  <div className="absolute inset-0 bg-black opacity-[0.01]" />
</div>

</div>

      }
      
      
      
      

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Left content */}
        <div className="flex-1">
          {/* TYPEWRITER HEADING */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
            Hi, I'm Sourabh Vamdevan.
            <br />
            <span className="text-blue-600 dark:text-emerald-400">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            Hey there! I'm Sourabh Vamdevan, a Computer Science student passionate
            about Full-Stack Web Development, Generative AI, and automation. I
            love transforming ideas into impactful, intelligent, and beautifully
            designed digital experiences.
            <br />
            <br />
            I'm Azure and Oracle certified, with hands-on experience across 9+
            projects-r anging from Machine Learning and Generative AI to
            Full-Stack and 3D web apps using Three.js. My work blends creativity
            with performance, solving real-world problems through smart
            engineering.
            <br />
            <br />
            Currently, I'm exploring Generative AI-working with LLMs, RAG, and
            agentic AI systems to build intelligent, context-aware applications.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/projects"
              className="
                px-5 py-3 rounded-md
                bg-gradient-to-r from-blue-500 to-emerald-500
                hover:from-blue-600 hover:to-emerald-600
                text-white font-medium
                shadow-sm hover:shadow-md
                transition-all
              "
            >
              View Projects
            </Link>

            <Link
              to="/contact"
              className="
                px-5 py-3 rounded-md
                border border-gray-300 dark:border-white/10
                text-gray-800 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-white/10
                transition
              "
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right card */}
        {/* Right card with purple halo */}
          {/* Right card with brighter purple halo + revolving lines */}


<div className="relative w-full max-w-sm">
  <div
    className="
      quickstats-neon-card
      bg-white text-slate-900
      dark:bg-[#02080d] dark:text-cyan-100
      border border-cyan-300/40 dark:border-cyan-300/45
    "
  >
    {/* moving border segments */}
    <span className="quickstats-line quickstats-line-top" />
    <span className="quickstats-line quickstats-line-bottom" />

    {/* <h4 className="text-sm tracking-[0.2em] uppercase text-cyan-700 dark:text-cyan-300">
      Quick Stats
    </h4>

    <div className="mt-4 grid grid-cols-2 gap-4">
      <div className="p-3 rounded-md text-center border border-cyan-300/30 bg-cyan-500/10 dark:bg-cyan-500/5">
        <div className="text-2xl font-semibold text-cyan-800 dark:text-cyan-200">3+</div>
        <div className="text-xs mt-1 text-cyan-900/80 dark:text-cyan-100/80">
          Production projects
        </div>
      </div>

      <div className="p-3 rounded-md text-center border border-cyan-300/30 bg-cyan-500/10 dark:bg-cyan-500/5">
        <div className="text-2xl font-semibold text-cyan-800 dark:text-cyan-200">5+</div>
        <div className="text-xs mt-1 text-cyan-900/80 dark:text-cyan-100/80">
          Research & prototypes
        </div>
      </div>
    </div> */}

<h4 className="text-sm tracking-[0.2em] uppercase text-black dark:text-cyan-300">
  Quick Stats
</h4>

<div className="mt-4 grid grid-cols-2 gap-4">
  <div className="p-3 rounded-md text-center border border-cyan-300/30 bg-cyan-500/10 dark:bg-cyan-500/5">
    <div className="text-2xl font-semibold text-black dark:text-cyan-200">3+</div>
    <div className="text-xs mt-1 text-black/80 dark:text-cyan-100/80">
      Production projects
    </div>
  </div>

  <div className="p-3 rounded-md text-center border border-cyan-300/30 bg-cyan-500/10 dark:bg-cyan-500/5">
    <div className="text-2xl font-semibold text-black dark:text-cyan-200">5+</div>
    <div className="text-xs mt-1 text-black/80 dark:text-cyan-100/80">
      Research & prototypes
    </div>
  </div>
</div>




  </div>
</div>




      </div>
    </section>
  );
}



