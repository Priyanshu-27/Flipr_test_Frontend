import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
import ScrollToTop from "./ScrollToTop";
import PrizeList from "./Component/PrizeList";
// import Navbar from "./components/Navbar";
// import About from "./components/About";
// import Footer from "./components/Footer";
// import Contacts from "./components/Contacts";
// import Services from "./components/Services";
const App = () => (
  <Router>
    <ScrollToTop />
    {/* <Navbar /> */}
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="" element={<PrizeList />} />
        {/*<Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} /> */}
      </Routes>
    </div>

    {/* <Footer /> */}
  </Router>
);

export default App;
