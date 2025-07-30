import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdEuroSymbol } from "react-icons/md";
import { FaLariSign } from "react-icons/fa6";
import { useCartLogicStore } from '../statemanagment/cartStore';
import { NavLink } from 'react-router-dom';

const CartDropDown = React.forwardRef((props, ref) => {

  const cartItems = useCartLogicStore((state) => state.cartItems);
  const removeFromCart = useCartLogicStore((state) => state.removeFromCart);


  const[activeBtn, setActiveBtn] = useState(() => {
    const sizes = {};
    cartItems.forEach(item => {
        const stored = localStorage.getItem(`size-product-${item.id}`);
        sizes[item.id] = stored || "";
    })

    return sizes;
  })

  const handleSizeChange = (productId, sizeKey) => {
    setActiveBtn(prev => (
        {
            ...prev,
            [productId] : sizeKey,

        }
    ))
    localStorage.setItem(`size-product-${productId}`, sizeKey);
  }

  const [icon, setIcon] = useState(<BsCurrencyDollar />)

  useEffect(() => {
    const updateIcon = () => {
        let currentCurrent = localStorage.getItem("currency");
        if(currentCurrent === "USD") setIcon(<BsCurrencyDollar />)
        else if(currentCurrent === "EUR") setIcon(<MdEuroSymbol />)
        else if(currentCurrent === "GEL") setIcon(<FaLariSign />)
    }

    updateIcon();

    window.addEventListener("currencyChange", updateIcon);

    return () => {
        window.removeEventListener("currencyChange", updateIcon)
    }
  }, [])


  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(cartItems.map((item) => [item.id, 1]))
  );

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



  const storedCR = localStorage.getItem("currency");

  const getTotalConverted = () => {
    let tot = total;
    if (storedCR === "EUR") tot *= 0.86;
    else if (storedCR === "GEL") tot *= 2.70;
    return tot.toFixed(2);
  }

    const getConvertedPrice = (product) => {
        
        let price = product.price;
        if (storedCR === "EUR") price *= 0.86;
        else if (storedCR === "GEL") price *= 2.70;
        return price.toFixed(2);
    };

  return (
    <div
      ref={ref}
      className="w-[325px] pt-8 px-5 h-[625px] font-[Raleway] border-2 bg-white border-black absolute top-[70px] right-[60px] z-100"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="products h-[80%] w-[325px] overflow-y-auto">
        <span>My Bag, {cartItems.length} items</span>

        {cartItems.map((prod) => (
          <div key={prod.id} className="mt-10 pr-3 flex flex-row w-[293px] h-[162px]">
            <div className="flex flex-col">
              <span>{prod.name}</span>
              <span className="mt-5 flex flex-row items-center">{icon}{getConvertedPrice(prod)}</span>

              <span className="mt-5">Size:</span>
              <div className="flex flex-row gap-1 mt-2" key={prod.id}>
                <button className={`${activeBtn[prod.id] === "b1" ? "bg-gray-800 text-white transition-all duration-50 ease-in" : "bg-white text-black"} border-gray-800 border-1 w-6 h-6 cursor-pointer`}
                    onClick={() => {handleSizeChange(prod.id, "b1");}}
                >XS</button>
                <button className={`${activeBtn[prod.id] === "b2" ? "bg-gray-800 text-white transition-all duration-50 ease-in" : "bg-white text-black"} border-gray-800 border-1 w-6 h-6 cursor-pointer`}
                    onClick={() => {handleSizeChange(prod.id, "b2");}}
                >S</button>
                <button className={`${activeBtn[prod.id] === "b3" ? "bg-gray-800 text-white transition-all duration-50 ease-in" : "bg-white text-black"} border-gray-800 border-1 w-6 h-6 cursor-pointer`}
                    onClick={() => {handleSizeChange(prod.id, "b3");}}
                >M</button>
                <button className={`${activeBtn[prod.id] === "b4" ? "bg-gray-800 text-white transition-all duration-50 ease-in" : "bg-white text-black"} border-gray-800 border-1 w-6 h-6 cursor-pointer`}
                    onClick={() => {handleSizeChange(prod.id, "b4");}}
                >L</button>
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-between items-center">
              <button
                onClick={() => increment(prod.id)}
                className="cursor-pointer w-6 h-6 text-[20px] border flex items-center justify-center border-gray-800"
              >
                +
              </button>
              <span>{quantities[prod.id]}</span>
              <button
                onClick={() => {
                    if (quantities[prod.id] === 1) {
                      removeFromCart(prod.id);
                    } else {
                      decrement(prod.id);
                    }
                  }}
                className="cursor-pointer w-6 h-6 text-[20px] border flex items-center justify-center border-gray-800"
              >
                –
              </button>
            </div>

            <img src={prod.image} className="ml-2 w-[121px] h-[162px]" />
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-between mt-2">
        <span>Total:</span>
        <span className='flex flex-row items-center'>{icon}{(getTotalConverted())}</span>
      </div>

      <div className="flex flex-row gap-5 h-[100px] justify-center items-center">
        <NavLink to={"/insideCart"}>
        <button className="font-[Raleway] cursor-pointer border-2 border-gray-800 uppercase w-[140px] h-[43px]">
          View Bag
        </button>
        </NavLink>
        <button className="font-[Raleway] cursor-pointer text-white uppercase w-[140px] h-[43px] bg-[#5ECE7B]">
          Checkout
        </button>
      </div>
    </div>
  );
});

export default CartDropDown;
