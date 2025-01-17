import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Match from "./pages/Match";
import "./App.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/search"
        element={<Search favorites={favorites} setFavorites={setFavorites} />}
      />
      <Route path="/match" element={<Match favoriteDogIds={favorites} />} />
      </Routes>
    </Router>
  );
}
export default App;
