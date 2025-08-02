import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Women from "./Pages/Women";
import Men from "./Pages/Men";
import Kids from "./Pages/Kids";
import Navbar from "./Components/Navbar";
import ProductPage from "./Components/ProductPage";
import { Toaster } from "react-hot-toast";
import Bag from "./Components/Bag";
import { useLocation } from 'react-router-dom';
import Details from "./Components/Details";
import Shipping from "./Components/Shipping";
import Payment from "./Components/Payment";


function App() {

  const hideNavBar = ["/details", "/shipping", "/payment"];
  const location = useLocation();

  const hideBar = hideNavBar.includes(location.pathname)

  return (

    <>
    <div className="px-[4rem]">
      {!hideBar && <Navbar bgBlurr={false} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/:category/:id/:name" element={<ProductPage />}/>
        <Route path="/insideCart" element={<Bag />}></Route>
        <Route path="/details" element={<Details />} />
        
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
    <Routes>
      <Route path="/shipping" element={<Shipping/>} />
    </Routes>
    </>
  );
}

export default App;