import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdEuroSymbol } from "react-icons/md";
import { FaLariSign } from "react-icons/fa6";

const DropDown = ({ visible, setIcon, setDrop }) => {
  return (
    <div className={`
      absolute top-[60px] flex flex-col justify-center items-start w-[100px]
        text-center z-50  shadow-lg h-[124px] right-[70px]
      transform transition-all duration-300 ease-in-out
      ${visible ? 'opacity-100 scale-100 translate-y-2' : 'opacity-0 scale-90 translate-y-0 pointer-events-none'}
    `}>
      <ul className="list-none flex flex-col gap-2 w-full text-center">
        <li
          className="flex items-center gap-2 text-center px-3 cursor-pointer hover:bg-gray-200 h-9 w-[100px]"
          onClick={() => { localStorage.setItem("currency", "USD");window.dispatchEvent(new Event("currencyChange")); setIcon(<BsCurrencyDollar />); setDrop(false);}}
          
        >
          <BsCurrencyDollar size={18} /> <span>USD</span>
        </li>
        <li
          className="flex items-center gap-2 text-center  px-3 cursor-pointer hover:bg-gray-200 h-9 w-[100px]"
          onClick={() => { localStorage.setItem("currency", "EUR");window.dispatchEvent(new Event("currencyChange")); setIcon(<MdEuroSymbol />); setDrop(false);}}
        >
          <MdEuroSymbol size={18} /> <span>EUR</span>
        </li>
        <li
          className="flex items-center gap-2 text-center  px-3 cursor-pointer hover:bg-gray-200 h-9 w-[100px]"
          onClick={() => { localStorage.setItem("currency", "GEL");window.dispatchEvent(new Event("currencyChange")); setIcon(<FaLariSign />); setDrop(false); }}
        >
          <FaLariSign size={18} /> <span>GEL</span>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
