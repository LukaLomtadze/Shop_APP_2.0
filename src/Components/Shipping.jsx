import { useCartLogicStore } from '@/statemanagment/cartStore'
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const Shipping = () => {

  const data = JSON.parse(localStorage.getItem("details"))
  const [shippingMethod, setShippingMethod] = useState("standard")
  const cartItems = useCartLogicStore((state) => state.cartItems);

  useEffect(() => {
    localStorage.setItem("shipping", shippingMethod)
    
  }, [shippingMethod])

  const[icon, setIcon] = useState("$");

  useEffect(() => {
    const updateIcon = () => {
      let currentIcon = localStorage.getItem("currency");
      if(currentIcon === "USD") setIcon("$")
      else if(currentIcon === "EUR") setIcon("€")
      else if(currentIcon === "GEL") setIcon("₾")
    }
    updateIcon()

    window.addEventListener("currencyChange", updateIcon);

    return () => {
      window.removeEventListener("currencyChange", updateIcon)
    }
  }, [])

  let currentCur = localStorage.getItem("currency")
  
  const[pricee] = useState(() => {
    let price = Number(4.99)
    if(currentCur === "GEL") price *= 2.7;
    else if(currentCur === "EUR") price *= 0.86

    return Number(price.toFixed(2))
  })

  localStorage.setItem("shipPrice", pricee)

  let ShipPrice = localStorage.getItem("shipping");

  const totalConvert = (() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price;
    });
  
    if (currentCur === "GEL") total *= 2.7;
    else if (currentCur === "EUR") total *= 0.86;
  
    if (shippingMethod === "express") {
      total += pricee;
    }
  
    return Number(total.toFixed(2));
  })();

  const convert = (item) => {
    let pr = item.price
    if(currentCur === "GEL") pr *= 2.7;
    else if(currentCur === "EUR")  pr *= 0.86

    return Number(pr).toFixed(2)
  }

  return (
    <div className='flex sm:flex-col md:flex-row lg:flex-row sm:max-w-full p-0 m-0 box-border'>
      <div className='w-[50vw] h-[100vh p-[4rem]'>
         <div className='w-full mb-[60px] mt-[26px] font-[Raleway] mx-[50px] flex flex-row items-center gap-3 text-[18px]'>
            <span className='text-[#56B280] font-semibold'><NavLink to={"/insideCart"}>Cart</NavLink></span>
            <IoIosArrowForward />
            <span className='font-semibold text-[#56B280]'><NavLink to={"/details"}>Details</NavLink></span>
            <IoIosArrowForward />
            <span>Shipping</span>
            <IoIosArrowForward />
            <span>Payment</span>
          </div>

        <div className='w-[445px] mx-[50px] p-5 h-[117px] rounded-[7px] border-1 border-[#56B28033]'>
          <div className='text-[14px] font-[Roboto] flex flex-row'>
            <div className='mr-4'><span className='text-[#818181]'>Contact</span></div>
            <div><span className=''>{data.email}</span></div>
          </div>
          <div className='w-[410px] mt-3 mb-3 h-px bg-[#56B28033] '></div>
            <div className='flex mt-5 flex-row items-center font-[Roboto] text-[14px]'>
              <div className='mr-6 '>
                <span className='text-[#818181]'>Ship to</span>
            </div>
            <div>
              <span>{data.address}, {data.pcode}, {data.city}, {data.county}</span>
            </div>
            </div>
        </div>

        <div className='mx-[50px] mt-[50px]'>
          <span className='font-[Roboto] text-2xl'>Shipping Method</span>
          <div className='flex flex-row w-[445px] mt-5 h-[58px] border-1 border-[#E5E5E5] rounded-[7px] items-center px-5 justify-between'>
            <div className='flex flex-row items-center gap-3'>
              <input 
                type='radio' 
                id='standard'
                name='shipping'
                value={"standard"}
                checked={shippingMethod === "standard"}
                onChange={() => {setShippingMethod("standard")}}
              />
              <label htmlFor='standard'>Standard Shipping</label>
            </div>
            <div>
              <span className='font-semibold'>
                Free
              </span>
            </div>
          </div>

          <div className='flex flex-row w-[445px] mt-5 h-[58px] border-1 border-[#E5E5E5] rounded-[7px] items-center px-5 justify-between'>
            <div className='flex flex-row items-center gap-3'>
              <input 
                type='radio'
                id='express'
                name='shipping'
                value={"express"}
                checked={shippingMethod === "express"}
                onChange={() => {setShippingMethod("express")}}
              />
              <label htmlFor='express'>Express Shipping</label>
            </div>
            <div>
              <span className='font-semibold'>
                {icon}{pricee}
              </span>
            </div>
          </div>
        </div>

        <div className='mt-[100px] justify-between flex flex-row items-center w-[445px] mx-[50px]'>
          <NavLink to={"/details"}>
            <button className='font-[Roboto] text-[#56B280] text-[20px] cursor-pointer hover:text-[#6ad99c] underline'>Back To Details</button>
          </NavLink>
          <NavLink to={"/payment"}>
            <button className='w-[223px] h-[40px] cursor-pointer rounded-[7px] bg-[#56B280] hover:bg-[#71cb99] text-white text-[20px]'>Continue</button>
          </NavLink>
        </div>
      </div>
      <div className='w-[50vw] bg-[#F2F2F2] h-[100vh]'>

      <div className='flex flex-col mt-[6rem] ml-[6rem] gap-3w-[512px] mr-[80px] sm:max-w-full lg:max-w-[512px] md:max-w-[512px] border-b-1 border-[#56B28033] h-[100vh]'>
            <div className='w-[516px] h-[136px] flex flex-row gap-[70px]'>
                <div className='h-[130px] w-[160px] bg-[#F7F8FA] flex items-center justify-center'>
                    <img src={cartItems[0].image} className='w-[113px] h-[103px]' />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='flex flex-row items-center text-3xl font-[Raleway]'>{cartItems[0].use}{cartItems.length > 1 ? ` + ${cartItems.length - 1} more` : ``}</span>
                    <span className='text-[#56B280] font-semibold font-[Roboto] text-2xl items-center flex flex-row'>{icon}{convert(cartItems[0])}</span>
                </div>
            </div>
            <div className='grid font-[Roboto] sm:max-w-full lg:max-w-[516px] md:max-w-[516px] text-[14px] border-b-1 border-[#56B28033] mt-2 grid-cols-2  p-5 gap-4'>
                <span>Subtotal</span>
                <span className='text-right font-[Roboto]'>{icon}{totalConvert.toFixed(2)}</span>
                <span>Shipping</span>
                <span className='text-right font-[Roboto]'>{ShipPrice === "express" ? `${icon}${pricee}` : "Free"}</span>
                <div className='mb-3'></div>
            </div>
            <div className='font-[Roboto] grid grid-cols-2 w-[516px] font-[14px] mt-3 p-5'>
                <span>Total of {cartItems.length} item(s) + Shipping</span>
                <span className='text-right'>{icon}{totalConvert.toFixed(2)}</span>
            </div>
        </div>
        </div>
            
      </div>
  )
}

export default Shipping