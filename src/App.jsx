import React from "react";
import Tabs from "./components/Tabs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Financial from "./components/FinancialTracker/financial";


function App() {

  return (
    <div className="bg-binhi min-h-screen font-sans">

      <Router>
      <Routes>
        <Route path="/membership" element={<Layout><Tabs/></Layout>} />
        <Route path="/financial" element={<Layout><Financial/></Layout>} />
      </Routes>
    </Router>
    </div>
    
  )
}

export default App;
