import { useCartLogicStore } from '@/statemanagment/cartStore'
import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdEuroSymbol } from "react-icons/md";
import { FaLariSign } from "react-icons/fa6";

const Bag = () => {
    const cartItems = useCartLogicStore((state) => state.cartItems);
    const removeFromCart = useCartLogicStore((state) => state.removeFromCart)

    const [quantities, setQuantities] = useState(() => {
        const saved = localStorage.getItem("quantities");
        if (saved) return JSON.parse(saved);
        return Object.fromEntries(cartItems.map((item) => [item.id, 1]));
      });

      useEffect(() => {
        localStorage.setItem("quantities", JSON.stringify(quantities));
      }, [quantities]);
      
    
    const increment = (id) => {
        setQuantities((prev) => ({
          ...prev,
          [id]: prev[id] + 1,
        }));
    };
    
    const decrement = (id) => {
        setQuantities((prev) => ({
          ...prev,
          [id]: prev[id] > 0 ? prev[id] - 1 : 0,
        }));
    };

    
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * (quantities[item.id] || 0),
        0
    );

    const [icon, setIcon] = useState(<BsCurrencyDollar />)

    let storedCR = localStorage.getItem("currency");

    const changeCurrency = (id) => {
        let price = id.price;
        if(storedCR === "EUR") price *= 0.86;
        else if(storedCR === "GEL") price *= 2.70;
        return price.toFixed(2)
    }

    const getTotalChange = () => {
        let tot = total;
        if(storedCR === "EUR") tot *= 0.86;
        else if(storedCR === "GEL") tot *= 2.70;
        return tot.toFixed(2);
    }

    useEffect(() => {
        const updateIcon = () => {
            let currentCurrency = localStorage.getItem('currency');
            if(currentCurrency === "USD") setIcon(<BsCurrencyDollar />)
            else if(currentCurrency === "EUR") setIcon(<MdEuroSymbol />)
            else if(currentCurrency === "GEL") setIcon(<FaLariSign />)
        }

        updateIcon()

        window.addEventListener("currencyChange", updateIcon)

        return () => {
            window.removeEventListener("currencyChange", updateIcon);
        }
    }, [])


    useEffect(() => {
        setQuantities(prev => {
            const updated = {...prev};
            cartItems.forEach(item => {
                if(!(item.id in updated)){
                    updated[item.id] = 1;
                }

            })
            return updated
        })
    }, [cartItems])

  return (
    <div className='mt-9 ml-3 w-full '>
        <div className='mb-9'><span className='font-[Raleway] text-[32px] uppercase text-[#1D1F22]'>Cart</span></div>
            
            {   
                cartItems.length == 0 ? (<>
                    <div className='font-[Raleway] flex-col flex w-[100vw] h-[100vh] items-center  mt-10'>
                        <span className='text-[40px]'>No Items in the cart :( </span>
                        <NavLink to={"/women"} className={"mt-5"}>
                            <span className='mt-10 font-semibold text-3xl uppercase underline hover:text-gray-600 '>Go To Shop</span>
                        </NavLink>
                    </div>
                </>
                ) 

                :

                cartItems.map((prod) => {
                    return(
                        <div className='border-t-1 border-b-1 border-[#E5E5E5] pt-5 pb-5 flex flex-row justify-between w-full font-[Raleway] gap-1' key={prod.id}>
                            <div className='flex flex-col'>
                                <span className='text-3xl font-semibold'>{prod.name}</span>
                                <span className='text-3xl'>{prod.use}</span>
                                <span className='text-2xl flex flex-row items-center'>{icon}{changeCurrency(prod)}</span>

                                <span className='mt-3 font-bold uppercase'>Size:</span>
                                <div className='flex flex-row gap-3'>
                                    <button className='w-[63px] h-[45px] cursor-pointer border-1 border-gray-800'>XS</button>
                                    <button className='w-[63px] h-[45px] cursor-pointer border-1 border-gray-800'>S</button>
                                    <button className='w-[63px] h-[45px] cursor-pointer border-1 border-gray-800'>M</button>
                                    <button className='w-[63px] h-[45px] cursor-pointer border-1 border-gray-800'>L</button>
                                </div>
                            </div>

                            <div className='flex flex-row gap-5' key={prod.id}>
                                <div className='h-[288px] flex flex-col justify-between items-center '>
                                    <button className='w-[45px] h-[45px] text-3xl border-1 border-gray-800 cursor-pointer' onClick={() => increment(prod.id)}>+</button>
                                        <span>{quantities[prod.id]}</span>
                                    <button className='w-[45px] h-[45px] text-3xl border-1 border-gray-800 cursor-pointer' onClick={() => {
                                        if(quantities[prod.id] == 1){
                                            removeFromCart(prod.id)
                                        }
                                        else{
                                            decrement(prod.id)
                                        }
                                    }}>-</button>
                                </div>
                                <div>
                                    <img src={prod.image} className='h-[288px] w-[220px]' alt='image' />
                                </div>
                            </div>
                        </div>
                    )
                }
                )
            }   

            <div className='mt-10 mb-10 flex flex-col gap-3'>
                <span className='font-[raleway] text-2xl flex flex-row items-center'>Total: {icon} {getTotalChange()}</span>
                <button className='w-[279px] h-[43px] bg-[#5ECE7B] text-white cursor-pointer'>Continue</button>
            </div>     
    </div>    
  )
}

export default Bag