import React, { useEffect, useState } from 'react'
import {data as datas} from "./data.js"
import { useParams } from 'react-router-dom'
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdEuroSymbol } from "react-icons/md";
import { FaLariSign } from "react-icons/fa6";
import {toast} from "react-hot-toast";
import { useCartStore } from '../statemanagment/cartStore.js';

const ProductPage = () => {

    const {id} = useParams()
    const product = datas.find(p => p.id === parseInt(id));

    

    const[activebtn, setActiveBtn] = useState("")

    const[icon, setIcon] = useState(<BsCurrencyDollar />);

    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        const currentSize = localStorage.getItem(`size-${id}`);
        if(currentSize){
            setActiveBtn(currentSize)
        }
    }, [id])


    const checkCheckout = () => {
        if(!activebtn){
            return toast.error("Please choose size before purchasing")
        }

        addToCart()
        return toast.success("Succesfully added to card");
    }

    useEffect(() => {
        const updateIcon = () => {
            const currentCurrency = localStorage.getItem("currency");
        if(currentCurrency === 'USD') {
            setIcon(<BsCurrencyDollar />)
        }
        else if(currentCurrency === "EUR") setIcon(<MdEuroSymbol />)
        else if(currentCurrency === "GEL") setIcon(<FaLariSign />)
        }
        updateIcon();

        window.addEventListener("currencyChange", updateIcon);

        return () => {
            window.removeEventListener("currencyChange", updateIcon);
        }

    }, [])


    const storedCR = localStorage.getItem("currency");

    const getConvertedPrice = () => {
        let price = product.price;
        if (storedCR === "EUR") price *= 0.86;
        else if (storedCR === "GEL") price *= 2.70;
        return price.toFixed(2);
    };

  


    if(!product){
        return <div className='text-center py-10 text-xl'>Product not found</div>
    }


  return (
    <div className=' p-10 mt-10 flex sm:flex-col md:flex-row gap-10 items-start font-[Raleway]'>
        <div className='forimages sm:grid-cols-3 grid md:grid-cols-1 gap-10'>
            <img className='w-[80px] h-auto cursor-pointer' src={product.image} />
            <img className='w-[80px] h-auto cursor-pointer' src={product.image} />
            <img className='w-[80px] h-auto cursor-pointer' src={product.image} />
        </div>

        <div>
            <img className='w-[590px] h-[500px] md:w-[610px] md:h-[511px] lg:w-[610px] lg:h-[511px]' src={product.image} />
        </div>

        <div id='container' className=' md:ml-10 lg:ml-10 flex gap-2 flex-col'>
            <span className=' text-[30px] uppercase font-extrabold'>{product.name}</span>
            <h1 className='uppercase text-[30px]'>{product.category} {product.use}</h1>


            <div className='flex flex-col mt-10'>
            <h1 className='uppercase font-[Raleway]'>Size:</h1>
            <div className='mt-2 flex flex-row gap-5' key={product.id}>
            <button
                className={`${activebtn === "b1" ? "bg-gray-800 text-white" : ""} w-[63px] cursor-pointer hover:bg-gray-800 hover:text-white h-[45px] border-2 border-gray-800 border-solid transition-all ease-in duration-200`} 
                onClick={() => {setActiveBtn("b1"); localStorage.setItem(`size-${id}`, "b1") }}
                >
                XS
            </button>
            <button
                className={`${activebtn === "b2" ? "bg-gray-800 text-white" : ""} w-[63px] cursor-pointer hover:bg-gray-800 hover:text-white h-[45px] border-2 border-gray-800 border-solid transition-all ease-in duration-200`}
                onClick={() => {setActiveBtn("b2"); localStorage.setItem(`size-${id}`, "b2")}}
                >
                    S
                </button>

                <button
                className={`${activebtn === "b3" ? "bg-gray-800 text-white" : ""} w-[63px] cursor-pointer hover:bg-gray-800 hover:text-white h-[45px] border-2 border-gray-800 border-solid transition-all ease-in duration-200`}
                onClick={() => {setActiveBtn("b3"); localStorage.setItem(`size-${id}`, "b3")}}
                >
                    M
                </button>

                <button
                className={`${activebtn === "b4" ? "bg-gray-800 text-white" : ""} w-[63px] cursor-pointer hover:bg-gray-800 hover:text-white h-[45px] border-2 border-gray-800 border-solid transition-all ease-in duration-50`}
                onClick={() => {setActiveBtn("b4"); localStorage.setItem(`size-${id}`, "b4")}}
                >
                    L
                </button>
            </div>

            <div className='mt-[100px] flex flex-col gap-1'>
                <span className='uppercase font-extrabold text-[18px]'>Price: </span>

                <span className='text-2xl flex flex-row items-center'>
                    {
                        icon
                    }{
                        getConvertedPrice()
                    }
                </span>
            </div>
            <button className='mt-5 uppercase w-[350px] text-white cursor-pointer hover:bg-[#74e592] h-[52px] bg-[#5ECE7B]' onClick={checkCheckout}>Add to cart</button>

            <p className='flex  w-[350px] mt-8'>{product.desc}</p>
        </div>
        </div>

        
    </div>
  )
}

export default ProductPage