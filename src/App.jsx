import React from "react";
import Membership from './components/Membership';
import Inventory from './components/Inventory';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Financial from "./components/FinancialTracker/Financial";
import Document from "./components/DocumentProcessing/Document";
import Marketplace from "./components/Marketplace/Marketplace";
import FinancialTracker from "./components/AdminView/FinancialTracker";

function App() {
  return (
    <div className="bg-binhi min-h-screen font-sans">
      <Router>
        <Routes>
          <Route path="/financial" element={<Layout><Financial /></Layout>} />
          <Route path="/membership" element={<Layout><Membership /></Layout>} />
          <Route path="/document" element={<Layout><Document /></Layout>} />
          <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
          <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
          <Route path="/financial-tracker" element={<LayoutAdmin><FinancialTracker /></LayoutAdmin>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;