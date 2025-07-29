import React, { useState } from 'react';
import { data as datas } from './dropdownCartData';

const CartDropDown = React.forwardRef((props, ref) => {
  const [data] = useState(datas);


  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(datas.map((item) => [item.id, 1]))
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
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const total = data.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 1),
    0
  );

  return (
    <div
      ref={ref}
      className="w-[325px] pt-8 px-5 h-[625px] font-[Raleway] border-2 bg-gray-100 border-black absolute top-[70px] right-[60px] z-100"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="products h-[80%] w-[325px] overflow-y-auto">
        <span>My Bag, {data.length} items</span>

        {data.map((prod) => (
          <div key={prod.id} className="mt-10 pr-3 flex flex-row w-[293px] h-[162px]">
            <div className="flex flex-col">
              <span>{prod.name}</span>
              <span className="mt-5">{prod.price}</span>

              <span className="mt-5">Size:</span>
              <div className="flex flex-row gap-1 mt-2">
                {["XS", "X", "L", "M"].map((size) => (
                  <button
                    key={size}
                    className="border border-gray-800 w-6 h-6 cursor-pointer"
                  >
                    {size}
                  </button>
                ))}
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
                onClick={() => decrement(prod.id)}
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
        <span>{total.toFixed(2)}</span>
      </div>

      <div className="flex flex-row gap-5 h-[100px] justify-center items-center">
        <button className="font-[Raleway] cursor-pointer border-2 border-gray-800 uppercase w-[140px] h-[43px]">
          View Bag
        </button>
        <button className="font-[Raleway] cursor-pointer text-white uppercase w-[140px] h-[43px] bg-[#5ECE7B]">
          Checkout
        </button>
      </div>
    </div>
  );
});

export default CartDropDown;
