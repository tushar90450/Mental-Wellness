import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AiBhaktiLanding from "./pages/AiBhaktiLanding";
import Header from "./pages/header";
const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<AiBhaktiLanding />} />
      </Routes>
    </Router>
  );
}
export default App;