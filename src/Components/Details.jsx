import { useCartLogicStore } from '@/statemanagment/cartStore';
import React, { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';

const Details = () => {

    const provincesUSA = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
        "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
        "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
        "New Hampshire", "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
        "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
        "West Virginia", "Wisconsin", "Wyoming","Alberta", "British Columbia", "Manitoba", "New Brunswick", 
  "Newfoundland and Labrador", "Nova Scotia", "Ontario", 
  "Prince Edward Island", "Quebec", "Saskatchewan", 
  "Northwest Territories", "Nunavut", "Yukon","Alberta", "British Columbia", "Manitoba", "New Brunswick", 
  "Newfoundland and Labrador", "Nova Scotia", "Ontario", 
  "Prince Edward Island", "Quebec", "Saskatchewan", 
  "Northwest Territories", "Nunavut", "Yukon"
    ];

    const romaniaCounties = [
        "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița‑Năsăud",
        "Botoșani", "Brăila", "Brașov", "București", "Buzău", "Călărași",
        "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați",
        "Giurgiu", "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași",
        "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț", "Olt",
        "Prahova", "Sălaj", "Satu Mare", "Sibiu", "Suceava", "Teleorman",
        "Timiș", "Tulcea", "Vâlcea", "Vaslui", "Vrancea"
    ];

    const cartItems = useCartLogicStore((state) => state.cartItems);

    const [total, setTotal] = useState(() => {
        let tot = 0;
        cartItems.forEach(item => {
            tot += item.price;
        })

        return tot.toFixed(2);
    })

    console.log(cartItems)
      
  return (
    <div className='mt-[90px] font-[Raleway] mx-[50px] w-full h-full' id='container'>
        <div className='flex flex-col justify-between lg:flex-row md:flex-row'>
        <div>
        <div className='w-full mb-[60px] flex flex-row items-center gap-3 text-[18px]'>
            <span className='text-[#56B280] font-semibold'>Cart</span>
            <IoIosArrowForward />
            <span className='font-semibold'>Details</span>
            <IoIosArrowForward />
            <span>Shipping</span>
            <IoIosArrowForward />
            <span>Payment</span>
        </div>

        <div className=' flex flex-col gap-3 justify-center'>
            <span className='font-[Roboto] text-[20px]'>Contact</span>
            <input type="text" placeholder='Email or mobile phone number' className='md:max-w-[445px] lg:max-w-[445px] sm:max-w-full h-[40px] border-1 border-[#56B280] p-4' />
        </div>

        <div className='flex flex-col justify-center mt-10'>
            <span className='font-[Roboto] text-[20px]'>Shipping Address</span>
            <div className='md:max-w-[445px] lg:max-w-[445px] sm:max-w-full grid grid-cols-2 gap-3'>
                <input placeholder='Name' className='h-[40px] w-full border-1 p-4 border-gray-800' />
                <input placeholder='Second Name' className='h-[40px] w-full border-1 p-4 border-gray-800'/>
            </div>
            <div className='md:max-w-[445px] lg:max-w-[445px] md:flex-col lg:flex-col sm:max-w-full flex flex-row justify-center gap-3 mt-3'>
                <input placeholder='Address and number' className='w-[445px] border-1 border-gray-800 p-4 h-[40px]' />
                <input placeholder='Shipping note (optional)' className='w-[445px] border-1 border-gray-800 p-4 h-[40px]'/>
            </div>
            <div className='md:max-w-[445px] lg:max-w-[445px] sm:max-w-full grid grid-cols-3  max-w-full gap-3 mt-3'>
                <input type='text' placeholder='City' className='border-1 border-gray-800 p-4 h-[40px]' />
                <input type='text' placeholder='Postal Code' className='border-1 border-gray-800 p-4 h-[40px]' />
                <div className="relative w-full">
                    <p className='absolute ml-2.5 text-[10px]'>Province</p>
                    <select className="border border-gray-800 p-2 h-[40px] bg-white outline-none appearance-none rounded-none w-full pr-8">
                        {provincesUSA.map((item, index) => (
                        <option key={index}>{item}</option>
                    ))}
                    </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                        <IoIosArrowForward className="rotate-90" />
                    </div>
                </div>
            </div>

            <div className="relative mt-3 md:max-w-[445px] lg:max-w-[445px] sm:max-w-full ">
                    <p className='absolute ml-2.5 text-[10px]'>County/Region</p>
                    <select className="border border-gray-800 p-2 h-[40px] bg-white outline-none appearance-none rounded-none w-full pr-8">
                        {romaniaCounties.map((item, index) => (
                        <option key={index}>{item}</option>
                    ))}
                    </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                        <IoIosArrowForward className="rotate-90" />
                    </div>
            </div>
            <div className='flex flex-row items-center gap-3 mt-1'>
                <input type='checkbox' className='w-4 h-4 border-2 border-gray-300 rounded-none ' />
                <span>Save this inforamtion for the future transactions</span>
            </div>

        </div>
        </div>
        <div>
        <div className='flex flex-row gap-3 mr-[80px] border-b-1 border-[#56B28033] h-[136px]'>
            <div className='w-[516px] h-[136px] flex flex-row gap-[70px]'>
                <div className='h-[130px] w-[160px] bg-[#F7F8FA] flex items-center justify-center'>
                    <img src={cartItems[0].image} className='w-[113px] h-[103px]' />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='flex flex-row items-center text-3xl font-[Raleway]'>{cartItems[0].use}{cartItems.length > 1 ? ` + ${cartItems.length - 1} more` : ``}</span>

                    <span className='text-[#56B280] font-semibold font-[Roboto] text-2xl items-center flex flex-row'>${cartItems[0].price}</span>
                </div>
            </div>
        </div>
            <div className='grid font-[Roboto] text-[14px] border-b-1 border-[#56B28033] mt-2 grid-cols-2 w-[516px] p-5 gap-4'>
                <span>Subtotal</span>
                <span className='text-right font-[Roboto]'>${cartItems[0].price}</span>
                <span>Shipping</span>
                <span className='text-right font-[Roboto]'>Calcualted at next step</span>
                <div className='mb-3'></div>
            </div>
            <div className='font-[Roboto] grid grid-cols-2 w-[516px] font-[14px] mt-3 p-5'>
                <span>Total of {cartItems.length} item(s)</span>
                <span className='text-right'>${total}</span>
            </div>
        </div>
        </div>

        <div className='flex flex-row items-center font-[Roboto] mt-10 gap-[105px]'>
            <NavLink to={"/insideCart"}>
                <button type='submit' className='bg-none text-[20px] underline text-[#56B280] cursor-pointer hover:text-[#74e8a8]'>Back To Cart</button>
            </NavLink>
            <NavLink to={"/shipping"}>
                <button className='bg-[#56B280] cursor-pointer rounded-[4px] text-white w-[228px] text-[20px] h-10'>Go To Shipping</button>
            </NavLink>
        </div>
    </div>
  )
}

export default Details