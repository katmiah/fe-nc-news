import { useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import ContentList from "./Components/ContentList";
import ContentCard from "./Components/ContentCard.jsx";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ContentList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
