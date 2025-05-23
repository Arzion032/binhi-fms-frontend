import React from "react";
import Membership from './components/Membership';
import Inventory from './components/Inventory';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Financial from "./components/FinancialTracker/financial";
import Document from "./components/DocumentProcessing/Document";
import Marketplace from "./components/Marketplace/Marketplace";

function App() {

  return (
    <div className="bg-binhi min-h-screen font-sans">

      <Router>
      <Routes>
        <Route path="/financial" element={<Layout><Financial/></Layout>} />
        <Route path="/membership" element={<Layout><Membership/></Layout>} />
        <Route path="/document" element={<Layout><Document/></Layout>} />
        <Route path="/marketplace" element={<Layout><Marketplace/></Layout>} />
        <Route path="/inventory" element={<Layout><Inventory/></Layout>} />
      </Routes>
    </Router>
    </div>
    
  )
}

export default App;

