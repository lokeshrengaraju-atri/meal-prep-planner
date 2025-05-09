import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AddMealPage from "./pages/AddMealPage";
import ChartPage from "./pages/ChartPage";
import EditMealPage from "./pages/EditMealPage";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <div className="background">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-meal" element={<AddMealPage />} />
          <Route path="/:mealId" element={<EditMealPage />} />
          <Route path="/pie-chart" element={<ChartPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
