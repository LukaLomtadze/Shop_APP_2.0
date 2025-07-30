import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Women from "./Pages/Women";
import Men from "./Pages/Men";
import Kids from "./Pages/Kids";
import Navbar from "./Components/Navbar";
import ProductPage from "./Components/ProductPage";
import { Toaster } from "react-hot-toast";
import Bag from "./Components/Bag";


function App() {
  return (

    <div className="px-[4rem]">
      <Navbar bgBlurr={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/:category/:id/:name" element={<ProductPage />}/>
        <Route path="/insideCart" element={<Bag />}></Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;