import React from "react";
import Membership from './components/Membership';
import Inventory from './components/Inventory';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Financial from "./components/FinancialTracker/Financial";
import Document from "./components/DocumentProcessing/Document";
import Marketplace from "./components/Marketplace/Marketplace";
import Inventory from './components/Inventory';
import SignUp from './components/SignUp/SignUpPage';
import NextStep from './components/SignUp/NextStep';
import SetPassword from './components/SignUp/SetPassword';
import SetUp from './components/SignUp/SetUp';

function App() {
  return (
    <div className="bg-binhi min-h-screen font-sans">
      <Router>
      <Routes>
        <Route path="/financial" element={<Layout><Financial/></Layout>} />
        <Route path="/membership" element={<Layout><Membership/></Layout>} />
        <Route path="/document" element={<Layout><Document/></Layout>} />
        <Route path="/inventory" element={<Layout><Inventory/></Layout>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/verification" element={<NextStep />} />
        <Route path="/password" element={<SetPassword />} />
        <Route path="/setup" element={<SetUp />} />
        <Route path="/marketplace" element={<Layout><Marketplace defaultTab="Product Management" /></Layout>} />
        <Route path="/marketplace/products" element={<Layout><Marketplace defaultTab="Product Management" /></Layout>} />
        <Route path="/marketplace/customers" element={<Layout><Marketplace defaultTab="Customer Management" /></Layout>} />
        <Route path="/marketplace/orders" element={<Layout><Marketplace defaultTab="Order Management" /></Layout>} />
        <Route path="/marketplace/payouts" element={<Layout><Marketplace defaultTab="Farmer Payout" /></Layout>} />
        <Route path="/marketplace/*" element={<Navigate to="/marketplace/products" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;