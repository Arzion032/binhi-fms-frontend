import React from "react";
import Membership from './components/Membership';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Financial from "./components/FinancialTracker/financial";
import Document from "./components/DocumentProcessing/Document";

function App() {

  return (
    <div className="bg-binhi min-h-screen font-sans">

      <Router>
      <Routes>
        <Route path="/financial" element={<Layout><Financial/></Layout>} />
        <Route path="/membership" element={<Layout><Membership/></Layout>} />
        <Route path="/document" element={<Layout><Document/></Layout>} />
      </Routes>
    </Router>
    </div>
    
  )
}

export default App;

