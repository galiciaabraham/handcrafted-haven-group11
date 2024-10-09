'use client';

import React from "react";

export default function ToggleNav( { isOpen  , onToggle } : {
  isOpen : boolean;
  onToggle : any
}) {

  return (
    <button 
      id="hamburguer-main-menu"
      data-collapse-toggle="navbar-sticky"
      type="button"
      onClick={onToggle}
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-md md:hidden hover:shadow-lg text-main-2 hover:bg-secondary-2"
      aria-controls="navbar-sticky"
      aria-expanded={isOpen}
    >
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
  );
}
