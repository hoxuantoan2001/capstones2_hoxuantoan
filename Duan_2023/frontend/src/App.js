import "./App.css";
import { Route, Routes } from "react-router-dom";
import Product from "../src/components/product/product";

import Register from "../src/components/register/register";
import Login from "../src/components/login/login";
import Postsell from "../src/components/postsell/components/Post";
import Search from "./components/search/Search";
import Header from "../src/components/header/header";
import Footer from "../src/components/footer/footer";
import Homepage from "../src/components/homepage/Home";
import Chatbox from "../src/components/chatbox/chatbox";
import ModalFilter from "./components/modalfilter.js/ModalFilter";
import ProductUser from "../src/components/productUer.js/productUser";
// import Header from "../src/components/header/header";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/login/page" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/postsell" element={<Postsell />} />
        <Route path="/product" element={<Product />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/modalfilter" element={<ModalFilter />} />
        <Route path="/postsell/product" element={<Product />} />
        <Route path="/search/product" element={<Product />} />
        <Route path="/homepage/product" element={<Product />} />
        <Route path="/login/page/product" element={<Product />} />
        <Route path="/productuser" element={<ProductUser />} />
        <Route path="/productuser/product" element={<Product />} />
        {/* <Route path="/modalFilter" element={<ModalFilter />} />  */}
        <Route path="/chatbox" element={<Chatbox />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}
export default App;
