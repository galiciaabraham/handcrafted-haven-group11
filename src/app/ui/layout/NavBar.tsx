'use client';

import HandCraftLogo from "./Logo";
import  ToggleNav  from "../../utilities/toggle-nav";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LoginButton from "./login-button";




export default function NavBar (){
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  const handleHamburguer = () => { //This function changes the state isOpen when the ToggleNav which is a button is clicked.
    setOpen(!isOpen);  //In line 30, a ternary operator toggles the hidden and flex class atributes based on the state isOpen
  }



  return (
    <>
    <nav className="bg-main-1 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <HandCraftLogo/>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          <Link 
            href="/login"
            className="font-text text-main-2 bg-secondary-2 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-sm px-4 py-2 text-center"
            onClick={() => {setTimeout(() => {setOpen(!isOpen)}, 500)}}>
            Login
    
          </Link>
          <ToggleNav isOpen={isOpen} onToggle={handleHamburguer}/>
      </div>
      <div className={`items-center justify-between ${isOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1"`}>
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  md:text-main-2 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-2 md:border-0 w-full text-center">
          <li className=  {`${pathname === "/" ? "active text-main-2 bg-main-1 hover:bg-main-2 hover:text-secondary-2 md:bg-main-2 md:text-secondary-2 md:hover:bg-main-1 md:hover:text-main-2"  : "md:text-main-2 bg-main-2 text-secondary-2 hover:bg-main-1 hover:text-main-2 md:bg-main-1 md:shadow-none md:hover:bg-main-2 md:hover:text-secondary-2 "} p-2 m-2 rounded-md shadow-md `}>
            <Link href="/" className={`font-text block py-2 px-3 rounded md:p-0 `}  aria-current="page" onClick={() => {setTimeout(() => {setOpen(!isOpen)}, 500)}} >Home</Link>
          </li>

          <li className= {`${pathname === "/feed" ? "active text-main-2 bg-main-1 hover:bg-main-2 hover:text-secondary-2 md:bg-main-2 md:text-secondary-2 md:hover:bg-main-1 md:hover:text-main-2"  : "md:text-main-2 bg-main-2 text-secondary-2 hover:bg-main-1 hover:text-main-2 md:bg-main-1 md:shadow-none md:hover:bg-main-2 md:hover:text-secondary-2 "} p-2 m-2 rounded-md shadow-md `}>
            <Link href="/feed" className={`font-text block py-2 px-3 rounded md:p-0 `} aria-current="page" onClick={() => {setTimeout(() => {setOpen(!isOpen)}, 500)}}>Artists</Link>
          </li>

          <li className= {`${pathname === "/shop" ? "active text-main-2 bg-main-1 hover:bg-main-2 hover:text-secondary-2 md:bg-main-2 md:text-secondary-2 md:hover:bg-main-1 md:hover:text-main-2"  : " md:text-main-2 bg-main-2 text-secondary-2 hover:bg-main-1 hover:text-main-2 md:bg-main-1 md:shadow-none md:hover:bg-main-2 md:hover:text-secondary-2 "} p-2 m-2 rounded-md shadow-md `}>
            <Link href="/shop" className={`font-text block py-2 px-3 rounded md:p-0 `} aria-current="page" onClick={() => {setTimeout(() => {setOpen(!isOpen)}, 500)}}>Shop</Link>
          </li>

          <li className= {`${pathname === "/about-us" ? "active text-main-2 bg-main-1 hover:bg-main-2 hover:text-secondary-2 md:bg-main-2 md:text-secondary-2 md:hover:bg-main-1 md:hover:text-main-2"  : "md:text-main-2 bg-main-2 text-secondary-2 hover:bg-main-1 hover:text-main-2 md:bg-main-1 md:shadow-none md:hover:bg-main-2 md:hover:text-secondary-2 "} p-2 m-2 rounded-md shadow-md `}>
            <Link href="#" className={`font-text block py-2 px-3 rounded md:p-0 `} aria-current="page" onClick={() => {setTimeout(() => {setOpen(!isOpen)}, 500)}}>About Us</Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
    </>
    )
}