import { useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import ContentList from "./Components/ContentList";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import ArticlePage from "./Components/ArticlePage";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ContentList />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
