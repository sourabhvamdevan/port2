

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface Props {
  dark: boolean;
  setDark: (v: boolean) => void;
}

export default function Navbar({ dark, setDark }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-30 backdrop-blur-md bg-gradient-to-r from-transparent to-transparent/30">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className=" w-10 h-10 rounded-xl
      bg-gradient-to-br from-indigo-500 to-teal-500
      flex items-center justify-center
      text-white font-semibold
      shadow-sm">
            SV
          </div>
          <div>
            <h1 className="text-lg font-semibold">Sourabh Vamdevan</h1>
            <p className="text-xs -mt-1">Aspiring Software Engineer</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink
  to="/"
  className={({ isActive }) =>
    `
      relative px-1 font-medium
      ${isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"}
      group
    `
  }
>
  {({ isActive }) => (
    <>
      Home
      <span
        className={`
          absolute left-0 -bottom-1 h-[2px] w-full
          bg-primary
          transform origin-left
          transition-transform duration-300
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </>
  )}
</NavLink>

           <NavLink
  to="/about"
  className={({ isActive }) =>
    `
      relative px-1 font-medium
      ${isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"}
      group
    `
  }
>
  {({ isActive }) => (
    <>
      About
      <span
        className={`
          absolute left-0 -bottom-1 h-[2px] w-full
          bg-primary
          transform origin-left
          transition-transform duration-300
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </>
  )}
</NavLink>
          <NavLink
  to="/certifications"
  className={({ isActive }) =>
    `
      relative px-1 font-medium
      ${isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"}
      group
    `
  }
>
  {({ isActive }) => (
    <>
      Certifications
      <span
        className={`
          absolute left-0 -bottom-1 h-[2px] w-full
          bg-primary
          transform origin-left
          transition-transform duration-300
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </>
  )}
</NavLink>

           <NavLink
  to="/projects"
  className={({ isActive }) =>
    `
      relative px-1 font-medium
      ${isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"}
      group
    `
  }
>
  {({ isActive }) => (
    <>
      Projects
      <span
        className={`
          absolute left-0 -bottom-1 h-[2px] w-full
          bg-primary
          transform origin-left
          transition-transform duration-300
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </>
  )}
</NavLink>


           <NavLink
  to="/achievements"
  className={({ isActive }) =>
    `
      relative px-1 font-medium
      ${isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"}
      group
    `
  }
>
  {({ isActive }) => (
    <>
      Achievements
      <span
        className={`
          absolute left-0 -bottom-1 h-[2px] w-full
          bg-primary
          transform origin-left
          transition-transform duration-300
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </>
  )}
</NavLink>
        <NavLink
  to="/experience"
  className={({ isActive }) =>
    `
      relative px-1 font-medium
      ${isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"}
      group
    `
  }
>
  {({ isActive }) => (
    <>
      Experience
      <span
        className={`
          absolute left-0 -bottom-1 h-[2px] w-full
          bg-primary
          transform origin-left
          transition-transform duration-300
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </>
  )}
</NavLink>







          <NavLink
  to="/contact"
  className={({ isActive }) =>
    `
      relative px-1 font-medium
      ${isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"}
      group
    `
  }
>
  {({ isActive }) => (
    <>
      Contact
      <span
        className={`
          absolute left-0 -bottom-1 h-[2px] w-full
          bg-primary
          transform origin-left
          transition-transform duration-300
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </>
  )}
</NavLink>

          <ThemeToggle dark={dark} setDark={setDark} />
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle dark={dark} setDark={setDark} />
          <button
            aria-label="toggle menu"
            onClick={() => setOpen(v => !v)}
            className="p-2 rounded-lg hover:bg-slate-200/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-current">
              <path d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

     {open && (
  <div className="md:hidden bg-black/30 backdrop-blur-sm">
    <div className="flex flex-col gap-2 px-6 py-4 max-w-5xl mx-auto">
      {[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Certifications", path: "/certifications" },
        { name: "Projects", path: "/projects" },
        { name: "Achievements", path: "/achievements" },
        { name: "Experience", path: "/experience" },
        { name: "Contact", path: "/contact" },
      ].map(link => (
        <NavLink
          key={link.name}
          to={link.path}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `
              py-2 text-sm font-medium
              ${isActive ? "text-primary" : "text-gray-200"}
            `
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  </div>
)}

    </header>
  );
}

