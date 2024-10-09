import Link from "next/link";
import HandCraftLogo from "./Logo";

export default function NavBar (){
    return (
        <>
            

<nav className="bg-main-1 shadow-lg">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <HandCraftLogo/>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

      <button 
        type="button" 
        className="font-text text-main-2 bg-secondary-2 shadow-lg hover:bg-main-2 hover:text-secondary-2 hover:shadow-lg font-medium rounded-md text-sm px-4 py-2 text-center">
        Login
      </button>

      <button 
      id="hamburguer-main-menu"
      data-collapse-toggle="navbar-sticky" 
      type="button" 
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-md md:hidden hover:shadow-lg text-main-2 hover:bg-secondary-2 " aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>

  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-md">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-secondary-2 rounded-lg bg-main-1 text-secondary-2 md:text-main-2 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-2 md:border-0 md:bg-transparent">
      <li className="bg-accent-1 md:bg-main-1">
        <a href="#" className="font-text block py-2 px-3 rounded md:p-0" aria-current="page">Home</a>
      </li>
      <li className="bg-accent-1 md:bg-main-1">
        <a href="#" className="font-text block py-2 px-3 rounded md:p-0" aria-current="page">Artists</a>
      </li>
      <li className="bg-accent-1 md:bg-main-1">
        <a href="#" className="font-text block py-2 px-3 rounded md:p-0" aria-current="page">Shop</a>
      </li>
      <li className="bg-accent-1 md:bg-main-1">
        <a href="#" className="font-text block py-2 px-3 rounded md:p-0" aria-current="page">Events</a>
      </li>
      <li>
        <a href="#" className="font-text block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About Us</a>
      </li>
    </ul>
  </div>
  </div>
</nav>

        </>
    )
}