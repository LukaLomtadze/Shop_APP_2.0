import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logotransparent.png';
import { BsCart, BsCurrencyDollar } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa';
import { MdEuroSymbol } from "react-icons/md";
import { FaLariSign } from "react-icons/fa6";
import DropDown from './DropDown';
import { FaAngleUp } from "react-icons/fa";

import { useRef, useEffect } from 'react';
import { useCartStore } from '../statemanagment/cartStore';
import CartDropDown from './CartDropDown';


const Navbar = ({bgBlurr}) => {

  const[icon, setIcon] = useState(<BsCurrencyDollar />)

  const[cartDrop, setCartDrop] = useState(false);

  //const[currentCur, setCurrentCur] = useState(localStorage.getItem("curreny"));


  const cartCount = useCartStore((state) => state.cartCount);

  const toggleVisibility = () => {
    setCartDrop(!cartDrop)
  }

  useEffect(() => {
    const StoredCurrency = localStorage.getItem("currency");
    if(StoredCurrency === "USD") setIcon(<BsCurrencyDollar/>)
    else if(StoredCurrency === "EUR") setIcon(<MdEuroSymbol/>)
    else if(StoredCurrency === "GEL") setIcon(<FaLariSign/>)
  },[])

  const[drop, setDrop] = useState(false)

  const dropDown = () => {
    setDrop(!drop)
  }


  const dropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDrop(false);
      }
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target)
      ) {
        setCartDrop(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  


  const navLinkClasses = ({ isActive }) =>
    `relative pb-5 uppercase font-[Raleway] text-[16px] transition-colors duration-200 
     after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full 
     after:bg-[#5ECE7B] after:transition-transform after:duration-300 
     ${isActive ? 'after:scale-x-100 text-[#5ECE7B]' : 'after:scale-x-0'} after:origin-left`;

  return (
    <nav className='w-full px-3 py-5 h-[70px] flex justify-between items-center'>

      <ul className='flex gap-[30px] list-none'>
        <li>
          <NavLink to="/women" className={navLinkClasses} category={"Women"}>Women</NavLink>
        </li>
        <li>
          <NavLink to="/men" className={navLinkClasses} category={"Men"}>Men</NavLink>
        </li>
        <li>
          <NavLink to="/kids" className={navLinkClasses} category={"Kids"}>Kids</NavLink>
        </li>
      </ul>




    <NavLink to={"/"}>
      <img src={Logo} className='w-[31px] h-[30px] cursor-pointer' />
    </NavLink>
      <div className='flex items-center gap-6'>
        <div ref={dropdownRef} className='flex items-center cursor-pointer' onClick={() => dropDown()}>
          {icon}
            { 
              drop == true? <FaAngleUp onClick={dropDown} /> : <FaAngleDown onClick={dropDown}></FaAngleDown>
            }

          <DropDown visible={drop} setIcon={setIcon} setDrop={setDrop} />
        </div>
        <div className={`absolute top-4 right-[65px] text-[13px] bg-gray-800 rounded-full w-5 h-5 font-normal text-white flex justify-center items-center ${cartCount <= 0 ? "opacity-0" : "opacity-100"}`}>{cartCount}</div>


        <BsCart className='cursor-pointer' onClick={() => toggleVisibility()} />
          {
            cartDrop && <CartDropDown ref={cartDropdownRef} />
          }
      </div>
    </nav>
  );
};

export default Navbar;
