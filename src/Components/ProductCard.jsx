import React, { useEffect, useState } from 'react'
import { data as datas } from './data.js'
import { BsCart } from 'react-icons/bs';
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdEuroSymbol } from "react-icons/md";
import { FaLariSign } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const ProductCard = ({category}) => {

    const[data] = useState(datas)

    const[icon, setIcon] = useState(<BsCurrencyDollar />);

    const [storedCR, setStoredCR] = useState(localStorage.getItem("currency"));


    useEffect(() => {
        const updateIcon = () => {
            const StoredCurrency = localStorage.getItem("currency");
            setStoredCR(StoredCurrency)
            if(StoredCurrency === "USD") setIcon(<BsCurrencyDollar />)
            else if(StoredCurrency === "EUR") setIcon(<MdEuroSymbol />)
            else if(StoredCurrency === "GEL") setIcon(<FaLariSign />)
        }

        updateIcon();


        window.addEventListener("currencyChange", updateIcon)

        return () => {
            window.removeEventListener('currencyChange', updateIcon)
        }
    }, [])

  return (
    <>
        <h1 className='uppercase font-[Raleway] text-[42px]'>{category}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[80px] py-[16px] px-2 '>
            {
                data.map((prod) => {
                    if(prod.category === category){

                        let convertedPrice = prod.price

                        if(storedCR =="EUR"){
                            convertedPrice = (prod.price * 0.86).toFixed(2)
                        }
                        if(storedCR =="GEL"){
                            convertedPrice = (prod.price * 2.70).toFixed(2)
                        }
                    
                        return(
                            <div id={prod.id} className='group relative flex flex-col gap-1 font-[Raleway] hover:shadow-2xl hover:cursor-pointer hover:bg-[#f1f1f17e] hover:transition-all duration-300 ease-in-out p-5 my-10'>
                                <img src={prod.image} />
                                <span>{prod.name}</span>
                                <NavLink  to={`/${prod.category}/${prod.id}/${prod.name}`}>
                                    <div className={`opacity-0 absolute bottom-12 right-10                group-hover:opacity-100 duration-300 w-[52px] h-[52px] flex justify-center items-center bg-[#5ECE7B] transition-all  hover:bg-[#6be18b] rounded-full text-2xl  font-extrabold`}>
                                            <BsCart className='text-white' />
                                    </div> 
                                </NavLink>
                                <span className='flex flex-row items-center'>{icon}{convertedPrice}</span>
                            </div> 
                        )
                    }
                })
            }
        </div>
    </>
  )
}

export default ProductCard