import React from "react";
import { Link } from "react-router";
import "./Header.css";

export default function Header() {
  const mobileToggler = () => {
    const topNav = document.querySelector(".header__nav");
    const topNavUl = document.querySelector(".topNav__list");
    topNav.classList.toggle("hidden");
  };
  return (
    <>
      <div className="flex justify-center w-full bg-[var(--color-secondary-dark)] border-t-8 border-t-[var(--color-primary)] shadow-2xl">
        <div className="container flex items-center w-full sm:justify-center md:justify-between min-h-15">
          <div
            className="absolute block p-5 md:hidden top-1 left-1"
            onClick={mobileToggler}
          >
            |||
          </div>
          <nav className="items-center hidden w-full font-bold text-gray-400 transition-all header__nav md:block transition-2">
            <ul className="flex flex-col items-center gap-8 md:flex-row topNav__list">
              <li className="topNav__list__item active">
                <Link to="/">Home</Link>
              </li>
              <li className="topNav__list__item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="topNav__list__item">
                <Link to="/about">About</Link>
              </li>
              <li className="topNav__list__item">
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </nav>
          <div className="text-2xl font-extrabold tracking-[15px] text-[var(--color-primary)] logo hidden md:block">
            Skill Timeline
          </div>
        </div>
      </div>
    </>
  );
}
