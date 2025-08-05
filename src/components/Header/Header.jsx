import React from 'react'
import { Link } from 'react-router'
import "./Header.css"

export default function Header() {
    return (
        <>
            <div className='flex justify-center w-full bg-[var(--color-secondary-dark)] border-t-8 border-t-[var(--color-primary)] shadow-2xl'>
                <div className='container flex items-center sm:justify-center md:justify-between'>
                    <div className='block md:hidden p-[1.1rem]'>|||</div>
                    <nav className="hidden font-bold text-gray-400 header__nav md:block">
                        <ul className="flex items-center gap-8 topNav__list">
                            <li className="topNav__list__item active"><Link to="/">Home</Link></li>
                            <li className="topNav__list__item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="topNav__list__item"><Link to="/">About</Link></li>
                            <li className="topNav__list__item"><Link to="/">Contact Us</Link></li>
                        </ul>
                    </nav>
                    <div className="text-2xl font-extrabold tracking-[15px] text-[var(--color-primary)] logo hidden md:block">Skill Timeline</div>
                </div>
            </div>
        </>
    )
}
